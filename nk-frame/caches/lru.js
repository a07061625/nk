/**
 * lru缓存
 * User: 姜伟
 * Date: 19-4-30
 * Time: 下午3:34
 */
const LRU = require('lru-cache');
const lruConfig = require('nk-project/configs/cache');

class CacheLru {
    obj = null;

    /**
     * @param {string} tag
     */
    constructor(tag) {
        this.obj = new LRU(lruConfig['lru'][tag]);
    }

    /**
     * 获取缓存数据
     * @param {string} key
     * @returns {*}
     */
    get(key) {
        let data = this.obj.get(key);
        if (typeof data === 'undefined') {
            return null;
        }
        return data;
    }

    /**
     * 设置缓存数据
     * @param {string} key
     * @param {*} value
     * @returns {boolean}
     */
    set(key, value) {
        if ((value === null) || (typeof value === 'undefined')) {
            return false;
        }
        this.obj.set(key, value);
        return true;
    }

    /**
     * 检测缓存数据是否存在
     * @param {string} key
     * @returns {*|boolean}
     */
    exist(key) {
        return this.obj.has(key);
    }

    /**
     * 删除缓存数据
     * @param {string} key
     * @returns {*}
     */
    del(key) {
        return this.obj.del(key);
    }

    /**
     * 清空缓存
     * @returns {*}
     */
    reset() {
        return this.obj.reset();
    }
}

module.exports = CacheLru;