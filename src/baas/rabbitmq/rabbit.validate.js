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
                resolve(false);
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
                resolve(false);
            }
        });
    });
}