/**
 * Created by prashun on 5/11/16.
 */
'use strict';

import { $mongo } from 'hulk-cut';
import Promise from 'bluebird';
import { engine } from 'rikki';
import { swaggerSpec } from './swagger/mongo.swagger';

$mongo.engine = engine;

export function get_docs(res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
}

export function get_collections() {
    return new Promise((resolve) => {
        resolve(Object.keys($mongo.engine.get_collections()));
    });
}

export function insert(modelname, body){
    return new Promise((resolve) => {
        $mongo.engine.insert(modelname, body).then(
            (docs) => {
             resolve(docs);
           });
       });
}

export function find(modelname,key,value){

    let query = {};
    query[key]=value;

    return new Promise((resolve) => {
        $mongo.engine.find(modelname, JSON.stringify(query)).then( (docs) => {
                resolve(docs);
            });
   });
}

export function show(modelname){
    return new Promise((resolve) => {
        $mongo.engine.show(modelname).then( (docs) => {
            resolve(docs);
        });
    });
}

export function getById(modelname,id){
    return new Promise((resolve) => {
        $mongo.engine.getById(modelname,id).then( (docs) => {
            resolve(docs);
        });
    });
}

export function updateById(modelname,id,body) {
    return new Promise((resolve) => {
        $mongo.engine.updateById(modelname,id,body).then( (docs) => {
            resolve(docs);
        });
    });
}

export function updateByField(modelname,key,value,body) {
    return new Promise((resolve) => {
        $mongo.engine.updateByField(modelname,key,value,body).then( (docs) => {
            resolve(docs);
        });
    });
}

export function delById (modelname,id) {
    return new Promise((resolve) => {
        $mongo.engine.delById(modelname,id).then( (docs) => {
            resolve(docs);
        });
    });
}

export function delByField (modelname,key,value) {
    return new Promise((resolve) => {
        $mongo.engine.delByField(modelname,key,value).then( (err) => {
            resolve(err);
        });
    });
}



