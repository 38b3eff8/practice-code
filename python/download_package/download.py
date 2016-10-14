import requests
import os
import json

s = requests.Session()

HOST = 'https://yun.facehub.me'


def login(s, host):
    data = {
        "email": "test@azusasoft.com",
        "password": "azusa2016"
    }
    r = s.post(host + '/api/v1/admins/session', json=data)


def save_img(url, filename):
    r = s.get(url)
    with open(filename, 'wb') as f:
        f.write(r.content)


def callback(response):
    result = response.json()

    packages = result.get('packages')
    if packages is None:
        return
    for package in packages:
        package_id = package.get('id')
        print(package_id)
        path = './packages/' + package_id
        if not os.path.exists(path):
            os.mkdir(path)

        with open(path + '/package_info.json', 'w', encoding='utf-8') as f:
            json.dump(package, f, ensure_ascii=False)

        background_detail = package.get('background_detail')
        if background_detail:
            file_type = background_detail.get('format')
            full_url = background_detail.get('full_url')
            save_img(full_url, path + '/background_detail.' + file_type)

        cover_detail = package.get('cover_detail')
        if cover_detail:
            file_type = background_detail.get('format')
            full_url = cover_detail.get('full_url')
            save_img(full_url, path + '/cover_detail.' + file_type)

        for content in package['contents_details'].values():
            full_url = content.get('full_url')
            file_type = content.get('format')
            content_id = content.get('id')
            save_img(full_url, path + '/' + content_id + '.' + file_type)


def download_pacakge_list(s, host, callback):
    r = s.get(
        host + '/api/v1/packages?limit=80&page=1&order_by=created_at&enable=all'
    )

    callback(r)

# login(s, HOST)
# download_pacakge_list(s, HOST, callback)
