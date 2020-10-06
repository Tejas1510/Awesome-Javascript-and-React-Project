/*
**  Encodr -- Encoding/Decoding to/from JSON/CBOR/MsgPack
**  Copyright (c) 2017-2018 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import Encodr            from ".."
import Chai, { expect }  from "chai"
import ChaiDeepMatch     from "chai-deep-match"

Chai.use(ChaiDeepMatch)

let data = { foo: 42, bar: { baz: 1.0, quux: "foo\xA9bar\uD800\uDC01♥" } }

describe("Encodr Library", () => {
    it("API structure", () => {
        let encodr = new Encodr()
        expect(encodr).to.respondTo("encode")
        expect(encodr).to.respondTo("decode")
    })

    it("CBOR codec functionality", () => {
        let encodr = new Encodr("cbor")

        let dataEncoded = encodr.encode(data)
        expect(typeof dataEncoded).to.be.equal("object")
        expect(dataEncoded instanceof Buffer).to.be.equal(true)

        let dataDecoded = encodr.decode(dataEncoded)
        expect(dataDecoded).to.be.a("object")
        expect(dataDecoded).to.deep.match(data)
    })

    it("MsgPack codec functionality", () => {
        let encodr = new Encodr("msgpack")

        let dataEncoded = encodr.encode(data)
        expect(typeof dataEncoded).to.be.equal("object")
        expect(dataEncoded instanceof Buffer).to.be.equal(true)

        let dataDecoded = encodr.decode(dataEncoded)
        expect(dataDecoded).to.be.a("object")
        expect(dataDecoded).to.deep.match(data)
    })

    it("JSON codec functionality", () => {
        let encodr = new Encodr("json")

        let dataEncoded = encodr.encode(data)
        expect(typeof dataEncoded).to.be.equal("string")

        let dataDecoded = encodr.decode(dataEncoded)
        expect(dataDecoded).to.be.a("object")
        expect(dataDecoded).to.deep.match(data)
    })
})

