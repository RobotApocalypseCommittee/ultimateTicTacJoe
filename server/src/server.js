const express = require("express");
const app = require("./app");
const http = require("http");
const path = require("path");

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../../client/build')));
}

const server = http.createServer(app);

app.io.attach(server);

server.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});