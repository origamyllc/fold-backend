/**
 * Created by prashun on 5/11/16.
 */
'use strict';

import { MONGO } from '../../cut/index';
import Promise from 'bluebird';


export function bulkInsert(req){
    return new Promise((resolve) => {
       MONGO.bulkInsert(req.params.modelname, req.body).then(
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
            MONGO.find(req.params.modelname, JSON.stringify(query)).then( (docs) => {
                resolve(docs);
            });
   });
}

export function show(req){
    return new Promise((resolve) => {
        MONGO.show(req.params.modelname).then( (docs) => {
            resolve(docs);
        });
    });
}

export function getById(req){
    return new Promise((resolve) => {
        MONGO.getById(req.params.modelname,req.params.id).then( (docs) => {
            resolve(docs);
        });
    });
}

export function updateById(req) {
    return new Promise((resolve) => {
        MONGO.updateById(req.params.modelname,req.params.id,req.body).then( (docs) => {
            resolve(docs);
        });
    });
}

export function updateByField(req) {
    return new Promise((resolve) => {
        MONGO.updateByField(req.params.modelname,req.params.key,req.params.value,req.body).then( (docs) => {
            resolve(docs);
        });
    });
}

export function delById (req) {
    return new Promise((resolve) => {
        MONGO.delById(req.params.modelname,req.params.id).then( (docs) => {
            resolve(docs);
        });
    });
}

export function delByField (req) {
    return new Promise((resolve) => {
        MONGO.delByField (req.params.modelname,req.params.key,req.params.value).then( (err) => {
            resolve(err);
        });
    });
}

export function count (req) {
    return new Promise((resolve) => {
        MONGO.count (req.params.modelname).then( (count) => {
            resolve(count);
        });
    });
}

export function countFiltered(req){
    return new Promise((resolve) => {
        MONGO.countFiltered(req.params.modelname,req.params.field,req.params.value).then( (count) => {
            resolve(count);
        });
    });
}

export function filteredPagination(req){
    return new Promise((resolve) => {
        MONGO.filteredPagination(req.params.modelname,req.params.field,req.params.value,
            req.params.itemsPerPage,req.params.currentPage).then( (docs) => {
            resolve(docs);
        });
    });
}

export function sortedPagination(req){
    return new Promise((resolve) => {
        MONGO.sortedPagination(req.params.modelname,req.params.itemsPerPage,
            req.params.currentPage,req.params.sortByField,
            req.params.sortCriteria).then( (docs) => {
                resolve(docs);
            });
    });
}

export function sortAndFilterAndPaginate(req){
    return new Promise((resolve) => {
       MONGO.sortAndFilterAndPaginate(req.params.modelname,req.params.field,req.params.value,
            req.params.itemsPerPage,req.params.currentPage,req.params.sortByField,
            req.params.sortCriteria).then( (docs) => {
                resolve(docs);
            });
    });
}



