import os
import subprocess

for package_name in map(lambda item: item.split(' ')[0], os.popen('pip list -o')):
    # os.popen('pip install -U %s' % package_name)
    print("update pacakge : %s" % package_name)
    subprocess.call(['pip', 'install', '-U', package_name])
