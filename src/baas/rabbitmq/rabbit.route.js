/**
 * Created by prashun on 5/11/16.
 */
/**
 * Created by prashun on 5/11/16.
 */
'use strict';

import { cranberryRouter } from '../../cut/index';
import  * as  rabbitController from './rabbit.controller'

export const rabbitRouter = cranberryRouter;

rabbitRouter.post('/api/v1/infrastructure/rabbit/exchange/:exchangename',rabbitController.createExchange );
rabbitRouter.post('/api/v1/infrastructure/rabbit/exchange/:routingkey',rabbitController.publishToExchange );
rabbitRouter.get('/api/v1/infrastructure/rabbit/queue/:queuename', rabbitController.createQueue );
rabbitRouter.get('/api/v1/infrastructure/rabbit/queue/:exchagename/:routingkey', rabbitController.bindToExchange );
rabbitRouter.get('/api/v1/infrastructure/rabbit/queue/:queuename',rabbitController.subscribeToQueue);