import Router from "@koa/router"
import Controller from "./controllers.js"

const routes = new Router({});
const controller = new Controller();

routes.get('/get_by_productName', async (ctx, next) => {
    await controller.getByProductName(ctx);
})

routes.get('/get_by_active', async (ctx, next) => {
    await controller.getBySubstance(ctx);
})

routes.get('/get_by_bar_code', async (ctx, next) => {
    await controller.getByBarCode(ctx);
})

routes.get('/get_by_ggrem', async (ctx, next) => {
    await controller.getByGgrem(ctx);
})

export default routes.middleware();