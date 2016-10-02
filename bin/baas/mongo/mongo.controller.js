/**
 * Created by prashun on 5/11/16.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bulk_insert = bulk_insert;
exports.find = find;
exports.show = show;
exports.update_by_id = update_by_id;
exports.update_by_field = update_by_field;
exports.delete_by_id = delete_by_id;
exports.delete_by_field = delete_by_field;
exports.get_count = get_count;
exports.get_filtered_count = get_filtered_count;
exports.filtered_pagination = filtered_pagination;
exports.sorted_pagination = sorted_pagination;
exports.get_by_id = get_by_id;

var _hulkCut = require('hulk-cut');

var _mongo = require('./mongo.helper');

var MongoHelper = _interopRequireWildcard(_mongo);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _ = require('lodash');

var MONGOError = {
    type: "Infrastructure Service Error",
    details: {
        api: "MONGODB",
        root: "/commons/v1/infrastructure/mongo"
    }
};

function extendError(obj) {
    var err = _.extend(MONGOError, obj);
    return err;
}

/**
 * const Douche = mongoose.model('Douche', DoucheSchema);
 *
 *  const doucheBag = [a humongous amount of douches ];
 *
 *  Douche.collection.insert(doucheBag, onInsert);
 *
 *   function onInsert(err, docs) {
 *       if (err) {
 *          console.log(error)
 *       } else {
 *         console.info('%d doucheBag successfully stored.', docs.length);
 *       }
 *   }
 *
 * @param modelName
 * @param documentArray
 */

function bulk_insert(req, res) {
    req.log.debug("inserting data " + JSON.stringify(req.body) + "into collection " + req.params.modelname);
    MongoHelper.bulkInsert(req).then(function (docs) {
        if (docs && !docs.errors) {
            req.log.info("sucessfully inserted data " + JSON.stringify(req.body) + "into collection " + req.params.modelname);
            _hulkCut.$res.send_success_response(res, {
                response: {
                    docs: req.body,
                    message: "sucessfully inserted data into collection" + req.params.modelname
                }
            });
        } else {
            var error = handleInsertError(req, docs);
            req.log.error(error);
            _hulkCut.$res.send_not_found_error(res, error);
        }
    });
}
function handleInsertError(req, docs) {
    var error = null;
    if (docs.errors) {
        error = extendError({
            message: docs.errors,
            errorCode: 2200
        });
    } else {
        error = extendError({
            message: "failed to insert data into collection" + req.params.modelname,
            errorCode: 2200
        });
    }
    return error;
}

/**
 * get results by param with given value
 * @param req
 * @param res
 */

function find(req, res) {
    req.log.debug("finding data in collection " + req.params.modelname + " by field " + req.params.field + " with value " + req.params.value);
    MongoHelper.find(req).then(function (docs) {
        if (docs && docs.length > 0) {
            req.log.info("found data in collection " + req.params.modelname + " by field " + req.params.field + " with value " + req.params.value + " results: ");
            _hulkCut.$res.send_success_response(res, {
                response: {
                    docs: docs,
                    message: "found data in collection " + req.params.modelname + " by field " + req.params.field + " with value " + req.params.value
                }
            });
        } else {
            var error = extendError({
                message: "can not find data in collection " + req.params.modelname + " by field " + req.params.field + " with value " + req.params.value, errorCode: 2201
            });
            req.log.error(error);
            _hulkCut.$res.send_not_found_error(res, error);
        }
    });
}

/**
 * get all results for the given model
 * @param req
 * @param res
 */

function show(req, res) {
    req.log.debug("found data for collection " + req.params.modelname);
    MongoHelper.show(req).then(function (docs) {
        if (docs && docs.length > 0) {
            req.log.info("found data for collection " + req.params.modelname);
            _hulkCut.$res.send_success_response(res, {
                response: {
                    docs: docs,
                    message: "found data for collection " + req.params.modelname
                }
            });
        } else {
            var error = extendError({
                message: "can not find data for collection " + req.params.modelname,
                errorCode: 2202
            });
            req.log.error(error);
            _hulkCut.$res.send_not_found_error(res, error);
        }
    });
}

/**
 * update a single document by id
 * @param req
 * @param res
 */

function update_by_id(req, res) {
    req.log.debug("updating data for id " + req.params.id + " for collection " + req.params.modelname + "with body " + JSON.stringify(req.body));

    MongoHelper.updateById(req).then(function (docs) {
        if (docs) {
            req.log.info("updated data for id " + req.params.id + " for collection " + req.params.modelname);

            _hulkCut.$res.send_success_response(res, {
                response: {
                    docs: docs,
                    message: "updated data for id " + req.params.id + " for collection " + req.params.modelname
                }
            });
        } else {
            var error = extendError({
                message: "can not update data for id " + req.params.id + " for collection " + req.params.modelname + "with body ",
                errorCode: 2203
            });
            req.log.error(error);
            _hulkCut.$res.send_not_found_error(res, error);
        }
    });
}

/**
 * update a multiple documents matched by a given param
 * @param req
 * @param res
 */
function update_by_field(req, res) {

    req.log.debug("updating data for field  " + req.params.key + " with value " + req.params.value + " for collection " + req.params.modelname + "with body " + JSON.stringify(req.body));

    MongoHelper.updateByField(req).then(function (docs) {
        if (docs) {
            req.log.info("updating data for field  " + req.params.key + " with value " + req.params.value + " for collection " + req.params.modelname + "with body " + JSON.stringify(req.body));

            _hulkCut.$res.send_success_response(res, {
                response: {
                    docs: docs,
                    message: "updated data for field  " + req.params.key + " with value " + req.params.value + " for collection " + req.params.modelname
                }
            });
        } else {
            var error = extendError({
                message: "can not update data for field  " + req.params.key + " with value " + req.params.value + " for collection " + req.params.modelname,
                errorCode: 2203
            });
            req.log.error(error);
            _hulkCut.$res.send_not_found_error(res, error);
        }
    });
}

/**
 * delete single document by id
 * @param req
 * @param res
 */

function delete_by_id(req, res) {
    req.log.debug("deleting data for id " + req.params.id + " for collection " + req.params.modelname);
    MongoHelper.delById(req).then(function (docs) {
        if (!docs) {

            req.log.info(" deleted data for id " + req.params.id + " for collection " + req.params.modelname);
            _hulkCut.$res.send_success_response(res, {
                response: {
                    docs: { "success": "OK" },
                    message: " deleted data for id " + req.params.id + " for collection " + req.params.modelname
                }
            });
        } else {
            var error = extendError({
                message: " can not delete data for id " + req.params.id + " for collection " + req.params.modelname,
                errorCode: 2204
            });
            req.log.error(error);
            _hulkCut.$res.send_not_found_error(res, error);
        }
    });
}

/**
 * delete multiple document by param
 * @param req
 * @param res
 */

function delete_by_field(req, res) {
    req.log.debug(" deleting data for field  " + req.params.key + " with value " + req.params.value + " for collection " + req.params.modelname);

    MongoHelper.delById(req).then(function (error) {
        if (error) {
            var _error = extendError({
                message: "can not delete data for field  " + req.params.key + " with value " + req.params.value + " for collection " + req.params.modelname,
                errorCode: 2205
            });
            req.log.error(_error);
            _hulkCut.$res.send_not_found_error(res, _error);
        } else {
            req.log.info(" deleted data for field  " + req.params.key + " with value " + req.params.value + " for collection " + req.params.modelname);
            _hulkCut.$res.send_success_response(res, {
                response: {
                    docs: null,
                    message: " deleted data for field  " + req.params.key + " with value " + req.params.value + " for collection " + req.params.modelname
                }
            });
        }
    });
}

/**
 * count the total number of results
 * @param req
 * @param res
 */

function get_count(req, res) {
    req.log.debug("getting count  for collection " + req.params.modelname);
    MongoHelper.count(req).then(function (count) {
        if (count) {
            req.log.info("got count  for collection " + req.params.modelname);
            _hulkCut.$res.send_success_response(res, {
                response: {
                    count: count,
                    message: " count for collection " + req.params.modelname + " is " + count
                }
            });
        } else {
            var error = extendError({
                message: "can not get count  for collection " + req.params.modelname,
                errorCode: 2206
            });
            req.log.error(error);
            _hulkCut.$res.send_not_found_error(res, error);
        }
    });
}

/**
 * count the total number of results
 * @param req
 * @param res
 */

function get_filtered_count(req, res) {
    req.log.debug("getting count  for collection " + req.params.modelname + " for filter with key " + req.params.fields + " and value " + req.params.value);
    MongoHelper.countFiltered(req).then(function (count) {
        if (count) {
            req.log.info("got count  for collection " + req.params.modelname + " for filter with key " + req.params.fields + " and value " + req.params.value);
            _hulkCut.$res.send_success_response(res, {
                response: {
                    count: count,
                    message: " count for collection " + req.params.modelname + " is " + count
                }
            });
        } else {
            var error = extendError({
                message: "can not get count  for collection " + req.params.modelname + " for filter with key " + req.params.fields + " and value " + req.params.value,
                errorCode: 2207
            });
            req.log.error(error);
            _hulkCut.$res.send_not_found_error(res, error);
        }
    });
}

/**
 * filter paginated results
 * @param req
 * @param res
 */

function filtered_pagination(req, res) {
    req.log.debug("found data filtered by key " + req.params.field + " having value " + req.params.value + " and paginated data for collection " + req.params.modelname + " for page number " + req.params.currentPage);

    MongoHelper.filteredPagination(req).then(function (docs) {
        if (docs && docs.length > 0) {
            req.log.info("found data filtered by key " + req.params.field + " having value " + req.params.value + " and paginated data for collection " + req.params.modelname + " for page number " + req.params.currentPage);
            _hulkCut.$res.send_success_response(res, {
                response: {
                    docs: docs,
                    message: "found data filtered by key " + req.params.field + " having value " + req.params.value + " and paginated data for collection " + req.params.modelname + " for page number " + req.params.currentPage
                }
            });
        } else {
            var error = extendError({
                message: "can not find data filtered by key " + req.params.field + " having value " + req.params.value + " and paginated data for collection " + req.params.modelname + " for page number " + req.params.currentPage,
                errorCode: 2208
            });
            req.log.error(error);
            _hulkCut.$res.send_not_found_error(res, error);
        }
    });
}

/**
 * sort paginated results
 * @param req
 * @param res
 */

function sorted_pagination(req, res) {
    req.log.debug("found paginated data for collection " + req.params.modelname + " for page number " + req.params.currentPage);
    MongoHelper.sortedPagination(req).then(function (docs) {
        if (docs && docs.length > 0) {
            req.log.info("found paginated data for collection " + req.params.modelname + " for page number " + req.params.currentPage);
            _hulkCut.$res.send_success_response(res, {
                response: {
                    docs: docs,
                    message: "found paginated data for collection " + req.params.modelname + " for page number " + req.params.currentPage
                }
            });
        } else {
            var error = extendError({
                message: "found paginated data for collection " + req.params.modelname + " for page number " + req.params.currentPage,
                errorCode: 2209
            });
            req.log.error(error);
            _hulkCut.$res.send_not_found_error(res, error);
        }
    });
}

/**
 * get by id
 * @param req
 * @param res
 */

function get_by_id(req, res) {
    req.log.debug("found  data for collection " + req.params.modelname + " for id " + req.params.id);
    MongoHelper.getById(req).then(function (docs) {
        if (docs && docs.length > 0) {
            req.log.info("found  data for collection " + req.params.modelname + " for id " + req.params.id);
            _hulkCut.$res.send_success_response(res, {
                response: {
                    docs: docs,
                    message: "found  data for collection " + req.params.modelname + " for id " + req.params.id
                }
            });
        } else {
            var error = extendError({
                message: "can not find  data for collection " + req.params.modelname + " for id " + req.params.id,
                errorCode: 2210
            });
            req.log.error(error);
            _hulkCut.$res.send_not_found_error(res, error);
        }
    });
}