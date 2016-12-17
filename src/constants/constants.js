/**
 * Created by prashun on 7/26/16.
 */

import { devConfig } from  '../config/env/dev.js';
import { integrationConfig } from  '../config/env/int.js';
import { productionConfig } from  '../config/env/prod.js';
import { qaConfig } from  '../config/env/qa.js';
import { stressConfig } from  '../config/env/stress.js';

let config = devConfig;

if ( process.env.NODE_ENV === 'development') {
    config = devConfig;
}

if ( process.env.NODE_ENV === 'integration' ){
    config = integrationConfig;
}

if ( process.env.NODE_ENV === 'production' ){
    config = productionConfig;
}

if ( process.env.NODE_ENV === 'qa' ){
    config = qaConfig ;
}

if ( process.env.NODE_ENV === 'stress' ){
    config = stressConfig;
}

//add constants here
export const MONGO_DB_URL = config.mongo;
export const  REDIS_SERVER_CONF = config.redis.db;
export const  settings = config ;


