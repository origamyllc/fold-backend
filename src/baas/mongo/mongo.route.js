/**
 * Created by prashun on 5/11/16.
 */
'use strict';

import { $router } from 'hulk-cut';
import  * as  mongo_controller from './mongo.controller';
export const mongo_router = $router;
const FOLD_MONGO_URL = '/api/v1/mongo';


//GET
mongo_router.get( FOLD_MONGO_URL + '/collections', mongo_controller.get_collections);
mongo_router.get( FOLD_MONGO_URL + '/docs', mongo_controller.get_docs);

mongo_router.get( FOLD_MONGO_URL + '/:modelname', mongo_controller.show);
mongo_router.get( FOLD_MONGO_URL + '/:modelname/:id', mongo_controller.get_by_id);
mongo_router.get( FOLD_MONGO_URL + '/get/count/:modelname', mongo_controller.get_count);
mongo_router.get( FOLD_MONGO_URL + '/get/count/:modelname/:field/:value', mongo_controller.get_filtered_count);
mongo_router.get( FOLD_MONGO_URL + '/:modelname/:field/:value', mongo_controller.find);


// POST
mongo_router.post( FOLD_MONGO_URL + '/:modelname', mongo_controller.insert);

// PUT
mongo_router.put( FOLD_MONGO_URL  + '/:modelname/:id', mongo_controller.update_by_id);
mongo_router.put( FOLD_MONGO_URL  + '/:modelname/:key/:value', mongo_controller.update_by_field);

//DELETE
mongo_router.delete( FOLD_MONGO_URL + '/:modelname/:id', mongo_controller.delete_by_id);
mongo_router.delete( FOLD_MONGO_URL + '/:modelname/:key/:value', mongo_controller.delete_by_field);

