import json
import os

import requests

from download import download_pacakge_list, login

HOST1 = 'https://yun.facehub.me'
HOST2 = 'http://test.facehub.me:9292'

s1 = requests.Session()
s2 = requests.Session()

login(s1, HOST1)
login(s2, HOST2)


def get_upload_token(session):
    r = session.get(HOST2 + '/api/v1/images/upload-token')
    return r.json().get('token')


CONTENT = 'emoticon'
BACKGROUND = 'image'
COVER = 'cover'


def upload_img(token, x_type, image):
    host = 'http://upload.qiniu.com'

    data = {
        "token": token,
        "x:type": x_type
    }

    files = {
        'file': open(image, 'rb')
    }

    r = requests.post(host, data=data, files=files)
    return r.json().get('image').get('id')


def upload_packages():
    for item in os.listdir('packages')[1:]:
        package = json.load(
            open('./packages/' + item + '/package_info.json', 'r'))

        upload_package(package)


def upload_package(package):
    token = get_upload_token(s2)
    package_id = package.get('id')
    contents = []

    for key, value in package.get('contents_details').items():
        filename = './packages/' + package_id + '/' + \
            value.get('id') + '.' + value.get('format')
        content_id = upload_img(token, CONTENT, filename)
        print(content_id)
        contents.append(content_id)

    background_id = None
    if package.get('background_detail'):
        filename = './packages/' + package_id + '/background_detail' + \
            '.' + package.get('background_detail').get('format')
        print(filename)
        background_id = upload_img(token, BACKGROUND, filename)

    cover_id = None
    if package.get('cover_detail'):
        filename = './packages/' + package_id + '/cover_detail' + \
            '.' + package.get('cover_detail').get('format')
        print(filename)
        cover_id = upload_img(token, COVER, filename)

    print(cover_id)
    print(background_id)

    data = {
        "package": {
            "name": package.get("name"),
            "sub_title": package.get("sub_title"),
            "description": package.get('description'),
            "status": -1,
            "cover": cover_id,
            "background": background_id,
            "contents": contents
        }
    }

    print(data)
    r = s2.post(HOST2 + '/api/v1/packages', json=data)
    print(r)


def add_tag():
    r = s2.get(HOST2 + '/api/v1/packages?limit=80&page=1&order_by=created_at&enable=all')

    for package in r.json().get('packages'):
        package_id = package.get('id')
        data = {
            "tags": ['可爱']
        }
        r = s2.put(HOST2 + '/api/v1/packages/' + package_id + '/tags', json=data)
        print(r)

if __name__ == '__main__':
    upload_packages()
