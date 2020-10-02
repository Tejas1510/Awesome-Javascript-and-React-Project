
const Boom          = require("@hapi/boom")
const HAPI          = require("@hapi/hapi")
const HAPIAuthBasic = require("@hapi/basic")
const HAPIWebSocket = require("./hapi-plugin-websocket")
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
        options: {
            payload: { output: "data", parse: true, allow: "application/json" }
        },
        handler: (request, h) => {
            return { at: "foo", seen: request.payload }
        }
    })

    /*  provide combined REST/WebSocket route  */
    server.route({
        method: "POST", path: "/bar",
        options: {
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
        options: {
            plugins: { websocket: { only: true, autoping: 30 * 1000 } }
        },
        handler: (request, h) => {
            return { at: "baz", seen: request.payload }
        }
    })

    /*  provide full-featured exclusive WebSocket route  */
    server.route({
        method: "POST", path: "/quux",
        options: {
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
        options: {
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
    /* eslint no-console: off */
    console.log(`ERROR: ${err}`)
})

