/**
 * Created by prashun on 5/11/16.
 */
import { $cache } from 'hulk-cut';
import Promise from 'bluebird';

export function get(key){
    return new Promise ( (resolve) => {
        $cache.redis.get(key).then( (reply) =>  {
            resolve(reply);
        });
    });
}

export function setKeyValue(key,value){
    return new Promise ( (resolve) => {
        $cache.redis.set(key,value).then( (reply) => {
            resolve(reply);
            return null;
        });
    }) ;
}


export function setMulti(key,value){
    return new Promise ( (resolve) => {
        $cache.redis.setMulti(key,value).then( (reply) => {
            resolve(true);
        });
    });
}

export function getMulti(keys){
    return new Promise ( (resolve) => {
        $cache.redis.getMulti(keys).then( (reply) => {
            resolve(reply);
        });
    });
}

export function del(key){
    return new Promise ( (resolve) => {
        $cache.redis.delete(key).then( (reply) => {
            resolve(reply);
        });
    });
}

export function clear() {
    return new Promise((resolve) => {
        $cache.redis.clear().then((cleared) => {
            resolve(true);
        });
    });
}

export function size() {
    return new Promise((resolve) => {
        $cache.redis.size().then((size) => {
            resolve(size);
        });
    });
}

