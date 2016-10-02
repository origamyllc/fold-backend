
'use strict';

import { mongo_router } from './mongo/mongo.route';
import { redisRouter } from './redis/redis.route';
import { rabbitRouter } from './rabbitmq/rabbit.route';

import { $app } from 'hulk-cut';

$app.use( mongo_router );
$app.use( redisRouter );
$app.use( rabbitRouter );


