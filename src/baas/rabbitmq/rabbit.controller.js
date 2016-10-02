/**
 * Created by prashun on 5/11/16.
 */
'use strict';

import { $res } from 'hulk-cut';
import * as RabbitHelper from './rabbit.helper';

const _ = require('lodash');

let RabbitError = {
    type: "Infrastructure Service Error",
    details: {
        api: "Rabbit",
        root: "/commons/v1/infrastructure/rabbit"
    }
}

function extendError(obj) {
    let err = _.extend(RabbitError, obj)
    return err;
}

let _exchanges = null;
let _queues = null;
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

export function init(req, res) {
      //TODO:validate incoming data
        Object.keys(req.body).forEach(() => {
            createExchange(req,res)
                .then(createQueues)
                .then(bind)
                .catch((err) => {
                    req.log.error(err);
                    let error = extendError({
                        message:"middleware creation failed" ,
                        errorCode: 2406
                    });
                    req.log.error(error);
                    $res.send_not_found_error(res, error);
                })
        });

        $res.send_success_response(res, {
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

export function publish(req,res){
    RabbitHelper.publish(req.body.queue_name ,req.body.message).then(() =>{
        $res.send_success_response(res, {
            response: {
                message: 'successfully published ' + JSON.stringify(req.body.message) + ' '
            }
        });
    }).catch((err) => {
        req.log.error(err);
        let error = extendError({
            message: 'failed to publish ' + JSON.stringify(req.body.message) + ' ',
            errorCode: 2406
        });
        req.log.error(error);
        $res.send_internal_server_error(res, error);
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
 * ----------------------------------------
 */

export function subscribe(req,res){
    RabbitHelper.subscribe(req.body.queue_name,req.body.routing_key)
        .then((message) => {
            $res.send_success_response(res, {
                response: {
                    message:message
                }
            });
        });
}

function createExchange(req){
    return new Promise((resolve,reject) => {
        req.body.exchanges.forEach((exchange) => {
            req.log.debug( `creating  exchange ${exchange.name} created `)
            RabbitHelper.createExchange(exchange.name,exchange.options)
                .then((exchanges) => {
                    req.log.info( ` exchanges created `);
                     _exchanges = exchanges;
                    resolve(req);
                }).catch((err) => {
                    req.log.error( err );
                    reject(err);
                });
        });
    });
}

function createQueues(req){
    return new Promise((resolve,reject) => {
    req.body.queues.forEach((queue) => {
        req.log.debug( ` queue ${queue.name} ready to be provisioned `);
        // TODO: check whether the exchange to be bound to exists
            RabbitHelper.createQueue(queue.name,queue.binding.exchange,queue.binding.key).then((queues) =>{
                req.log.info( ` queues provisioned `);
                _queues = queues;
                resolve(req);
            }).catch((err) => {
                req.log.error( err );
                reject(err);
            });
        });
    });
}

function bind(req){
    return new Promise((resolve) => {
        RabbitHelper.bind(_exchanges,_queues).then(() => {
              resolve(true);
         }).catch((err) => {
              req.log.error( ` failed to bind queues ${err} `);
        });
    });
}