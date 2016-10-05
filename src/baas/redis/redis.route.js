/**
 * Created by prashun on 5/11/16.
 */

'use strict';


import { $router,$auth } from 'hulk-cut';
import  * as  redisController from './redis.controller'

export const redisRouter = $router;
const FOLD_REDIS_CACHE_URL = '/api/v1/redis';

redisRouter.post( FOLD_REDIS_CACHE_URL + '/' ,redisController.setKeyValue);
redisRouter.get(  FOLD_REDIS_CACHE_URL + '/:key',redisController.get);
redisRouter.delete( FOLD_REDIS_CACHE_URL +'/:key',redisController.del);
redisRouter.delete( FOLD_REDIS_CACHE_URL + '/clear',redisController.clear);
