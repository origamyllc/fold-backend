/**
 * Created by prashun on 5/11/16.
 */
import  { REDIS }  from '../../cut/index';
import Promise from 'bluebird';

export function get(key){
    return new Promise ( (resolve) => {
        REDIS.get(key).then( (reply) =>  {
            resolve(reply);
        });
    });
}

export function setKeyValue(key,value){
    return new Promise ( (resolve) => {
        REDIS.set(key,value).then( (reply) => {
           resolve(reply);
            return null;
        });
    }) ;
}

export function hset(string){
    return new Promise ( (resolve) => {
        REDIS.hset(string).then( (reply) => {
          resolve(reply);
        });
    });
}

export function hget(key){
    return new Promise ( (resolve) => {
       REDIS.hget(key).then( (reply) => {
           resolve(reply);
        });
    });
}

export function del(key){
    return new Promise ( (resolve) => {
      REDIS.del(key).then( (reply) => {
        resolve(reply);
      });
    });
}
export function clear(){
    return new Promise ( (resolve) => {
      REDIS.clear().then( (reply) => {
          resolve(reply);
        });
    }) ;
}
export function size(){
    return new Promise ( (resolve) => {
        REDIS.size().then( (reply) => {
          resolve(reply);
        });
    });
}
export function mget(array){
    return new Promise ( (resolve) => {
       REDIS.mget(array).then( (reply) => {
        resolve(reply);
     });
   });
}

export function publish(channel,message){
    return new Promise ( (resolve) => {
       REDIS.publish(channel,message).then( (reply) => {
        resolve(reply);
    });
  });
}

export function subscribe(){
    return new Promise ((resolve) => {
       REDIS.subscribe().then( (reply) => {
        resolve(reply);
    });
}) ;

}
