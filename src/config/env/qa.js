export  default {
    NODE_ENV:'qa',
    mongo: 'mongodb://localhost/qa',
    redis: {
        options: {
            server: 'localhost',
            secretKey: 'SeekQret-CutQA',
            port: 6379,
            db: 1
        }
    },
    rabbitmq: {
        options: {
            host: 'localhost'
            , port: 5672
            , login: 'guest'
            , password: 'guest'
            , connectionTimeout: 10000
            , authMechanism: 'AMQPLAIN'
            , vhost: '/'
            , noDelay: true
            , ssl: {
                enabled: false
            }
        }
    },
    express:{
        port:9000
    },
    lru: {
        options: {
            max: 500,
            maxAge: 1000 * 60 * 60
        }
    }
};