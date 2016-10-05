/**
 * Created by prashun on 10/2/16.
 */
const  Joi = require('joi');

/**
 * validates the posted body to publish route
 * @param req
 * @returns {Promise}
 */
export function validate_publish_body(req){
    const self = this;
    let schema = Joi.object().keys({
        queue_name: Joi.string().required(),
        message: Joi.string().required()
    }).with('queue_name', 'message');
    self.schema = schema;
    return new Promise((resolve) => {
        Joi.validate({ queue_name:req.body.queue_name, message:JSON.stringify(req.body.message) }, self.schema, function (err) {
            if(!err){
                resolve(true);
            }
            else{
                resolve(err);
            }
        });
    });
}

/**
 * validates the posted body for subscribe
 * @param req
 * @returns {Promise}
 */

export function validate_subscribe_body(req){
    const self = this;
    let schema = Joi.object().keys({
        queue_name: Joi.string().required(),
        routing_key: Joi.string().required()
    }).with('queue_name', 'routing_key');
    self.schema = schema;
    return new Promise((resolve) => {
        Joi.validate({ queue_name:req.body.queue_name, routing_key:req.body.routing_key }, self.schema, function (err) {
            if(!err){
                resolve(true);
            }
            else{
                resolve(err);
            }
        });
    });
}
<<<<<<< HEAD

export function validate_create_body(req){
    let payload = req.body;
    let validation = Joi.object().keys({
            exchanges: Joi.array().required(),
            queues: Joi.array().required()
        });

    return new Promise((resolve) => {
        Joi.validate(payload, validation, function (err) {
            if(!err){
                validate_exchanges(req)
                    .then(validate_queues)
                    .then(validate_queue_bindings)
                    .then( () => {
                       resolve(true)
                    });
            }
            else{
                resolve(err);
            }
        });
    });
}

function validate_exchanges(req){
    let payload = req.body.exchanges;
    let validation = Joi.array().items(Joi.object().keys({
            name: Joi.string().required(),
            id: Joi.number().required(),
            options: Joi.object().required()
        })
    );

    return new Promise((resolve) => {
        Joi.validate(payload, validation, function (err) {
            if(!err){
                resolve(req);
            }
            else{
                resolve(err);
            }
        });
    });
}

/**
 *
 * @param req
 * @returns {Promise}
 */

function validate_queues(req){
    let payload = req.body.queues;
    let validation = Joi.array().items(Joi.object().keys({
            name: Joi.string().required(),
            id: Joi.number().required(),
            options: Joi.object().required(),
            binding: Joi.object().required()
        })
    );

    return new Promise((resolve,reject) => {
        Joi.validate(payload, validation, function (err) {
            if(!err){
                resolve(req);
            }
            else{
                reject(err);
            }
        });
    });
}


function validate_queue_bindings(req){
    let payload = req.body.queues.bindings;
    let validation = Joi.object().keys({
            exchange: Joi.string().required(),
            key: Joi.string().required()
        }).with('exchange', 'key');

    return new Promise((resolve,reject) => {
        Joi.validate(payload, validation, function (err) {
            if(!err){
                resolve(req);
            }
            else{
                reject(err);
            }
        });
    });

}
