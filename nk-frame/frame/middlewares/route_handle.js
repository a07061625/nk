/**
 * 路由处理
 * User: 姜伟
 * Date: 19-4-30
 * Time: 下午8:14
 */
const fs = require('fs');
const Log = require('nk-frame/logs/log');
const KoaRouter = require('koa-router');
const cacheRoute = require('nk-frame/caches/cache_route');

/**
 * 获取并遍历所有的控制器文件列表
 */
let routeMap = {};
let routeObj = new KoaRouter();
let routeUri = '';
let controllerPath = process.cwd() + '/node_modules/nk-project/controllers';
let controllerObj = null;
let controllerKeys = [];
let files = fs.readdirSync(controllerPath);
let controllerFile = '';
let controller = '';
let action = '';
let actionName = '';
for (let i = 0; i < files.length; i++) {
    if (!files[i].endsWith('.js')) {
        continue;
    }
    if (files[i] === 'common.js') {
        continue;
    }

    routeMap = {};
    controllerFile = files[i];
    controller = files[i].substr(0, controllerFile.length - 3);
    controllerObj = require('nk-project/controllers/' + controller);
    controllerKeys = Object.getOwnPropertyNames(controllerObj);
    Log.info('keys:', controllerKeys);
    for (let j = 0; j < controllerKeys.length; j++) {
        actionName = controllerKeys[j];
        if (!actionName.endsWith('Action')) {
            continue;
        }
        if (typeof controllerObj[actionName] !== 'function') {
            continue;
        }

        action = controllerKeys[j].substr(0, action.length - 6);
        routeUri = '/' + controller + '/' + action;
        routeObj.get(routeUri, controllerObj[actionName]());
        routeMap[action] = 1;
    }
    cacheRoute.set(controller, routeMap);
}

module.exports = routeObj;
