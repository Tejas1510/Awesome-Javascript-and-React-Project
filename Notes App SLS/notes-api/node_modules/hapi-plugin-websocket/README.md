
hapi-plugin-websocket
=====================

[HAPI](http://hapijs.com/) plugin for seamless WebSocket integration.

<p/>
<img src="https://nodei.co/npm/hapi-plugin-websocket.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/hapi-plugin-websocket.png" alt=""/>

Installation
------------

```shell
$ npm install hapi hapi-plugin-websocket
```

About
-----

This is a small plugin for the [HAPI](http://hapijs.com/) server
framework of [Node.js](https://nodejs.org/) for seamless
[WebSocket](https://tools.ietf.org/html/rfc6455) protocol integration.
It accepts WebSocket connections and transforms between incoming/outgoing
WebSocket messages and injected HTTP request/response messages.

Usage
-----

The following sample server shows all features at once:

```js
const Boom          = require("boom")
const HAPI          = require("hapi")
const HAPIWebSocket = require("hapi-plugin-websocket")
const HAPIAuthBasic = require("hapi-auth-basic")
const WebSocket     = require("ws")

;(async () => {
    /*  create new HAPI service  */
    const server = new HAPI.Server({ address: "127.0.0.1", port: 12345 })

    /*  register HAPI plugins  */
    await server.register(HAPIWebSocket)
    await server.register(HAPIAuthBasic)

    /*  register Basic authentication stategy  */
    server.auth.strategy("basic", "basic", {
        validate: async (request, username, password, h) => {
            let isValid     = false
            let credentials = null
            if (username === "foo" && password === "bar") {
                isValid = true
                credentials = { username }
            }
            return { isValid, credentials }
        }
    })

    /*  provide plain REST route  */
    server.route({
        method: "POST", path: "/foo",
        config: {
            payload: { output: "data", parse: true, allow: "application/json" }
        },
        handler: (request, h) => {
            return { at: "foo", seen: request.payload }
        }
    })

    /*  provide combined REST/WebSocket route  */
    server.route({
        method: "POST", path: "/bar",
        config: {
            payload: { output: "data", parse: true, allow: "application/json" },
            plugins: { websocket: true }
        },
        handler: (request, h) => {
            let { mode } = request.websocket()
            return { at: "bar", mode: mode, seen: request.payload }
        }
    })

    /*  provide exclusive WebSocket route  */
    server.route({
        method: "POST", path: "/baz",
        config: {
            plugins: { websocket: { only: true, autoping: 30 * 1000 } }
        },
        handler: (request, h) => {
            return { at: "baz", seen: request.payload }
        }
    })

    /*  provide full-featured exclusive WebSocket route  */
    server.route({
        method: "POST", path: "/quux",
        config: {
            response: { emptyStatusCode: 204 },
            payload: { output: "data", parse: true, allow: "application/json" },
            auth: { mode: "required", strategy: "basic" },
            plugins: {
                websocket: {
                    only: true,
                    initially: true,
                    subprotocol: "quux/1.0",
                    connect: ({ ctx, ws }) => {
                        ctx.to = setInterval(() => {
                            if (ws.readyState === WebSocket.OPEN)
                                ws.send(JSON.stringify({ cmd: "PING" }))
                        }, 5000)
                    },
                    disconnect: ({ ctx }) => {
                        if (ctx.to !== null) {
                            clearTimeout(this.ctx)
                            ctx.to = null
                        }
                    }
                }
            }
        },
        handler: (request, h) => {
            let { initially, ws } = request.websocket()
            if (initially) {
                ws.send(JSON.stringify({ cmd: "HELLO", arg: request.auth.credentials.username }))
                return ""
            }
            if (typeof request.payload !== "object" || request.payload === null)
                return Boom.badRequest("invalid request")
            if (typeof request.payload.cmd !== "string")
                return Boom.badRequest("invalid request")
            if (request.payload.cmd === "PING")
                return { result: "PONG" }
            else if (request.payload.cmd === "AWAKE-ALL") {
                var peers = request.websocket().peers
                peers.forEach((peer) => {
                    peer.send(JSON.stringify({ cmd: "AWAKE" }))
                })
                return ""
            }
            else
                return Boom.badRequest("unknown command")
        }
    })

    /*  provide exclusive framed WebSocket route  */
    server.route({
        method: "POST", path: "/framed",
        config: {
            plugins: {
                websocket: {
                    only:          true,
                    autoping:      30 * 1000,
                    frame:         true,
                    frameEncoding: "json",
                    frameRequest:  "REQUEST",
                    frameResponse: "RESPONSE"
                }
            }
        },
        handler: (request, h) => {
            return { at: "framed", seen: request.payload }
        }
    })

    /*  start the HAPI service  */
    await server.start()
})().catch((err) => {
    console.log(`ERROR: ${err}`)
})

```

You can test-drive this the following way (with the help
of [curl](https://curl.haxx.se/) and [wscat](https://www.npmjs.com/package/wscat)):

```shell
# start the sample server implementation (see source code above)
$ node sample-server.js &

# access the plain REST route via REST
$ curl -X POST --header 'Content-type: application/json' \
  --data '{ "foo": 42 }' http://127.0.0.1:12345/foo
{"at":"foo","seen":{"foo":42}}

# access the combined REST/WebSocket route via REST
$ curl -X POST --header 'Content-type: application/json' \
  --data '{ "foo": 42 }' http://127.0.0.1:12345/bar
{"at":"bar","mode":"http","seen":{"foo":42}}

# access the exclusive WebSocket route via REST
$ curl -X POST --header 'Content-type: application/json' --data '{ "foo": 42 }' http://127.0.0.1:12345/baz
{"statusCode":400,"error":"Bad Request","message":"HTTP request to a WebSocket-only route not allowed"}

# access the combined REST/WebSocket route via WebSocket
$ wscat --connect ws://127.0.0.1:12345/bar
> { "foo": 42 }
< {"at":"bar","mode":"websocket","seen":{"foo":42}}
> { "foo": 7 }
< {"at":"bar","mode":"websocket","seen":{"foo":7}}

# access the exclusive WebSocket route via WebSocket
$ wscat --connect ws://127.0.0.1:12345/baz
> { "foo": 42 }
< {"at":"baz","seen":{"foo":42}}
> { "foo": 7 }
< {"at":"baz","seen":{"foo":7}}

# access the full-featured exclusive WebSocket route via WebSockets
$ wscat --subprotocol "quux/1.0" --auth foo:bar --connect ws://127.0.0.1:12345/quux
< {"cmd":"HELLO",arg:"foo"}
> {"cmd":"PING"}
< {"result":"PONG"}
> {"cmd":"AWAKE-ALL"}
< {"cmd":"AWAKE"}
< {"cmd":"PING"}
< {"cmd":"PING"}
< {"cmd":"PING"}
< {"cmd":"PING"}

# access framed exclusive WebSocket route
$ wscat --connect ws://127.0.0.1:12345/framed
< [ 42, 0, "REQUEST", { "foo": 7 } ]
> [1,42,"RESPONSE",{"at":"framed","seen":{"foo":7}}]
```

Application Programming Interface
---------------------------------

- **Import Module**:

```js
const HAPIWebSocket = require("hapi-plugin-websocket")
```

- **Register Module in HAPI** (simple variant):

```js
await server.register(HAPIWebSocket)
```

- **Register Module in HAPI** (complex variant):

```js
server.register({
    plugin: HAPIWebSocket,
    options: {
        create: (wss) => {
            ...
        }
    }
})
```

- **Register WebSocket-enabled Route** (simple variant):

```js
server.route({
    method: "POST",
    path: "/foo",
    options: {
        plugins: { websocket: true }
    },
    handler: async (request, h) => {
        ...
    }
})
```

- **Register WebSocket-enabled Route** (complex variant):

```js
server.route({
    method: "POST",
    path: "/foo",
    options: {
        plugins: {
            websocket: {
                only: true,
                autoping: 10 * 1000,
                subprotocol: "foo/1.0",
                initially: true,
                connect: ({ ctx, wss, ws, req, peers }) => {
                    ...
                    ws.send(...)
                    ...
                },
                disconnect: ({ ctx, wss, ws, req, peers }) => {
                    ...
                }
            }
        }
    },
    handler: async (request, h) => {
        let { mode, ctx, wss, ws, req, peers, initially } = request.websocket()
        ...
    }
})
```

- **Register WebSocket-enabled Framed Route**:

```js
server.route({
    method: "POST",
    path:   "/foo",
    options: {
        plugins: {
            websocket: {
                only:          true,
                frame:         true,
                frameEncoding: "json",
                frameRequest:  "REQUEST",
                frameResponse: "RESPONSE"
            }
        }
    },
    handler: async (request, h) => {
        let { mode, ctx, wss, ws, wsf, req, peers, initially } = request.websocket()
        ...
    }
})

```

Notice
------

With [NES](https://github.com/hapijs/nes) there is a popular and elaborated alternative
HAPI plugin for WebSocket integration. The `hapi-plugin-websocket`
plugin in contrast is a light-weight solution and was developed
with especially six distinct features in mind:

1. everything is handled through the regular HAPI route API
   (i.e. no additional APIs like `server.subscribe()`),

2. one can use HAPI route paths with arbitrary parameters,

3. one can restrict a HAPI route to a particular WebSocket subprotocol,

4. HTTP replies with status code 204 ("No Content") are explicitly taken
   into account (i.e. no WebSocket response message is sent at all in
   this case),

5. HAPI routes can be controlled to be plain REST, combined REST+WebSocket
   or WebSocket-only routes, and

6. optionally, WebSocket PING/PONG messages can be exchanged
   in an interval to automatically keep the connection alive (e.g. over
   stateful firewalls) and to better recognize dead connections (e.g. in
   case of network partitions).

If you want a more elaborate solution, [NES](https://github.com/hapijs/nes)
should be your choice, of course.

License
-------

Copyright (c) 2016-2019 Dr. Ralf S. Engelschall (http://engelschall.com/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

