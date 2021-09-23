import createServer from "./Config/server.js"

export const PORT = 3000;

createServer().then(app => {
    app.listen(PORT);
})