
Encodr
======

Encoding/Decoding to/from CBOR/MsgPack/JSON for Node.js and Browser.

<p/>
<img src="https://nodei.co/npm/encodr.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/encodr.png" alt=""/>

About
-----

This is a small JavaScript abstraction layer for Node.js and the Browser
to encode/decode JavaScript values to/from the (binary) object serialization formats
Concise Binary Object Representation (CBOR, [RFC7049](https://tools.ietf.org/html/rfc7049)),
MessagePack ([MsgPack](https://github.com/msgpack/msgpack/blob/master/spec.md))
and JavaScript Object Notation (JSON, [RFC4627](https://tools.ietf.org/html/rfc4627)).
The actual encoding/decoding is performed by underyling libraries. This
package is just a convenient abstraction layer to ensure the correct
library and consistent data types are used.

Installation
------------

```shell
$ npm install encodr
```

Usage
-----

```js
import Encodr from "encodr"

const CBOR    = new Encodr("cbor")
const MSGPACK = new Encodr("msgpack")
const JSON    = new Encodr("json")

let data = {
    foo: "bar",
    baz: 42,
    baz: [ 1.0, "quux", true ],
    quux: {}
}

data = CBOR.encode(data)
data = CBOR.decode(data)

data = MSGPACK.encode(data)
data = MSGPACK.decode(data)

data = JSON.encode(data)
data = JSON.decode(data)
```

Application Programming Interface
---------------------------------

- `type BLOB = Buffer | Uint8Array`<br/>
  The `BLOB` data type depends on the execution environment:
  In Node.js it is `Buffer`, in the Browsers it is `Uint8Array`.

- `new Encodr(format: string = "cbor"): Encodr`<br/>
  Create a new Encodr instance for a particular encoding
  format. The supported formats are `cbor`, `msgpack`, `json`
  and `jsons`. The default is `cbor`.

- `Encodr::encode(data: any): BLOB`<br/>
  Encode a JavaScript value to the serialization format.

- `Encodr::decode(data: BLOB): any`<br/>
  Decode a JavaScript value from the serialization format.

Encoding Formats
----------------

The following regular serialization formats are supported:

- **cbor**: Concise Binary Object Representation (CBOR, [RFC7049](https://tools.ietf.org/html/rfc7049)):<br/>
  This is a very compact, efficient and IETF-standardized serialization format.

- **msgpack**: MessagePack ([MsgPack](https://github.com/msgpack/msgpack/blob/master/spec.md)):<br/>
  This is a very compact, efficient and battle-tested serialization format.

For convenience and application development reasons, there is also an additional special serialization format:

- **json**: UTF-16 string-encoded JavaScript Object Notation (JSON, [RFC4627](https://tools.ietf.org/html/rfc4627)):<br/>
  This is a less compact, less efficient but IETF-standardized and human-readable serialization format.

  This serialization format is JSON encoded into a regular UTF-16 character
  string (instead of the UTF-8 byte array as it is the case for `cbor` and `msgpack`)
  and hence the API `BLOB` type here becomes `String` as an unregular case.

  This serialization format exists for development purposes only, where one wants to
  easily switch the encoding to a human-readable string representation.
  For instance, when transferring the data over WebSockets via
  [WebSocket-Framed](https://github.com/rse/websocket-framed), the
  resulting WebSocket frame will be human-readable in the Browser's
  debugger.

License
-------

Copyright (c) 2017-2018 Ralf S. Engelschall (http://engelschall.com/)

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

