/**
 * Created by prashun on 5/11/16.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redisRouter = undefined;

var _hulkCut = require('hulk-cut');

var _redis = require('./redis.controller');

var redisController = _interopRequireWildcard(_redis);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var redisRouter = exports.redisRouter = _hulkCut.$router;
var FOLD_REDIS_CACHE_URL = '/api/v1/redis';

redisRouter.post(FOLD_REDIS_CACHE_URL + '/', _hulkCut.$auth.isAuthenticated, redisController.setKeyValue);
redisRouter.get(FOLD_REDIS_CACHE_URL + '/:key', _hulkCut.$auth.isAuthenticated, redisController.get);
redisRouter.delete(FOLD_REDIS_CACHE_URL + '/:key', _hulkCut.$auth.isAuthenticated, redisController.del);
redisRouter.delete(FOLD_REDIS_CACHE_URL + '/clear', _hulkCut.$auth.isAuthenticated, redisController.clear);