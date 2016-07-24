'use strict';


import { LRU } from '../../cut/index';
import Promise from 'bluebird';

export function setValueInCache (req) {
    return new Promise((resolve) =>  {
        const key =  req.body.key;
        LRU.set(key, req.body.value);
        const obj = { key : req.body.value };
        resolve(obj);
    });
}

export function updateInCache( req ){
    return new Promise((resolve) =>  {
        const key = req.body.key;
        LRU.update(key, req.body.value);
        const obj = { key: req.body.value };
        resolve(obj);
    });
}

export function deleteFromCache( req ){
    return new Promise( (resolve) => {
        const key = req.body.key;
        LRU.del(key);
        resolve(key);
    });
}

export function clearCache( ){
    return new Promise( (resolve) => {
        LRU.clear();
        resolve(true);
    });
}

export function hasKey( req ){
    return new Promise( (resolve) => {
        const key = req.body.key;
        resolve(LRU.hasKey(key));
    });
}
