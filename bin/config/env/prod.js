'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by prashun on 7/26/16.
 */
var productionConfig = exports.productionConfig = {
    NODE_ENV: 'production',
    mongo: 'mongodb://localhost/prod',
    redis: {
        session: {
            server: 'prod',
            secretKey: 'SeekQret-CutProd',
            prefix: 'sess-prod',
            port: 6379,
            db: 0
        },
        db: {
            server: 'prod',
            secretKey: 'SeekQret-CutProd',
            port: 6379,
            db: 1
        }
    },
    rabbit: { host: 'localhost',
        port: 5672,
        login: 'guest',
        password: 'guest',
        connectionTimeout: 10000,
        authMechanism: 'AMQPLAIN',
        vhost: '/',
        noDelay: true,
        ssl: { enabled: false
        }
    },
    express: {
        port: 9000
    }
};