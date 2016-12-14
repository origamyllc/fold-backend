/**
 * Created by prashun on 10/3/16.
 */

const  Joi = require('joi');

/**
 * validates the posted body to publish route
 * @param req
 * @returns {Promise}
 */
export function validate_set_body(req){

    const self = this;

    let schema = Joi.object().required();

    self.schema = schema;

    return new Promise((resolve,reject) => {
        Joi.validate({ request_body:req.body }, self.schema, function (err) {
            if(!err){
                resolve(true);
            }
            else{
                resolve(err);
            }
        });
    });
}
