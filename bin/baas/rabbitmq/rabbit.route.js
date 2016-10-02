/**
 * Created by prashun on 5/11/16.
 */
/**
 * Created by prashun on 5/11/16.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rabbitRouter = undefined;

var _hulkCut = require('hulk-cut');

var _rabbit = require('./rabbit.controller');

var rabbitController = _interopRequireWildcard(_rabbit);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var rabbitRouter = exports.rabbitRouter = _hulkCut.$router;
var FOLD_RABBITMQ_URL = '/api/v1/rabbit';

rabbitRouter.post(FOLD_RABBITMQ_URL + '/create', rabbitController.init);
rabbitRouter.post(FOLD_RABBITMQ_URL + '/publish', rabbitController.publish);
rabbitRouter.post(FOLD_RABBITMQ_URL + '/subscribe', rabbitController.subscribe);