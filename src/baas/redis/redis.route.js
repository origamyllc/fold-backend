/**
 * Created by prashun on 5/11/16.
 */

'use strict';


import { $router,$auth } from 'hulk-cut';
import  * as  redisController from './redis.controller'

export const redis_router = $router;
const FOLD_REDIS_CACHE_URL = '/api/v1/redis';

redis_router.post( FOLD_REDIS_CACHE_URL + '/' ,redisController.setKeyValue);
redis_router.post( FOLD_REDIS_CACHE_URL + '/mset' ,redisController.mset);
redis_router.get(  FOLD_REDIS_CACHE_URL + '/:key',redisController.get);
redis_router.get(  FOLD_REDIS_CACHE_URL + '/mget/:key',redisController.mget);
redis_router.delete( FOLD_REDIS_CACHE_URL +'/:key',redisController.del);
redis_router.delete( FOLD_REDIS_CACHE_URL + '/clear',redisController.clear);
