from multiprocessing.managers import BaseManager


class QueueManage(BaseManager):
    pass

QueueManage.register('get_queue')

m = QueueManage(address=('localhost', 50000), authkey=b'abc')
