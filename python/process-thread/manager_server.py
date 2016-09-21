from multiprocessing.managers import BaseManager
import queue

queue = queue.Queue()


class QueueManage(BaseManager):
    pass

QueueManage.register('get_queue', callable=lambda: queue)

m = QueueManage(address=('', 50000), authkey=b'abc')
s = m.get_server()
s.serve_forever()
