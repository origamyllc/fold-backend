/**
 * Created by prashun on 5/11/16.
 */
'use strict';

import { responses } from '../../cut/index';
import * as RabbitHelper from './rabbit.helper';

const _ = require('lodash');

let RabbitError = {
    type: "Infrastructure Service Error",
    details: {
        api: "Rabbit",
        root: "/commons/v1/infrastructure/rabbit"
    }
}

function extendError(obj) {
    let err = _.extend(RabbitError, obj)
    return err;
}


export function createExchange(req, res) {
    req.log.debug("creating exchange with name" + req.params.exchangename);
    RabbitHelper.createExchange(req.params.exchangename, req.body.options).then(
        (exchangeName) => {
            if (exchangeName) {
                req.log.info("creating exchange with name" + exchangeName);
                responses.sendSuccessResponse(res, {response: {exchange: exchangeName, message: "exchange created"}})
            } else {
                let error = extendError({message: "Exchange " + exchangeName + " not created", errorCode: 4400});
                req.log.error(error);
                responses.sendErrorResponse(res, error);
            }
        }
    )
}

export function publishToExchange(req, res) {
    req.log.debug("publishing to  exchange with routing key " + req.params.routingkey);
    RabbitHelper.publishToExchange(req.params.routingkey, req.body.message).then(
        (result) => {
            if (result) {
                req.log.info("published to  exchange with routing key " + req.params.routingkey);
                responses.sendSuccessResponse(res, {response: result})
            }
            else {
                let error = extendError({
                    message: "can not publish to  exchange with routing key " + req.params.routingkey,
                    errorCode: 4401
                });
                req.log.error(error);
                responses.sendErrorResponse(res, error);
            }
        })
}

export function createQueue(req, res) {
    req.log.info("creating queue with name" + req.params.queuename);
    RabbitHelper.createQueue(req.params.queuename).then(
        (isCreated) => {
            if (isCreated) {
                req.log.info("created queue with name" + req.params.queuename);
                responses.sendSuccessResponse(res, {response: {queue: req.params.queuename, isCreated: isCreated}})
            }
            else {
                let error = extendError({
                    message: "can not create queue with name" + req.params.queuename,
                    errorCode: 4401
                });
                req.log.error(error);
                responses.sendErrorResponse(res, error);
            }
        });
}

export function bindToExchange(req, res) {
    req.log.info("binding to exchange with name" + req.params.exchangename);
    RabbitHelper.bindToExchange(req.params.exchangename, req.params.routingkey).then(
        (isBound) => {
            if (isBound) {
                req.log.info("bound to exchange with name" + req.params.exchangename);
                responses.sendSuccessResponse(res, {response: {queue: req.params.queuename, isCreated: isCreated}})
            }
            else {
                let error = extendError({
                    message: "can not bound to exchange with name" + req.params.exchangename,
                    errorCode: 4402
                });
                req.log.error(error);
                responses.sendErrorResponse(res, error);
            }
        }
    );
}

export function subscribeToQueue(req, res) {
    req.log.info("subscribing to queue with name" + req.params.queuename);
    RabbitHelper.subscribeToQueue(req.params.queuename).then((message) => {
        if (message) {
            req.log.info("subscribed to queue with name" + req.params.queuename);
            responses.sendSuccessResponse(res, {response: {queue: req.params.queuename, isCreated: isCreated}})
        }
        else {
            let error = extendError({
                message: "can not subscribe to queue with name" + req.params.queuename,
                errorCode: 4403
            });
            req.log.error(error);
            responses.sendErrorResponse(res, error);
        }
    });
}

