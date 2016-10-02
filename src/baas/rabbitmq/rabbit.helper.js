/**
 * Created by prashun on 5/11/16.
 */
'use strict';

import { $pubsub } from 'hulk-cut';
import Promise from 'bluebird';

/**
 * create an exchange
 * @param name
 * @param options
 * @returns {Promise}
 * @example $pubsub.rabbit.createExchange("jibreel.exchange.electric",{"type": "topic"});
 */
export function createExchange(name, options) {
   return  new Promise((resolve) => {
        $pubsub.rabbit.createExchange(name, options).then((exchanges) => {
            resolve(exchanges)
        });
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
export function createQueue(queue_name, exchange_name, routing_key) {
    return  new Promise((resolve) => {
        $pubsub.rabbit.registerQueue(queue_name, exchange_name, routing_key).then((queues) => {
            resolve(queues);
        });
    });
}

/**
 * bind queue to an exchange
 * @returns {Promise}
 *
 */
export function bind(_exchanges,_queues){
    return  new Promise((resolve) => {
        $pubsub.rabbit.init(_exchanges,_queues);
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
export function publish(queue_name, body){
    return  new Promise((resolve) => {
        $pubsub.rabbit.publish(queue_name,body).then((body) =>{
            resolve(body)
        });
    });
}

/**
 * @param queue_name
 * @param routing_key
 * @returns {Promise}
 * @example $pubsub.rabbit.subscribe("jibreel.queue.tesla","tesla");
 */
export function subscribe(queue_name,routing_key){
    return  new Promise((resolve) => {
        $pubsub.rabbit.subscribe(queue_name,routing_key)
            .then( (message) => {
               resolve(message);
            });
    });
}