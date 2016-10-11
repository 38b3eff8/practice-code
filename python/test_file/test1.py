import sys
import requests


headers = {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36",
}
print(sys.argv)
proxies = {
    "http": "http://{ip}:{port}".format(ip=sys.argv[1], port=sys.argv[2])
}

r = requests.get('http://www.xicidaili.com/', headers=headers, proxies=proxies)
print(r.status_code)
print(r.text)
