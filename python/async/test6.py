import aiohttp
from aiohttp import web

async def websocket_handler(request):
    ws = web.WebSocketResponse()
    print('asdfas')
    await ws.prepare(request)

    async for msg in ws:
        if msg.tp == aiohttp.MsgType.text:
            if msg.data == 'close':
                await ws.close()
            else:
                print(msg.data)
                ws.send_str(msg.data + '/answer')
        elif msg.tp == aiohttp.MsgType.error:
            print('ws connection closed with exception %s' % ws.exception())

    print('websocket connection closed')

    return ws


app = web.Application()
app.router.add_route('GET', '/', websocket_handler)
web.run_app(app)
