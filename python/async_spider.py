import asyncio
import aiohttp

loop = asyncio.get_event_loop()
client = aiohttp.ClientSession(loop=loop)

start_url = ''

async def download_page(url, client):
    async with client.get(url) as response:
        if response.status == 200:
            return await response.read()

async def find_info(start_url, client):
    html = await download_page(start_url, client)



loop.run_forever()