
WebSocket-Framed
================

Framed WebSocket Communication for Node.js and Browser.

<p/>
<img src="https://nodei.co/npm/websocket-framed.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/websocket-framed.png" alt=""/>

About
-----

This is a small JavaScript library for Node.js and the Browser
to encode/decode WebSocket messages to/from a wrapping "frame" data structure.
The frame itself is encoded with either the object serialization format JavaScript
Object Notation (JSON, [RFC4627](https://tools.ietf.org/html/rfc4627)),
Concise Binary Object Representation (CBOR, [RFC7049](https://tools.ietf.org/html/rfc7049))
or [MsgPack](https://github.com/msgpack/msgpack/blob/master/spec.md).
This library solves three particular problems in practice: the serialization of complex data structures (see frame field `data`),
the type annotation (see frame field `type`) and the request/response correlation (see frame fields `fid` and `rid`).

Installation
------------

```shell
$ npm install websocket-framed
```

Usage
-----

```js
const WebSocketFramed = require("websocket-framed")

let ws  = new WebSocket(...)
let wsf = new WebSocketFramed(ws, "cbor")

wsf.on("message", (event) => {
    let request = event.frame
    let { type, message }) = request
    let response = { type: ..., message: ... }
    wsf.send(response, request)
})

let request = { type: ..., data: ... }
wsf.send(request)
```

Frame Format
------------

```
Frame: [ fid: number, rid: number, type: string, data: any ]

+--------+--------+--------+--------+
|  fid   |  rid   |  type  |  data  |
+--------+--------+--------+--------+
```

- The `fid` is the frame id, a numeric unique id between 0 and 2^32 the sending side manages per connection.

- The `rid` is the reply id, the frame id of a previously received frame the current sent frame references.

- The `type` is the frame type, a string identifying the type of `data`.

- The `data` is the arbitrary data structure send in the frame. Any JSON is valid here.

Application Programming Interface
---------------------------------

- `new WebSocketFramed(ws: WebSocket, codec: string = "json"): API`:<br/>
  Create a new WebSocket-Framed instance for a particular communication
  with the help of the frame serialization cocdec. The supported codecs
  are `json`, `cbor` and `msgpack`. For `json` the resulting WebSocket
  data frames are (less compact, but human-readable) text frames while
  for `cbor` and `msgpack` the resulting WebSocket data frames are (very compact,
  but human-unreadable) binary frames.

- `API::on(name: String, callback: (event: { frame: Frame, data: any }) => Void): Void`:<br/>
  Receive a message in case `name` is `message`.
  The (decoded) frame is attached to the event under `event.frame`.
  The (encoded) raw data is is attached to the event under `event.data`.

- `API::send(frame: Frame, replyTo?: Frame): { frame: Frame, data: any }`:<br/>
  Send a message in the form of an encoded frame.
  The frame fields `type` and `data` are mandatory.
  The frame field `fid` can be set manually or is auto-generated.
  The frame field `rid` can be set manually or is set to `0`
  or is set to the `fid` field of the frame `replyTo` you want to reply to.
  Returns the actually sent (decoded) frame and its (encoded) raw data.

License
-------

Copyright (c) 2017-2019 Dr. Ralf S. Engelschall (http://engelschall.com/)

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

