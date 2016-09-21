import re
import asyncio

import aiohttp

from lxml import etree

start_url = 'https://movie.douban.com/subject/26266072/?from=showing'

href_pattern = re.compile(r'^https://movie.douban.com/subject/\d{8}/.+$')

loop = asyncio.get_event_loop()
client = aiohttp.ClientSession(loop=loop)
async def get_page(url, client):
    async with client.get(url) as response:
        # assert response.status == 200
        # return await response.read()
        if response.status == 200:
            return await response.read()

href_set = set()

async def find_info(start_url, client):
    html = await get_page(start_url, client)
    tree = etree.HTML(html)

    # todo: find info
    result = tree.xpath("//div[@id='content']/h1/span")
    if result:
        title = result[0].text
        print(title)

    # add task
    for a in tree.xpath('//a'):
        href = a.attrib.get('href')
        if href is None:
            continue

        # 通过公共的线程池判断，是否已经便利过这个网页
        if href in href_set:
            continue

        if not href_pattern.match(href):
            continue
        href_set.add(href)

        await find_info(href, client)

asyncio.ensure_future(find_info(start_url, client))
loop.run_forever()
