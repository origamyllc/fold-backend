'use strict';

import { cranberryRouter } from '../../cut/index';
import  * as  LRUCacheController from './lru.controller'

export const cacheRouter = cranberryRouter;

cacheRouter.get('/api/v1/infrastructure/cache/:key', LRUCacheController.read);
cacheRouter.get('/api/v1/infrastructure/cache/clear/', LRUCacheController.clear);
cacheRouter.get('/api/v1/infrastructure/cache/haskey/:key', LRUCacheController.hasKey);
cacheRouter.post('/api/v1/infrastructure/cache/', LRUCacheController.create);
cacheRouter.put('/api/v1/infrastructure/cache/:key', LRUCacheController.update);
cacheRouter.delete('/api/v1/infrastructure/cache/:key', LRUCacheController.del);



