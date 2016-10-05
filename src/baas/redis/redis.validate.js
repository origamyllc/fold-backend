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

    let schema = Joi.object().keys({
        key: Joi.string().required(),
        value: Joi.string().required()
    }).with('key', 'value');

    self.schema = schema;

    return new Promise((resolve,reject) => {
        Joi.validate({ key:req.body.key, value:JSON.stringify(req.body.value) }, self.schema, function (err) {
            if(!err){
                resolve(true);
            }
            else{
                resolve(err);
            }
        });
    });
}

export function validate_get_params(req){

    const self = this;

    let schema = Joi.string().required();

    self.schema = schema;

    return new Promise((resolve) => {
        Joi.validate(req.params.key, self.schema, function (err) {
            if(!err){
                resolve(true);
            }
            else{
                resolve(err);
            }
        });
    });
}

export function validate_del_params(req){

    const self = this;

    let schema = Joi.string().required();

    self.schema = schema;

    return new Promise((resolve) => {
        Joi.validate(req.params.key, self.schema, function (err) {
            if(!err){
                resolve(true);
            }
            else{
                resolve(err);
            }
        });
    });
}
