/**
 * Created by prashun on 5/11/16.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongo_router = undefined;

var _hulkCut = require('hulk-cut');

var _mongo = require('./mongo.controller');

var mongo_controller = _interopRequireWildcard(_mongo);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var mongo_router = exports.mongo_router = _hulkCut.$router;
var FOLD_MONGO_URL = '/api/v1/mongo';

//GET
mongo_router.get(FOLD_MONGO_URL + '/:modelname', mongo_controller.show);
mongo_router.get(FOLD_MONGO_URL + '/:modelname/:id', mongo_controller.get_by_id);
mongo_router.get(FOLD_MONGO_URL + '/count/:modelname', mongo_controller.get_count);
mongo_router.get(FOLD_MONGO_URL + '/count/:modelname/:field/:value', mongo_controller.get_filtered_count);
mongo_router.get(FOLD_MONGO_URL + '/:modelname/:field/:value', mongo_controller.find);
mongo_router.get(FOLD_MONGO_URL + '/filter/:modelname/:field/:value/:itemsPerPage/:currentPage', mongo_controller.filtered_pagination);
mongo_router.get(FOLD_MONGO_URL + '/sort/:modelname/:itemsPerPage/:currentPage/:sortByField/:sortCriteria', mongo_controller.sorted_pagination);

// POST
mongo_router.post(FOLD_MONGO_URL + '/:modelname', mongo_controller.bulk_insert);

// PUT
mongo_router.put(FOLD_MONGO_URL + '/:modelname/:id', mongo_controller.update_by_id);
mongo_router.put(FOLD_MONGO_URL + '/:modelname/:key/:value', mongo_controller.update_by_field);

//DELETE
mongo_router.delete(FOLD_MONGO_URL + '/:modelname/:id', mongo_controller.delete_by_id);
mongo_router.delete(FOLD_MONGO_URL + '/:modelname/:key/:value', mongo_controller.delete_by_field);