/**
 * Created by prashun on 5/11/16.
 */
'use strict';

import { cranberryRouter } from '../../cut/index';
import  * as  mongoController from './mongo.controller';

export const mongoRouter = cranberryRouter;

//GET
mongoRouter.get('/api/v1/infrastructure/mongo/:modelname', mongoController.show);
mongoRouter.get('/api/v1/infrastructure/mongo/:modelname/:id', mongoController.getById);
mongoRouter.get('/api/v1/infrastructure/mongo/count/:modelname', mongoController.getCount);
mongoRouter.get('/api/v1/infrastructure/mongo/count/:modelname/:field/:value', mongoController.getFilteredCount);
mongoRouter.get('/api/v1/infrastructure/mongo/:modelname/:field/:value', mongoController.find);
mongoRouter.get('/api/v1/infrastructure/mongo/filter/:modelname/:field/:value/:itemsPerPage/:currentPage', mongoController.filteredPagination);
mongoRouter.get('/api/v1/infrastructure/mongo/sort/:modelname/:itemsPerPage/:currentPage/:sortByField/:sortCriteria', mongoController.sortedPagination);


// POST
mongoRouter.post('/api/v1/infrastructure/mongo/:modelname', mongoController.bulkInsert);

// PUT
mongoRouter.put('/api/v1/infrastructure/mongo/:modelname/:id', mongoController.updateById);
mongoRouter.put('/api/v1/infrastructure/mongo/:modelname/:key/:value', mongoController.updateByField);

//DELETE
mongoRouter.delete('/api/v1/infrastructure/mongo/:modelname/:id', mongoController.delById);
mongoRouter.delete('/api/v1/infrastructure/mongo/:modelname/:key/:value', mongoController.delByField);

