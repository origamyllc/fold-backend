/**
 * Created by prashun on 5/11/16.
 */

'use strict';

import { $res } from 'hulk-cut';
import * as MongoHelper from './mongo.helper';
import * as Errors from './mongo.errors';


export function get_docs(req,res){
    MongoHelper.get_docs(res);
}

/**
 * get the collections
 * @param req
 * @param res
 */
export function get_collections(req, res) {
    MongoHelper.get_collections()
        .then((collections) => {
            if (collections && collections.length !== 0) {
                $res.send_success_response(res, {
                    response: {
                        docs: collections,
                        message: "sucessfully got collections"
                    }
                });
            } else {
                $res.send_internal_server_error(res,Errors.failed_to_get_collections);
            }
        });
}


/**
 * const Douche = mongoose.model('Douche', DoucheSchema);
 *
 *  const doucheBag = [a humongous amount of douches ];
 *
 *  Douche.collection.insert(doucheBag, onInsert);
 *
 *   function onInsert(err, docs) {
 *       if (err) {
 *          console.log(error)
 *       } else {
 *         console.info('%d doucheBag successfully stored.', docs.length);
 *       }
 *   }
 *
 * @param modelName
 * @param documentArray
 */

export function insert(req, res) {
    req.log.debug("inserting data " + JSON.stringify(req.body) + "into collection " + req.params.modelname);
    MongoHelper.insert(req).then((docs) => {
        if (docs && !docs.errors ) {
            req.log.info("sucessfully inserted data " + JSON.stringify(req.body) + "into collection " + req.params.modelname);
            $res.send_success_response(res, {
                response: {
                    docs: req.body,
                    message: "sucessfully inserted data into collection" + req.params.modelname
                }
            })
        } else {
            req.log.error(Errors.failed_to_insert);
            $res.send_internal_server_error(res, Errors.failed_to_insert);
        }
    });
}

/**
 * get results by param with given value
 * @param req
 * @param res
 */

export function find(req, res) {
    req.log.debug("finding data in collection " + req.params.modelname + " by field "
    + req.params.field + " with value " + req.params.value);
    MongoHelper.find(req).then(
        (docs) => {
            if (docs  && docs.length > 0 ) {
                req.log.info("found data in collection " + req.params.modelname + " by field "
                + req.params.field + " with value " + req.params.value + " results: " );
                $res.send_success_response(res, {
                    response: {
                        docs: docs,
                        message: "found data in collection " + req.params.modelname + " by field "
                        + req.params.field + " with value " + req.params.value
                    }
                });
            } else {
                req.log.error(Errors.document_not_found);
                $res.send_not_found_error(res, Errors.document_not_found);
            }
        });
}

/**
 * get all results for the given model
 * @param req
 * @param res
 */

export function show(req, res) {
    req.log.debug("found data for collection " + req.params.modelname);
    MongoHelper.show(req)
        .then(
        (docs) => {
            if (docs && docs.length > 0 ) {
                req.log.info("found data for collection " + req.params.modelname);
                $res.send_success_response(res, {
                    response: {
                        docs: docs,
                        message: "found data for collection " + req.params.modelname
                    }
                });
            } else {
                req.log.error(Errors.documents_not_found);
                $res.send_not_found_error(res,Errors.documents_not_found);
            }
        });
}

/**
 * update a single document by id
 * @param req
 * @param res
 */

export function update_by_id(req, res) {
    req.log.debug("updating data for id " + req.params.id + " for collection "
    + req.params.modelname + "with body " + JSON.stringify(req.body));

    MongoHelper.updateById(req)
        .then(
        (docs) => {
            if (docs) {
                req.log.info("updated data for id " + req.params.id + " for collection "
                + req.params.modelname );

                $res.send_success_response(res, {
                    response: {
                        docs: docs,
                        message: "updated data for id " + req.params.id + " for collection "
                        + req.params.modelname
                    }
                });

            } else {
                $res.send_internal_server_error(res,Errors.documents_can_not_updated);
            }
        });
}

/**
 * update a multiple documents matched by a given param
 * @param req
 * @param res
 */
export function update_by_field(req, res) {

    req.log.debug("updating data for field  " + req.params.key + " with value " + req.params.value +
    " for collection " + req.params.modelname + "with body " + JSON.stringify(req.body));

    MongoHelper.updateByField(req)
        .then(
        (docs) => {
            if (docs) {
                req.log.info("updating data for field  " + req.params.key + " with value " + req.params.value +
                " for collection " + req.params.modelname + "with body " + JSON.stringify(req.body));

                $res.send_success_response(res, {
                    response: {
                        docs: docs,
                        message: "updated data for field  " + req.params.key + " with value " + req.params.value +
                        " for collection " + req.params.modelname
                    }
                });

            } else {
                $res.send_internal_server_error(res,Errors.documents_can_not_updated);
            }
        });

}

/**
 * delete single document by id
 * @param req
 * @param res
 */

export function delete_by_id (req, res) {
    req.log.debug("deleting data for id " + req.params.id + " for collection " + req.params.modelname);
    MongoHelper.delById(req).then(
        (docs) => {
        if (! docs) {

            req.log.info(" deleted data for id " + req.params.id + " for collection " + req.params.modelname);
            $res.send_success_response(res, {
                response: {
                    docs: { "success": "OK"  },
                    message: " deleted data for id " + req.params.id + " for collection " + req.params.modelname
                }
            });

        } else {
            $res.send_not_found_error(res, '');
        }
    });
}

/**
 * delete multiple document by param
 * @param req
 * @param res
 */

export function delete_by_field (req, res) {
    req.log.debug(" deleting data for field  " + req.params.key + " with value " + req.params.value +
    " for collection " + req.params.modelname );

    MongoHelper.delByField (req).then( (error) => {
        if(error){
            $res.send_not_found_error(res, '');
        } else {
            req.log.info(" deleted data for field  " + req.params.key + " with value " + req.params.value +
            " for collection " + req.params.modelname );
            $res.send_success_response(res, {
                response: {
                    docs: null,
                    message: " deleted data for field  " + req.params.key + " with value " + req.params.value +
                    " for collection " + req.params.modelname
                }
            });
        }
    });
}

/**
 * count the total number of results
 * @param req
 * @param res
 */

export function get_count (req, res) {
    req.log.debug("getting count  for collection " + req.params.modelname);
    MongoHelper.count(req).then( (count)=> {
        if(count) {
            req.log.info("got count  for collection " + req.params.modelname);
            $res.send_success_response(res, {
                response: {
                    count: count,
                    message: " count for collection " + req.params.modelname + " is " + count
                }
            });
        } else {
            $res.send_not_found_error(res, '');
        }
    });
}

/**
 * count the total number of results
 * @param req
 * @param res
 */

export function get_filtered_count (req, res) {
    req.log.debug("getting count  for collection " + req.params.modelname + " for filter with key " + req.params.fields
    + " and value " + req.params.value );
    MongoHelper.countFiltered(req).then( (count)=> {
        if(count) {
            req.log.info("got count  for collection " + req.params.modelname + " for filter with key " + req.params.fields
            + " and value " + req.params.value );
            $res.send_success_response(res, {
                response: {
                    count: count,
                    message: " count for collection " + req.params.modelname + " is " + count
                }
            });
        } else {
            $res.send_not_found_error(res, '');
        }
    });
}

/**
 * filter paginated results
 * @param req
 * @param res
 */

export function filtered_pagination (req, res) {
    req.log.debug("found data filtered by key "+ req.params.field +" having value "+ req.params.value
    + " and paginated data for collection " + req.params.modelname + " for page number " + req.params.currentPage );

    MongoHelper.filteredPagination(req).then( (docs)=> {
        if (docs && docs.length > 0 ) {
            req.log.info("found data filtered by key "+ req.params.field +" having value "+ req.params.value
            + " and paginated data for collection " + req.params.modelname + " for page number " + req.params.currentPage);
            $res.send_success_response(res, {
                response: {
                    docs: docs,
                    message: "found data filtered by key "+ req.params.field +" having value "+ req.params.value
                    + " and paginated data for collection " + req.params.modelname + " for page number " + req.params.currentPage
                }
            });
        } else {
            $res.send_not_found_error(res,'');
        }
    });
}

/**
 * sort paginated results
 * @param req
 * @param res
 */

export function sorted_pagination (req, res) {
    req.log.debug("found paginated data for collection " + req.params.modelname + " for page number " + req.params.currentPage);
    MongoHelper.sortedPagination(req).then( (docs)=> {
        if (docs && docs.length > 0 ) {
            req.log.info("found paginated data for collection " + req.params.modelname + " for page number " + req.params.currentPage);
            $res.send_success_response(res, {
                response: {
                    docs: docs,
                    message: "found paginated data for collection " + req.params.modelname + " for page number " + req.params.currentPage
                }
            });
        } else {
            $res.send_not_found_error(res, '');
        }
    });
}

/**
 * get by id
 * @param req
 * @param res
 */

export function get_by_id(req, res){
    req.log.debug("found  data for collection " + req.params.modelname + " for id " + req.params.id);
    MongoHelper.getById(req).then( (docs)=> {
        if (docs && docs.length > 0 ) {
            req.log.info("found  data for collection " + req.params.modelname + " for id " + req.params.id);
            $res.send_success_response(res, {
                response: {
                    docs: docs,
                    message: "found  data for collection " + req.params.modelname + " for id " + req.params.id
                }
            });
        } else {
            $res.send_not_found_error(res, '');
        }
    });

}


