/**
 * Created by prashun on 5/11/16.
 */

/**
 * Created by prashun on 5/11/16.
 */
'use strict';

import { $cache,$res }  from 'hulk-cut';
import * as RedisHelper from './redis.helper';
const _ = require('lodash');


let RedisError = {
    type: "Infrastructure Service Error",
    details: {
        api: "Redis",
        root: "/commons/v1/infrastructure/redis"
    }
}

function extendError(obj) {
    let err = _.extend(RedisError, obj)
    return err;
}

/**
 * get key from redis
 * @param req
 * @param res
 */
export function get(req, res) {
    req.log.debug("Getting value for key " + req.params.key + " from Redis");
    const key = req.params.key;
    RedisHelper.get(req.params.key).then((value) => {
        if (value) {
            req.log.info("Got value" + value + " for key " + req.params.key + " from redis");
            $res.send_success_response(res, {response: {"value": value}})
        } else {
            let error = extendError({message: "Cache miss: value for key " + key + " not found", errorCode: 3300});
            req.log.error(error);
            $res.send_not_found_error(res, error);
        }
    });
}

/**
 * set key in redis
 * @param req
 * @param res
 */
export function setKeyValue(req, res) {
  req.log.debug("Setting value " + req.body.value + " for key " + req.body.key + "to redis");
    RedisHelper.setKeyValue(req.body.key, req.body.value).then((obj) => {
        req.log.info("Set value " + req.body.value + " for key " + req.body.key + "to redis");
        $res.send_success_response(res, {message: "Set value " + req.body.value + " for key " + req.body.key + "to redis"});
    })
        .catch((err) => {
            let error = extendError({
                message: " key " + req.body.key + " can not be inserted into Redis",
                errorCode: 3301
            });
            req.log.error(err);
            req.log.error(error);
            $res.send_not_found_error(res, error);
        });
}

/**
 * delete a key from the redis
 * @param req
 * @param res
 */
export function del(req, res) {
    req.log.debug("Deleting value for key " + req.params.key + " from redis");
    RedisHelper.del(req.params.key).then((obj) => {
        req.log.info("Deleted value for key " + req.params.key + " from redis");
        $res.send_success_response(res, {message: "Deleted value for key " + req.params.key + " from redis"});
    })
        .catch((err) => {
            let error = extendError({
                message: " key " + req.body.key + " can not be deleted from redis",
                errorCode: 3302
            });
            req.log.error(err);
            req.log.error(error);
            $res.send_not_found_error(res, error);
        });
}

/**
 * clear all values from redis
 * @param req
 * @param res
 */
export function clear(req, res) {
    req.log.debug("clearing Redis Cache");
    RedisHelper.clear().then((isCleared) => {
        req.log.info("Redis Cache was sucessfully cleared");
        $res.send_success_response(res, {message: "Redis Cache was sucessfully cleared"});
    })
        .catch((err) => {
            let error = extendError({message: "Redis Cache was not sucessfully cleared", errorCode: 3303});
            req.log.error(err);
            req.log.error(error);
            $res.send_not_found_error(res, error);
        });
}



//TODO:add hset and hget