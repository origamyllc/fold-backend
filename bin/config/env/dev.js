'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var devConfig = exports.devConfig = {
    NODE_ENV: 'development',
    mongo: 'mongodb://localhost/security-35',
    redis: {
        session: {
            server: 'localhost',
            secretKey: 'SeekQret-CutDev',
            prefix: 'sess-dev',
            port: 6379,
            db: 0
        },
        db: {
            server: 'localhost',
            secretKey: 'SeekQret-CutDev',
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