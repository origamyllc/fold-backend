/**
 * Created by prashun on 5/11/16.
 */

/**
 * Created by prashun on 5/11/16.
 */
'use strict';

import { responses } from '../../cut/index';
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
 *
 * @param req
 * @param res
 */
export function get(req, res) {
    req.log.debug("Getting value for key " + req.params.key + " from Redis");
    const key = req.params.key;
    RedisHelper.get(req.params.key).then((value) => {
        if (value) {
            req.log.info("Got value" + value + " for key " + req.params.key + " from redis");
            responses.sendSuccessResponse(res, {response: {"value": value}})
        } else {
            let error = extendError({message: "Cache miss: value for key " + key + " not found", errorCode: 3300});
            req.log.error(error);
            responses.sendErrorResponse(res, error);
        }
    });
}

export function setKeyValue(req, res) {
    // hacky fix this
    if(JSON.parse(Object.keys(req.body)[0])){
        req.body = JSON.parse(Object.keys(req.body)[0]);
    }

    req.log.debug("Setting value " + req.body.value + " for key " + req.body.key + "to redis");
    RedisHelper.setKeyValue(req.body.key, req.body.value).then((obj) => {
        req.log.info("Set value " + req.body.value + " for key " + req.body.key + "to redis");
        responses.sendSuccessResponse(res, {message: "Set value " + req.body.value + " for key " + req.body.key + "to redis"});
    })
        .catch((err) => {
            let error = extendError({
                message: " key " + req.body.key + " can not be inserted into Redis",
                errorCode: 3301
            });
            req.log.error(error);
            responses.sendErrorResponse(res, error);
        });
}


export function del(req, res) {
    req.log.debug("Deleting value for key " + req.params.key + " from redis");
    RedisHelper.del(req.params.key).then((obj) => {
        req.log.info("Deleted value for key " + req.params.key + " from redis");
        responses.sendSuccessResponse(res, {message: "Deleted value for key " + req.params.key + " from redis"});
    })
        .catch((err) => {
            let error = extendError({
                message: " key " + req.body.key + " can not be deleted from redis",
                errorCode: 3302
            });
            req.log.error(error);
            responses.sendErrorResponse(res, error);
        });
}
export function clear(req, res) {
    req.log.debug("clearing Redis Cache");
    RedisHelper.clear().then((isCleared) => {
        req.log.info("Redis Cache was sucessfully cleared");
        responses.sendSuccessResponse(res, {message: "Redis Cache was sucessfully cleared"});
    })
        .catch((err) => {
            let error = extendError({message: "Redis Cache was not sucessfully cleared", errorCode: 3303});
            req.log.error(error);
            responses.sendErrorResponse(res, error);
        });
}

export function count(req, res) {
    req.log.debug("retrieving a redis count");
    RedisHelper.size().then((count) => {
        req.log.info("Redis Count was sucessfully retrieved");
        responses.sendSuccessResponse(res, {
            response: {count: count},
            message: "Redis Count was sucessfully retrieved "
        });
    }).catch((err) => {
        let error = extendError({message: "Redis Count was not sucessfully retrieved", errorCode: 3304});
        req.log.error(error);
        responses.sendErrorResponse(res, error);
    });
}

export function hset(req, res) {
    req.log.debug("setting fields" + req.params.fields + "as hset");
    RedisHelper.hset(req.params.fields).then((set)=> {
        req.log.info("set fields " + req.params.fields + "as hset");
        responses.sendSuccessResponse(res, {message: "set fields " + req.params.fields + "as hset"});
    }).catch((err) => {
        let error = extendError({message: "can not set fields " + req.params.fields + "as hset", errorCode: 3305});
        req.log.error(error);
        responses.sendErrorResponse(res, error);
    });
}

export function hget(req, res) {
    req.log.debug("getting hset for key " + req.params.key);
    RedisHelper.hget(req.params.key).then((result) => {
        req.log.info("got hset for key " + req.params.key);
        responses.sendSuccessResponse(res, {response: {hset: result}, message: "got hset for key " + req.params.key});
    }).catch((err) => {
        let error = extendError({message: "can not  hset for key " + req.params.key, errorCode: 3306});
        req.log.error(error);
        responses.sendErrorResponse(res, error);
    });
}


