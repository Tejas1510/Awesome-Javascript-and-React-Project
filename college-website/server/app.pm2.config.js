module.exports = {
    apps: [
        {
            name: "Alpine-API-Server",
            script: "server.js",
            watch: true,
            merge_logs: true,
            cwd: "/gt/alpine/api-server",
        },
        {
            name: "Gindowa-API-Server",
            script: "",
            watch: true,
            merge_logs: true,
            cwd: "/gt/alpine/api-server-bkp",
        }
    ]
}