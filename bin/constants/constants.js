'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.settings = exports.REDIS_SERVER_CONF = exports.MONGO_DB_URL = undefined;

var _dev = require('../config/env/dev.js');

var _int = require('../config/env/int.js');

var _prod = require('../config/env/prod.js');

var _qa = require('../config/env/qa.js');

var _stress = require('../config/env/stress.js');

var config = _dev.devConfig; /**
                              * Created by prashun on 7/26/16.
                              */

if (process.env.NODE_ENV === 'development') {
    config = _dev.devConfig;
}

if (process.env.NODE_ENV === 'integration') {
    config = _int.integrationConfig;
}

if (process.env.NODE_ENV === 'production') {
    config = _prod.productionConfig;
}

if (process.env.NODE_ENV === 'qa') {
    config = _qa.qaConfig;
}

if (process.env.NODE_ENV === 'stress') {
    config = _stress.stressConfig;
}

//add constants here
var MONGO_DB_URL = exports.MONGO_DB_URL = config.mongo;
var REDIS_SERVER_CONF = exports.REDIS_SERVER_CONF = config.redis.db;
var settings = exports.settings = config;