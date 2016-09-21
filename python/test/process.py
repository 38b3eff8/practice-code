from multiprocessing import Process, Queue, current_process, Lock
import asyncio
import aiohttp
import async_timeout
import re
from urllib.parse import urljoin
import time

from lxml import etree

task_queue = Queue()

other_pattern = re.compile(r'^https://www.zhihu.com')
question_pattern = re.compile(r'^https://www.zhihu.com/question/\d{8}$')


class TaskProcess(Process):

    def __init__(self, task_queue, view_pages, set_lock):
        super(TaskProcess, self).__init__()
        self.task_queue = task_queue

        self.view_pages = view_pages
        self.set_lock = set_lock

    def run(self):
        loop = asyncio.get_event_loop()

        headers = {
            "user-agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36'
        }

        cookies = {
            "f": "f336fe8059cd1aded5f770c2a62f1b86",
            "_za": "1e2a41ce-38b5-4faf-a1e9-31a5c5e103ca",
            "_zap": "d2afd8e2-bc8d-4dc7-9339-5ab23391e584",
            "a_t": '"2.0AADAfZAbAAAXAAAANwEHWAAAwH2QGwAAAABAqT54dQoXAAAAYQJVTT1l-FcABVt2U56aAeKtNdrVQGAzLHl8CsDmD5SCfsYDi_dLF1PrwlvYvSKRDQ=="',
            "cap_id": '"MzNkMjYwOTZiODUxNDEzMmFiZDZlNTRkMTQ0NWEzOWU=|1473304622|46c580b241b09b5665a22b24322f995a0a4bc405"',
            "d_c0": '"AABAqT54dQqPTgtZJqGEKYS2UFtObbiHAbU=|1472461950"',
            "l_cap_id": '"M2E2MzM0MjAyYTY1NDMzNGExNjZhOTc4ODdjODA3Y2I=|1473304622|7de987c3b269b10751fe2243b2a497dcda463bb7"',
            "login": '"YzIzODM1ZWYwZWEwNDM5ZmEzNmZjNTBkN2Y3MzMzMjM=|1473304637|1c1c54ef8c729314643879c1cb5f71b094ff609f"',
            "q_c1": "4810774ea1014274affb6dd4d1d570e2|1472461950000|1472461950000",
            "z_c0": "Mi4wQUFEQWZaQWJBQUFBQUVDcFBuaDFDaGNBQUFCaEFsVk5QV1g0VndBRlczWlRucG9CNHEwMTJ0VkFZRE1zZVh3S3dB|1474262071|f966ef152e7a6df90ba7718a6a8d1688d5ce07c4",
        }

        session = aiohttp.ClientSession(
            loop=loop, headers=headers, cookies=cookies)

        asyncio.ensure_future(self.get_info(session))

        loop.run_forever()

    async def download_page(self, url, session):
        async with session.get(url) as response:
            if response.status == 200:
                return await response.text()

    async def get_info(self, session):
        url = self.task_queue.get()
        with self.set_lock:
            if url in self.view_pages:
                await self.get_info(session)
            else:
                self.view_pages.add(url)
        print('{0}\t{1}'.format(current_process().ident, url))
        html = await self.download_page(url, session)
        tree = etree.HTML(html)

        if question_pattern.match(url):
            result = tree.xpath("//h2/span")
            if result:
                title = result[0].text
                print(title)
        print()

        for a in tree.xpath('//a'):
            href = a.attrib.get('href')
            if href is None:
                continue

            # 通过公共的线程池判断，是否已经便利过这个网页
            href = urljoin('https://www.zhihu.com', href)
            if href in view_pages:
                continue

            if not question_pattern.match(href):
                continue

            self.task_queue.put(href)
            await self.get_info(session)


if __name__ == '__main__':
    start_url = 'https://www.zhihu.com'
    task_queue.put(start_url)
    view_pages = set()
    set_lock = Lock()

    for i in range(4):
        p = TaskProcess(task_queue, view_pages, set_lock)
        p.start()
