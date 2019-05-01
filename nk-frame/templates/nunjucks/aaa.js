/**
 * Created by nk.
 * User: 姜伟
 * Date: 19-5-1
 * Time: 下午6:34
 */

I come up a solution to use nunjucks without any other renderer library in koa v2:

    /*
    USAGE:

    import njk from './nunjucks';

    // Templating - Must be used before any router
    app.use(njk(path.join(__dirname, 'views'), {
      extname: '.njk',
      noCache: process.env.NODE_ENV !== 'production',
      throwOnUndefined: true,
      filters: {
        json: function (str) {
          return JSON.stringify(str, null, 2);
        },
        upperCase: str => str.toUpperCase(),
      },
      globals: {
        version: 'v3.0.0',
      },
    }));

    */

// Inspired by:
// https://github.com/ohomer/koa-nunjucks-render/blob/master/index.js
// https://github.com/beliefgp/koa-nunjucks-next/blob/master/index.js

    const Promise = require('bluebird');
const nunjucks = require('nunjucks');

function njk(path, opts) {
    const env = nunjucks.configure(path, opts);

    const extname = opts.extname || '';

    const filters = opts.filters || {};
    //console.time('benchmark');
    const f = Object.keys(filters).length;
    let i = 0;
    while (i < f) {
        env.addFilter(Object.keys(filters)[i], Object.values(filters)[i]);
        i += 1;
    }
    //console.timeEnd('benchmark');

    const globals = opts.globals || {};
    const g = Object.keys(globals).length;
    let j = 0;
    while (j < g) {
        env.addFilter(Object.keys(globals)[j], Object.values(globals)[j]);
        j += 1;
    }

    return (ctx, next) => {
        ctx.render = (view, context = {}) => {
            context = Object.assign({}, ctx.state, context);
            return new Promise((resolve, reject) => {
                env.render(`${view}${extname}`, context, (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    ctx.body = res;
                    return resolve();
                });
            });
        };
        return next();
    };
}

module.exports = njk;

https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434501628911140e1cb6ce7d42e5af81480f7ecd5802000