/**
 * Created by prashun on 5/11/16.
 */

'use strict';


import { cranberryRouter , authentication } from '../../cut/index';
import  * as  redisController from './redis.controller'

export const redisRouter = cranberryRouter;

redisRouter.post('/api/v1/infrastructure/redis/' ,authentication.isAuthenticated,redisController.setKeyValue);
redisRouter.get('/api/v1/infrastructure/redis/hset/:fields',authentication.isAuthenticated, redisController.hset);
redisRouter.get('/api/v1/infrastructure/redis/hget/:key',authentication.isAuthenticated, redisController.hget);
redisRouter.get('/api/v1/infrastructure/redis/:key',authentication.isAuthenticated, redisController.get);
redisRouter.get('/api/v1/infrastructure/redis/count',authentication.isAuthenticated,redisController.count);
redisRouter.delete('/api/v1/infrastructure/redis/:key',authentication.isAuthenticated, redisController.del);
redisRouter.delete('/api/v1/infrastructure/redis/clear',authentication.isAuthenticated, redisController.clear);
