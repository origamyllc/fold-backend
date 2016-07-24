
'use strict';

import { cacheRouter } from './lru/lru.route';
import { mongoRouter } from './mongo/mongo.route';
import { redisRouter } from './redis/redis.route';
import { rabbitRouter } from './rabbitmq/rabbit.route';
import { app,router } from '../cut/middleware/cut.express';

app.use( cacheRouter )
app.use( mongoRouter )
app.use( redisRouter )
app.use( rabbitRouter )

