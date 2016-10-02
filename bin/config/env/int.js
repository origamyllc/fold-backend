'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by prashun on 7/26/16.
 */
var integrationConfig = exports.integrationConfig = {
    NODE_ENV: 'integration',
    mongo: 'mongodb://localhost/integration',
    redis: {
        session: {
            server: 'integration',
            secretKey: 'SeekQret-CutInt',
            prefix: 'sess-int',
            port: 6379,
            db: 0
        },
        db: {
            server: 'integration',
            secretKey: 'SeekQret-CutInt',
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