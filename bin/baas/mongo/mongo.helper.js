/**
 * Created by prashun on 5/11/16.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bulkInsert = bulkInsert;
exports.find = find;
exports.show = show;
exports.getById = getById;
exports.updateById = updateById;
exports.updateByField = updateByField;
exports.delById = delById;
exports.delByField = delByField;
exports.count = count;
exports.countFiltered = countFiltered;
exports.filteredPagination = filteredPagination;
exports.sortedPagination = sortedPagination;
exports.sortAndFilterAndPaginate = sortAndFilterAndPaginate;

var _hulkCut = require('hulk-cut');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bulkInsert(req) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$mongo.engine.bulkInsert(req.params.modelname, req.body).then(function (docs) {
            resolve(docs);
        });
    });
}

function find(req) {
    var key = req.params.field;
    var value = req.params.value;

    var query = {};
    query[key] = value;

    return new _bluebird2.default(function (resolve) {
        _hulkCut.$mongo.engine.find(req.params.modelname, JSON.stringify(query)).then(function (docs) {
            resolve(docs);
        });
    });
}

function show(req) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$mongo.engine.show(req.params.modelname).then(function (docs) {
            resolve(docs);
        });
    });
}

function getById(req) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$mongo.engine.getById(req.params.modelname, req.params.id).then(function (docs) {
            resolve(docs);
        });
    });
}

function updateById(req) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$mongo.engine.updateById(req.params.modelname, req.params.id, req.body).then(function (docs) {
            resolve(docs);
        });
    });
}

function updateByField(req) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$mongo.engine.updateByField(req.params.modelname, req.params.key, req.params.value, req.body).then(function (docs) {
            resolve(docs);
        });
    });
}

function delById(req) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$mongo.engine.delById(req.params.modelname, req.params.id).then(function (docs) {
            resolve(docs);
        });
    });
}

function delByField(req) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$mongo.engine.delByField(req.params.modelname, req.params.key, req.params.value).then(function (err) {
            resolve(err);
        });
    });
}

function count(req) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$mongo.engine.count(req.params.modelname).then(function (count) {
            resolve(count);
        });
    });
}

function countFiltered(req) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$mongo.engine.countFiltered(req.params.modelname, req.params.field, req.params.value).then(function (count) {
            resolve(count);
        });
    });
}

function filteredPagination(req) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$mongo.engine.filteredPagination(req.params.modelname, req.params.field, req.params.value, req.params.itemsPerPage, req.params.currentPage).then(function (docs) {
            resolve(docs);
        });
    });
}

function sortedPagination(req) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$mongo.engine.sortedPagination(req.params.modelname, req.params.itemsPerPage, req.params.currentPage, req.params.sortByField, req.params.sortCriteria).then(function (docs) {
            resolve(docs);
        });
    });
}

function sortAndFilterAndPaginate(req) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$mongo.engine.sortAndFilterAndPaginate(req.params.modelname, req.params.field, req.params.value, req.params.itemsPerPage, req.params.currentPage, req.params.sortByField, req.params.sortCriteria).then(function (docs) {
            resolve(docs);
        });
    });
}