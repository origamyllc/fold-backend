/**
 * Created by prashun on 5/11/16.
 */
'use strict';

import { cranberryRouter } from '../../cut/index';
import  * as  mongo_controller from './mongo.controller';

export const mongo_router = cranberryRouter;

//GET
mongo_router.get('/api/v1/infrastructure/mongo/:modelname', mongo_controller.show);
mongo_router.get('/api/v1/infrastructure/mongo/:modelname/:id', mongo_controller.get_by_id);
mongo_router.get('/api/v1/infrastructure/mongo/count/:modelname', mongo_controller.get_count);
mongo_router.get('/api/v1/infrastructure/mongo/count/:modelname/:field/:value', mongo_controller.get_filtered_count);
mongo_router.get('/api/v1/infrastructure/mongo/:modelname/:field/:value', mongo_controller.find);
mongoRouter.get('/api/v1/infrastructure/mongo/filter/:modelname/:field/:value/:itemsPerPage/:currentPage', mongo_controller.filtered_pagination);
mongo_router.get('/api/v1/infrastructure/mongo/sort/:modelname/:itemsPerPage/:currentPage/:sortByField/:sortCriteria', mongo_controller.sorted_pagination);

// POST
mongo_router.post('/api/v1/infrastructure/mongo/:modelname', mongo_controller.bulk_insert);

// PUT
mongo_router.put('/api/v1/infrastructure/mongo/:modelname/:id', mongo_controller.update_by_id);
mongo_router.put('/api/v1/infrastructure/mongo/:modelname/:key/:value', mongo_controller.update_by_field);

//DELETE
mongo_router.delete('/api/v1/infrastructure/mongo/:modelname/:id', mongo_controller.delete_by_id);
mongo_router.delete('/api/v1/infrastructure/mongo/:modelname/:key/:value', mongo_controller.delete_by_field);

