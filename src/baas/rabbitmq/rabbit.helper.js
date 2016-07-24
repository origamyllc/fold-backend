/**
 * Created by prashun on 5/11/16.
 */
'use strict';

import { RABBIT } from '../../cut/index';
import Promise from 'bluebird';

export function createExchange(name,options){
    return new Promise ( (resolve) => {
        RABBIT.createExchange(name,options)
            .then( (exchangeName ) => {
               resolve(exchangeName);
            });
        });
}

export function publishToExchange(routingKey, message){
    return new Promise ( (resolve) => {
        RABBIT.publishToExchange(routingKey, message)
            .then( ( obj ) => {
                 resolve( obj );
            });
         });
}

export function  createQueue(name){
    return new Promise ( (resolve) => {
        RABBIT.createQueue(name)
            .then( ( isCreated ) => {
            resolve( isCreated  );
         });
       });
}

export function bindToExchange(exchange, routingKey){
    return new Promise ( (resolve) => {
        RABBIT.bindToExchange(exchange, routingKey)
            .then( ( isBound ) => {
               resolve( isBound  );
             });
           });
}

export function subscribeToQueue(name){
    return new Promise ( (resolve) => {
        RABBIT.subscribeToQueue(name)
            .then( ( message ) => {
            resolve( message );
         });
       });
}