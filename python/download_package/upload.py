import requests

from download import login, download_pacakge_list

HOST1 = 'https://yun.facehub.me'
HOST2 = 'http://test.facehub.me:9292'

s1 = requests.Session()
s2 = requests.Session()

login(s1, HOST1)
login(s2, HOST2)


def callback(response):
    result = response.json()
    packages = result.get('packages')
    if packages is None:
        return
    for package in packages:
        # package_id = package.get('id')
        name = package.get('name')

        print(name)
        sub_title = package.get('sub_title')
        description = package.get('description')
        cover = package.get('cover')
        background = package.get('background')
        status = package.get('status')

        contents = package.get('contents')
        print(background)

        data = {
            "package": {
                "name": name,
                "sub_title": sub_title,
                "description": description,
                "contents": contents,
                "cover": cover,
                "background": background,
                "status": 1
            }
        }

        r = s2.post(HOST2 + '/api/v1/packages', json=data)
        print(r.content)


download_pacakge_list(s1, HOST1, callback)
