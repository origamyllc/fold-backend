/**
 * Created by prashun on 5/11/16.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;
exports.publish = publish;
exports.subscribe = subscribe;

var _hulkCut = require('hulk-cut');

var _rabbit = require('./rabbit.helper');

var RabbitHelper = _interopRequireWildcard(_rabbit);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _ = require('lodash');

var RabbitError = {
    type: "Infrastructure Service Error",
    details: {
        api: "Rabbit",
        root: "/commons/v1/infrastructure/rabbit"
    }
};

function extendError(obj) {
    var err = _.extend(RabbitError, obj);
    return err;
}

/**
 *
 * @param req
 * @param res
 * @example
 * ----------------------------------------
 {
   "exchanges":[{
      "id":1,
      "name":"jibreel.exchange.electric",
      "options":{"type": "topic"}
   }],
   "queues":[{
     "id":2,
     "name":"jibreel.queue.tesla",
     "options":{},
     "binding": {
       "exchange": "jibreel.exchange.electric",
       "key": "tesla"
     }
    },
     {
       "id":3,
       "name":"jibreel.queue.prius",
       "options":{},
       "binding": {
         "exchange": "jibreel.exchange.electric",
         "key": "prius"
       }
     }
   ]
 }
 * ---------------------------------------------
 */

function init(req, res) {
    //TODO:validate incoming data
    Object.keys(req.body).forEach(function (key) {
        createExchange(req, res).then(createQueues).then(bind).catch(function (err) {
            req.log.error(err);
            var error = extendError({
                message: "middleware creation failed",
                errorCode: 2406
            });
            req.log.error(error);
            _hulkCut.$res.send_not_found_error(res, error);
        });
    });

    _hulkCut.$res.send_success_response(res, {
        response: {
            message: "successfully processed middleware"
        }
    });
}

/**
 *
 * @param req
 * @param res
 * @example :
 * ----------------------------------------
   {
     "queue_name":"jibreel.queue.tesla",
      "message":{"ding":"dong!"}
   }
 * ----------------------------------------
 */

function publish(req, res) {
    RabbitHelper.publish(req.body.queue_name, req.body.message).then(function () {
        _hulkCut.$res.send_success_response(res, {
            response: {
                message: 'successfully published ' + req.body.message + ' '
            }
        });
    }).catch(function (err) {
        req.log.error(err);
        var error = extendError({
            message: 'failed to publish ' + req.body.message + ' ',
            errorCode: 2406
        });
        req.log.error(error);
        _hulkCut.$res.send_internal_server_error(res, error);
    });
}

/**
 *
 * @param req
 * @param res
 * @example :
 * ----------------------------------------
 {
      "routing_key":"tesla",
      "queue_name":"jibreel.queue.tesla"
  }
 */

function subscribe(req, res) {
    RabbitHelper.subscribe(req.body.queue_name, req.body.routing_key).then(function (message) {
        _hulkCut.$res.send_success_response(res, {
            response: {
                message: message
            }
        });
    });
}

function createExchange(req) {
    return new Promise(function (resolve, reject) {
        req.body.exchanges.forEach(function (exchange) {
            req.log.debug('creating  exchange ' + exchange.name + ' created ');
            RabbitHelper.createExchange(exchange.name, exchange.options).then(function (name) {
                req.log.info(' exchange ' + name + ' created ');
                resolve(req);
            }).catch(function (err) {
                req.log.error(err);
                reject(err);
            });
        });
    });
}

function createQueues(req) {
    return new Promise(function (resolve, reject) {
        req.body.queues.forEach(function (queue) {
            req.log.debug(' queue ' + queue.name + ' ready to be provisioned ');
            // TODO: check whether the exchange to be bound to exists
            RabbitHelper.createQueue(queue.name, queue.binding.exchange, queue.binding.key).then(function () {
                req.log.info(' queue ' + queue.name + ' provisioned ');
                resolve(req);
            }).catch(function (err) {
                req.log.error(err);
                reject(err);
            });
        });
    });
}

function bind(req) {
    return new Promise(function (resolve) {
        RabbitHelper.bind().then(function () {
            resolve(true);
        }).catch(function (err) {
            req.log.error(' failed to bind queues ' + err + ' ');
        });
    });
}