import fs from 'fs';
import { PORT } from '../index.js'

const data = JSON.parse(fs.readFileSync(`${process.cwd()}\\lib\\API\\DADOS.json`));
export default class Controller {

    normalizer(string) {
        return string.normalize('NFD').replace(/[\u0300-\u036f]|⠀/g, '').trim();
    }

    badRequest(ctx, message = "Invalid syntax for this request was provided.") {

        ctx.body = {
            "message": "test_set does not exist",
            "details": {},
            "description": "The reference set does not exist.",
            "code": 1002,
            "http_response": {
               "message": message,
                "code": 400
            }
        }
        ctx.status = 400;
        return ctx;
    }

    notFound(ctx, message = "We could not find the resource you requested.") {
        ctx.body = {
            "message": "test_set does not exist",
            "details": {},
            "description": "The reference set does not exist.",
            "code": 1002,
            "http_response": {
            "message": message,
                "code": 404
            }
        }
        ctx.status = 404;
        return ctx;
    }

    async getByProductName(ctx) {
        if(!ctx.query.name) return ctx.redirect(`http://localhost:${PORT}`);
        ctx.query.name = this.normalizer(ctx.query.name);

        if(ctx.query.name.length == 0){
            ctx.status = 400;
            return this.badRequest(ctx, 'The input you provided is a blank space.')
        }

        if(!/[^a-zA-Z0-9\s]+/g.test(ctx.query.name) || /\d+%/g.test(ctx.query.name)){
            ctx.query.name = ctx.query.name.toUpperCase();
        } else {
            return this.badRequest(ctx)
        }

        let filtered = data.filter(obj => {
            return obj['product'].toUpperCase().includes(ctx.query.name)
        });
      
        if (filtered.length > 0) {
             ctx.body = filtered;
        } else {
            return this.notFound(ctx)
        }
    }

    async getBySubstance(ctx) {
        if(!ctx.query.subs) return ctx.redirect(`http://localhost:${PORT}`);
        ctx.query.subs = this.normalizer(ctx.query.subs);

        if(ctx.query.subs.length == 0){
            ctx.status = 400;
            return this.badRequest(ctx, 'The input you provided is a blank space.')
        }

        if(!/[^a-zA-Z0-9\s]+/g.test(ctx.query.subs) || /\d+%/g.test(ctx.query.subs)){
            ctx.query.subs = ctx.query.subs.toUpperCase();
        } else {
            return this.badRequest(ctx)
        }

        let filtered = data.filter(obj => {
            return obj['substance'].toUpperCase().includes(ctx.query.subs)
        });
      
        if (filtered.length > 0) {
             ctx.body = filtered;
        } else {
            return this.notFound(ctx)
        }
    }
      
    async getByBarCode(ctx) {
        if(!ctx.query.code) return ctx.redirect(`http://localhost:${PORT}`);
        ctx.query.code = ctx.query.code.replace(/⠀/g, '').trim()

        if(ctx.query.code.length == 0){
            ctx.status = 400;
            return this.badRequest(ctx, 'The input you provided is a blank space.')
        }

        if(!/^\d+$/g.test(ctx.query.code)){
           return this.badRequest(ctx)
        }
        
        let filtered = data.filter(obj => {
            if(obj['ean_1'] == ctx.query.code) return obj['ean_1']
            if(obj['ean_2'] == ctx.query.code) return obj['ean_2']
            if(obj['ean_3'] == ctx.query.code) return obj['ean_3']
        });

        if (filtered.length > 0) {
            ctx.body = filtered;
        } else {
            return this.notFound(ctx)
        }
    }
      
    async getByGgrem(ctx) {
        if(!ctx.query.ggrem) return ctx.redirect(`http://localhost:${PORT}`);
        if(ctx.query.ggrem) ctx.query.ggrem = ctx.query.ggrem.replace(/⠀/g, '').trim()

        if(ctx.query.ggrem.length == 0){
            ctx.status = 400;
            return this.badRequest(ctx, 'The input you provided is a blank space.')
        }

        if(!/^\d+$/g.test(ctx.query.ggrem)){
           return this.badRequest(ctx)
        }

        let filtered = data.filter(obj => obj['ggrem_code'] == ctx.query.ggrem);

        if (filtered.length > 0) {
            ctx.body = filtered;
        } else {
            return this.notFound(ctx)
        }
    }
}