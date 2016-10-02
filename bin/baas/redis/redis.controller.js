/**
 * Created by prashun on 5/11/16.
 */

/**
 * Created by prashun on 5/11/16.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.get = get;
exports.setKeyValue = setKeyValue;
exports.del = del;
exports.clear = clear;

var _hulkCut = require('hulk-cut');

var _redis = require('./redis.helper');

var RedisHelper = _interopRequireWildcard(_redis);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _ = require('lodash');

var RedisError = {
    type: "Infrastructure Service Error",
    details: {
        api: "Redis",
        root: "/commons/v1/infrastructure/redis"
    }
};

function extendError(obj) {
    var err = _.extend(RedisError, obj);
    return err;
}

/**
 * get key from redis
 * @param req
 * @param res
 */
function get(req, res) {
    req.log.debug("Getting value for key " + req.params.key + " from Redis");
    var key = req.params.key;
    RedisHelper.get(req.params.key).then(function (value) {
        if (value) {
            req.log.info("Got value" + value + " for key " + req.params.key + " from redis");
            _hulkCut.$res.send_success_response(res, { response: { "value": value } });
        } else {
            var error = extendError({ message: "Cache miss: value for key " + key + " not found", errorCode: 3300 });
            req.log.error(error);
            _hulkCut.$res.send_not_found_error(res, error);
        }
    });
}

/**
 * set key in redis
 * @param req
 * @param res
 */
function setKeyValue(req, res) {
    req.log.debug("Setting value " + req.body.value + " for key " + req.body.key + "to redis");
    RedisHelper.setKeyValue(req.body.key, req.body.value).then(function (obj) {
        req.log.info("Set value " + req.body.value + " for key " + req.body.key + "to redis");
        _hulkCut.$res.send_success_response(res, { message: "Set value " + req.body.value + " for key " + req.body.key + "to redis" });
    }).catch(function (err) {
        var error = extendError({
            message: " key " + req.body.key + " can not be inserted into Redis",
            errorCode: 3301
        });
        req.log.error(err);
        req.log.error(error);
        _hulkCut.$res.send_not_found_error(res, error);
    });
}

/**
 * delete a key from the redis
 * @param req
 * @param res
 */
function del(req, res) {
    req.log.debug("Deleting value for key " + req.params.key + " from redis");
    RedisHelper.del(req.params.key).then(function (obj) {
        req.log.info("Deleted value for key " + req.params.key + " from redis");
        _hulkCut.$res.send_success_response(res, { message: "Deleted value for key " + req.params.key + " from redis" });
    }).catch(function (err) {
        var error = extendError({
            message: " key " + req.body.key + " can not be deleted from redis",
            errorCode: 3302
        });
        req.log.error(err);
        req.log.error(error);
        _hulkCut.$res.send_not_found_error(res, error);
    });
}

/**
 * clear all values from redis
 * @param req
 * @param res
 */
function clear(req, res) {
    req.log.debug("clearing Redis Cache");
    RedisHelper.clear().then(function (isCleared) {
        req.log.info("Redis Cache was sucessfully cleared");
        _hulkCut.$res.send_success_response(res, { message: "Redis Cache was sucessfully cleared" });
    }).catch(function (err) {
        var error = extendError({ message: "Redis Cache was not sucessfully cleared", errorCode: 3303 });
        req.log.error(err);
        req.log.error(error);
        _hulkCut.$res.send_not_found_error(res, error);
    });
}

//TODO:add hset and hget