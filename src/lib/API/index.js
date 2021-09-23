import createServer from "./Config/server.js"

export const PORT = 3001;

createServer().then(app => {
    app.listen(PORT);
})