#!/usr/local/bin/python3
import sys
import os
import re
import shutil

from collections import OrderedDict


def rm_dir(path, rm_list, ignore_list):
    def _rm_dir(path):
        os.chdir(path)

        for item in os.listdir(os.path.curdir):
            if os.path.islink(item):
                continue

            if os.path.isdir(item):
                item += '/'

            for pattern in ignore_list:
                if re.match(pattern, item):
                    break
            else:
                for pattern in rm_list:
                    if re.match(pattern, item):
                        log('del {0}'.format(os.path.abspath(item)))

                        if os.path.isdir(item):
                            shutil.rmtree(item, ignore_errors=True)
                        else:
                            os.remove(item)
                        break
                else:
                    log('    {0}'.format(os.path.abspath(item)))
                    if os.path.isdir(item):
                        _rm_dir(os.path.abspath(item))
                        os.chdir(path)

    _rm_dir(path)


def init_log(show=True):
    log_path = os.path.abspath('.') + '/log.txt'
    if os.path.exists(log_path):
        os.remove(log_path)

    def log(info):
        if show:
            print(info)
        with open(log_path, 'a') as f:
            f.write(info + '\n')
    return log


log = init_log(show=True)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        path = '.'
    else:
        path = sys.argv[1]

    path = os.path.abspath(path)

    def replace(old_str):
        pattern = OrderedDict([
            ('\n', ''),
            ('.', '\\.'),
            ('-', '\\-'),
            ('*', '.+'),
        ])

        for key, value in pattern.items():
            old_str = old_str.replace(key, value)

        return '^{0}$'.format(old_str)

    rm_list = []
    ignore_list = []
    with open('.rm-list') as f:
        for line in f:
            item = line.replace('\n', '')
            if not item:
                continue

            if item.startswith('-'):
                ignore_list.append(replace(item[1:]))
            else:
                rm_list.append(replace(item))
    rm_dir(path, rm_list, ignore_list)
