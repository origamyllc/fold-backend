'use strict';

import { LRU , responses }  from '../../cut/index';

import * as LRUHelper from './lru.helper';
const _ = require('lodash');

let LRUError = {
     type:"Infrastructure Service Error",
     details:{
          api : "LRU CACHE",
          root: "/commons/v1/infrastructure/cache"
     }
}

function extendError(obj) {
    let err = _.extend(LRUError , obj)
    return err;
}

export function read (req, res) {
  req.log.debug("Getting value for key " + req.params.key + " from cache");

  const key =req.params.key;

  LRU.get(req.params.key , (value) => {
      if(value){
        req.log.info("Got value"+ value + " for key " + req.params.key + " from cache");
        responses.sendSuccessResponse( res , { response:{ key : value } })
      } else {
        let error = extendError({ message: "Cache miss: value for key " + key + " not found" , errorCode:1100 });
        req.log.error(error);
        responses.sendErrorResponse(res,error);
      }
  });
}

export function create(req, res){
  req.log.debug("Setting value " + req.body.value + " for key " + req.body.key + "from cache");
  LRUHelper.setValueInCache(req).then((obj) => {
      req.log.info("Set value " + req.body.value + " for key " + req.body.key + "from cache");
      responses.sendSuccessResponse( res , { message: "Set value " + req.body.value + " for key " + req.body.key + "from cache"  });
  })
 .catch((err) => {
    let error = extendError({ message: " key " + req.body.key + " can not be inserted into LRU cache" , errorCode:1101 });
    req.log.error(error);
    responses.sendErrorResponse(res,error);
 });
}

export function update(req, res){
    req.log.debug("Updating value " + req.body.value + " for key " + req.body.key + "from cache");
    LRUHelper.updateInCache(req).then((obj) => {
        req.log.info("Updated value " + req.body.value + " for key " + req.body.key + "from cache");
        responses.sendSuccessResponse( res , { message: "Set value " + req.body.value + " for key " + req.body.key + "from cache" });
    })
    .catch((err) => {
        let error = extendError({ message: " key " + req.body.key + " can not be inserted into LRU cache" , errorCode:1102 });
        req.log.error(error);
        responses.sendErrorResponse(res,error);
    });
}

export function del(req, res){
    req.log.debug("Deleting value for key " + req.params.key + " from cache");
    LRUHelper.deleteFromCache(req).then((obj) => {
        req.log.info("Deleted value for key " + req.params.key + " from cache");
        responses.sendSuccessResponse( res , { message: "Deleted value for key " + req.params.key + " from cache" });
    })
    .catch((err) => {
        let error = extendError({ message: " key " + req.body.key + " can not be deleted from LRU cache" , errorCode:1103 });
        req.log.error(error);
        responses.sendErrorResponse(res,error);
   });
}

export function clear(req, res){
    req.log.debug("clearing LRU Cache");
    LRUHelper.clearCache().then((isCleared ) => {
        req.log.info("LRU Cache was sucessfully cleared");
        responses.sendSuccessResponse( res , { message: "LRU Cache was sucessfully cleared" });
    })
    .catch((err) => {
        let error = extendError({ message: "LRU Cache was not sucessfully cleared" , errorCode:1104 });
        req.log.error(error);
        responses.sendErrorResponse(res,error);
    });
}

export function hasKey(req, res){
    const key =req.params.key;
    let isKey = false;
    req.log.debug("Cheking if the cache has key " + req.params.key);
    LRUHelper.hasKey(req).then(( hasKey ) => {
        req.log.info("LRU Cache was sucessfully cleared");
        isKey = hasKey;
        responses.sendSuccessResponse( res , { key : isKey });
    });
}