import Koa from 'koa'
import routes from "../Config/routes.js"
import koaBody from "koa-body"
import cors from "@koa/cors"

export default async function createServer(){
    let app = new Koa();

    console.log("Server Started");
    app.use(koaBody())
    app.use(cors());
    app.use(routes);

    app.use(ctx => {
        ctx.body = {
            "message": "test_set does not exist",
            "details": {},
            "description": "The reference set does not exist.",
            "code": 1002,
            "http_response": {
               "message": "Invalid syntax for this request was provided.",
                "code": 400
            }
        }
        ctx.status = 400;
    })
    return app;
}