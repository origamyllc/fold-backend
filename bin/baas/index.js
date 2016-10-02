
'use strict';

var _mongo = require('./mongo/mongo.route');

var _redis = require('./redis/redis.route');

var _rabbit = require('./rabbitmq/rabbit.route');

var _hulkCut = require('hulk-cut');

_hulkCut.$app.use(_mongo.mongo_router);
_hulkCut.$app.use(_redis.redisRouter);
_hulkCut.$app.use(_rabbit.rabbitRouter);