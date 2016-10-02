/**
 * Created by prashun on 5/11/16.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createExchange = createExchange;
exports.createQueue = createQueue;
exports.bind = bind;
exports.publish = publish;
exports.subscribe = subscribe;

var _hulkCut = require('hulk-cut');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * create an exchange
 * @param name
 * @param options
 * @returns {Promise}
 * @example $pubsub.rabbit.createExchange("jibreel.exchange.electric",{"type": "topic"});
 */
function createExchange(name, options) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$pubsub.rabbit.createExchange(name, options);
        resolve(name);
    });
}

/**
 * create a queue
 * @param queue_name
 * @param exchange_name
 * @param routing_key
 * @returns {Promise}
 * @example  $pubsub.rabbit.registerQueue("jibreel.queue.tesla","jibreel.exchange.electric","tesla");
 */
function createQueue(queue_name, exchange_name, routing_key) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$pubsub.rabbit.registerQueue(queue_name, exchange_name, routing_key);
        resolve(queue_name);
    });
}

/**
 * bind queue to an exchange
 * @returns {Promise}
 *
 */
function bind() {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$pubsub.rabbit.init();
        resolve(true);
    });
}

/**
 * publish to queue
 * @param routing_key
 * @param body
 * @returns {Promise}
 * @example $pubsub.rabbit.publish("tesla",{"ping":"yo"});
 */
function publish(queue_name, body) {
    return new _bluebird2.default(function () {
        _hulkCut.$pubsub.rabbit.publish(queue_name, body);
    });
}

/**
 * @param queue_name
 * @param routing_key
 * @returns {Promise}
 * @example $pubsub.rabbit.subscribe("jibreel.queue.tesla","tesla");
 */
function subscribe(queue_name, routing_key) {
    return new _bluebird2.default(function (resolve) {
        _hulkCut.$pubsub.rabbit.subscribe(queue_name, routing_key).then(function (message) {
            resolve(message);
        });
    });
}