import threading

class TestThread(threading.Thread):

    def run(self):
        print('hello world')


if __name__ == '__main__':
    t = TestThread()
    t.start()
