'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by prashun on 7/26/16.
 */
var qaConfig = exports.qaConfig = {
    NODE_ENV: 'qa',
    mongo: 'mongodb://localhost/qa',
    redis: {
        session: {
            server: 'qa',
            secretKey: 'SeekQret-cutqa',
            prefix: 'sess-dev',
            port: 6379,
            db: 0
        },
        db: {
            server: 'qa',
            secretKey: 'SeekQret-Cutqa',
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