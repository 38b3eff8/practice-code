import asyncio

async def download_page(url, loop):
    print("start download page {url}".format(url=url))
    r = await asyncio.sleep(0.1)
    print("end download page {url}".format(url=url))

    if len(url) > 5:
        return

    for item in range(5):
        await download_page(url + str(item), loop)


loop = asyncio.get_event_loop()

loop.run_until_complete(download_page("1", loop))
