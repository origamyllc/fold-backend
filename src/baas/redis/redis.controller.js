
/**
 * Created by prashun on 5/11/16.
 */
'use strict';

import { $cache,$res }  from 'hulk-cut';
import * as RedisHelper from './redis.helper';
import * as Validator from './redis.validate';
import * as Errors from './redis.errors';

/**
 * get key from redis
 * @param req
 * @param res
 */
export function get(req, res) {
    Validator.validate_get_params(req).then((isValid) => {
        if(isValid && !isValid.details ) {
            req.log.debug(`Getting value for key ${req.params.key}  from Redis`);
            RedisHelper.get(req.params.key).then((value) => {
                if (value) {
                    req.log.info(`Got value ${value} for key  ${req.params.key} from redis`);
                    $res.send_success_response(res, {response: {"value": value}})
                } else {
                    $res.send_internal_server_error(res, Errors.can_not_get_value);
                }
            });
        } else {
            $res.send_internal_server_error(res,Errors.posted_body_is_not_valid);
        }
    });
}

/**
 * set key in redis
 * @param req
 * @param res
 * @example {"key":"key","value":"value"}
 */
export function setKeyValue(req, res) {
    Validator.validate_set_body(req).then((isValid) => {
        if(isValid && !isValid.details ) {
            req.log.debug(`Setting value ${req.body.value} for key ${req.body.key} to redis`);
            RedisHelper.setKeyValue(req.body.key, req.body.value).then(() => {
                req.log.info(`Set value ${req.body.value} for key ${req.body.key} to redis`);
                $res.send_success_response(res, {message: "Set value " + req.body.value + " for key " + req.body.key + " to redis"});
            }).catch((err) => {
                    req.log.error(err);
                    $res.send_internal_server_error(res,Errors.can_not_set_value);
                });
        } else {
            $res.send_internal_server_error(res,Errors.posted_body_is_not_valid);
        }
    });
}

/**
 * delete a key from the redis
 * @param req
 * @param res
 */
export function del(req, res) {
    Validator.validate_del_params(req).then((isValid) => {
        if(isValid && !isValid.details ) {
            req.log.debug(`Deleting value for key  ${req.params.key}  from redis`);
            RedisHelper.del(req.params.key).then(() => {
                req.log.info(`Deleted value for key ${req.params.key} from redis`);
                $res.send_success_response(res, {message: "Deleted value for key " + req.params.key + " from redis"});
            }).catch((err) => {
                req.log.error(err);
                $res.send_not_found_error(res, Errors.can_not_delete_value);
            });
        }
    });
}

/**
 * clear all values from redis
 * @param req
 * @param res
 */
export function clear(req, res) {
    req.log.debug("Clearing Redis Cache");
    RedisHelper.clear().then(() => {
        req.log.info("Redis Cache was sucessfully cleared");
        $res.send_success_response(res, { message: "Redis Cache was sucessfully cleared" });
    })
     .catch((err) => {
         req.log.error(err);
         $res.send_not_found_error(res, error);
     });
}

//TODO:add hset and hget
