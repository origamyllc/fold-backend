'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.get = get;
exports.setKeyValue = setKeyValue;
exports.setMulti = setMulti;
exports.getMulti = getMulti;
exports.del = del;
exports.clear = clear;
exports.size = size;

var _hulkCut = require('hulk-cut');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by prashun on 5/11/16.
 */
function get(key) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$cache.redis.get(key).then(function (reply) {
            resolve(reply);
        });
    });
}

function setKeyValue(key, value) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$cache.redis.set(key, value).then(function (reply) {
            resolve(reply);
            return null;
        });
    });
}

function setMulti(key, value) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$cache.redis.setMulti(key, value).then(function (reply) {
            resolve(true);
        });
    });
}

function getMulti(keys) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$cache.redis.getMulti(keys).then(function (reply) {
            resolve(reply);
        });
    });
}

function del(key) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$cache.redis.delete(key).then(function (reply) {
            resolve(reply);
        });
    });
}

function clear() {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$cache.redis.clear().then(function (cleared) {
            resolve(true);
        });
    });
}

function size() {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$cache.redis.size().then(function (size) {
            resolve(size);
        });
    });
}