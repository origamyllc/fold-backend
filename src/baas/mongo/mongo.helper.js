/**
 * Created by prashun on 5/11/16.
 */
'use strict';

import { $mongo } from 'hulk-cut';
import Promise from 'bluebird';
import { engine } from 'rikki';
import { swaggerSpec } from './swagger/mongo.swagger'

$mongo.engine = engine;

export function get_docs(res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
}

export function get_collections() {
    return new Promise((resolve) => {
        resolve(Object.keys($mongo.engine.get_collections()))
    });
}

export function insert(req){
    return new Promise((resolve) => {
        $mongo.engine.insert(req.params.modelname, req.body).then(
            (docs) => {
             resolve(docs);
           });
       });
}

export function find(req){
    let  key = req.params.field;
    let value = req.params.value;

    let query = {};
    query[key]=value;

    return new Promise((resolve) => {
        $mongo.engine.find(req.params.modelname, JSON.stringify(query)).then( (docs) => {
                resolve(docs);
            });
   });
}

export function show(req){
    return new Promise((resolve) => {
        $mongo.engine.show(req.params.modelname).then( (docs) => {
            resolve(docs);
        });
    });
}

export function getById(req){
    return new Promise((resolve) => {
        $mongo.engine.getById(req.params.modelname,req.params.id).then( (docs) => {
            resolve(docs);
        });
    });
}

export function updateById(req) {
    return new Promise((resolve) => {
        $mongo.engine.updateById(req.params.modelname,req.params.id,req.body).then( (docs) => {
            resolve(docs);
        });
    });
}

export function updateByField(req) {
    return new Promise((resolve) => {
        $mongo.engine.updateByField(req.params.modelname,req.params.key,req.params.value,req.body).then( (docs) => {
            resolve(docs);
        });
    });
}

export function delById (req) {
    return new Promise((resolve) => {
        $mongo.engine.delById(req.params.modelname,req.params.id).then( (docs) => {
            resolve(docs);
        });
    });
}

export function delByField (req) {
    return new Promise((resolve) => {
        $mongo.engine.delByField(req.params.modelname,req.params.key,req.params.value).then( (err) => {
            resolve(err);
        });
    });
}

export function count (req) {
    return new Promise((resolve) => {
        $mongo.engine.count(req.params.modelname).then( (count) => {
            resolve(count);
        });
    });
}

export function countFiltered(req){
    return new Promise((resolve) => {
        $mongo.engine.countFiltered(req.params.modelname,req.params.field,req.params.value).then( (count) => {
            resolve(count);
        });
    });
}

export function filteredPagination(req){
    return new Promise((resolve) => {
        $mongo.engine.filteredPagination(req.params.modelname,req.params.field,req.params.value,
            req.params.itemsPerPage,req.params.currentPage).then( (docs) => {
            resolve(docs);
        });
    });
}

export function sortedPagination(req){
    return new Promise((resolve) => {
        $mongo.engine.sortedPagination(req.params.modelname,req.params.itemsPerPage,
            req.params.currentPage,req.params.sortByField,
            req.params.sortCriteria).then( (docs) => {
                resolve(docs);
            });
    });
}

export function sortAndFilterAndPaginate(req){
    return new Promise((resolve) => {
        $mongo.engine.sortAndFilterAndPaginate(req.params.modelname,req.params.field,req.params.value,
            req.params.itemsPerPage,req.params.currentPage,req.params.sortByField,
            req.params.sortCriteria).then( (docs) => {
                resolve(docs);
            });
    });
}



