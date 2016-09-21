from multiprocessing import Process


class SubProcess(Process):

    def run(self):
        print("asdfasd")

if __name__ == '__main__':
    sub_process = SubProcess()
    sub_process.start()
    sub_process.join()
