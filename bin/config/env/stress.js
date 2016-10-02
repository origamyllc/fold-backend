'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by prashun on 7/26/16.
 */
var stressConfig = exports.stressConfig = {
    NODE_ENV: 'stress',
    mongo: 'mongodb://localhost/stress',
    redis: {
        session: {
            server: 'localhost',
            secretKey: 'SeekQret-Cutstress',
            prefix: 'sess-dev',
            port: 6379,
            db: 0
        },
        db: {
            server: 'localhost',
            secretKey: 'SeekQret-CutStress',
            port: 6379,
            db: 1
        }
    },
    rabbit: {
        host: 'localhost',
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