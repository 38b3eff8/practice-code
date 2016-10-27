from flask import Flask, request, make_response
from functools import wraps
import json
import os
import shutil

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './temp'


def allow_cross_domain(fun):
    @wraps(fun)
    def wrapper_fun(*args, **kwargs):
        rst = make_response(fun(*args, **kwargs))
        rst.headers['Access-Control-Allow-Origin'] = 'http://localhost:8000'
        rst.headers['Access-Control-Allow-Methods'] = 'PUT,GET,POST,DELETE'
        allow_headers = "Referer,Accept,Origin,User-Agent,Content-Type"
        rst.headers['Access-Control-Allow-Headers'] = allow_headers
        return rst
    return wrapper_fun


@app.route('/', methods=['OPTIONS'])
@allow_cross_domain
def op():
    rst = make_response()
    rst.headers['Access-Control-Allow-Origin'] = '*'
    return rst


@app.route('/', methods=['POST'])
@allow_cross_domain
def upload():
    data = json.loads(request.form.get('json'))

    f = request.files['data']
    print(os.path.join(
        './temp', '{0}_{1}'.format(data['filename'], data['index'])
    ))

    path = os.path.join('./temp', data['filename'])
    if not os.path.exists(path):
        os.mkdir(path)

    f.save(
        os.path.join(path, '{0}_{1}'.format(data['filename'], data['index']))
    )

    if len(os.listdir(path)) != data['count']:
        return 'haha'

    with open(os.path.join('./result', data['filename']), 'ab') as f:
        for i in range(data['count']):
            temp_path = os.path.join(
                path, '{0}_{1}'.format(data['filename'], i))
            print(temp_path)
            with open(temp_path, 'rb') as temp_f:
                f.write(temp_f.read())
    shutil.rmtree(path)
    return "hehe"

if __name__ == '__main__':
    app.run(debug=True)
