/**
 * Created by prashun on 5/11/16.
 */
/**
 * Created by prashun on 5/11/16.
 */
'use strict';

import { $router } from 'hulk-cut';
import  * as  rabbitController from './rabbit.controller';

export const rabbitRouter = $router;
const FOLD_RABBITMQ_URL = '/api/v1/rabbit';

rabbitRouter.post( FOLD_RABBITMQ_URL + '/create',rabbitController.init );
rabbitRouter.post( FOLD_RABBITMQ_URL + '/publish',rabbitController.publish );
rabbitRouter.post(  FOLD_RABBITMQ_URL + '/subscribe',rabbitController.subscribe );
