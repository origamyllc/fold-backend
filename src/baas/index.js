
'use strict';

import { mongo_router } from './mongo/mongo.route';
import { redis_router } from './redis/redis.route';
import { rabbit_router } from './rabbitmq/rabbit.route';

import { $app } from 'hulk-cut';

$app.use( mongo_router );
$app.use( rabbit_router );
$app.use( redis_router );


