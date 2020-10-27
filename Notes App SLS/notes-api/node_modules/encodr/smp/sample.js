
const Encodr        = require("..")

const chai          = require("chai")
const chaiDeepMatch = require("chai-deep-match")

chai.use(chaiDeepMatch)

let data = {
    foo: "bar",
    baz: 42,
    baz: [ 1.0, "quux", true ],
    quux: {}
}

console.log("decoded (original):", data)

let types = [ "json", "cbor", "msgpack" ]

types.forEach((type) => {
    let codec = new Encodr(type)
    let encoded = codec.encode(data)

    console.log(`encoded (${type}):`, encoded, encoded.length)

    let data2 = codec.decode(encoded)
    chai.expect(data2).to.deep.match(data)
})

