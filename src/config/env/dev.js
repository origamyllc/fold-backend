export const devConfig = {
    NODE_ENV:'development',
    mongo: 'mongodb://localhost/security-33',
    redis: {
     session :{
        server: 'localhost',
        secretKey: 'SeekQret-CutDev',
        prefix: 'sess-dev',
        port: 6379,
        db: 0
    },
        db : {
            server: 'localhost',
            secretKey: 'SeekQret-CutDev',
            port: 6379,
            db: 1
        }
    },
    rabbit: { host: 'localhost'
        , port: 5672
        , login: 'guest'
        , password: 'guest'
        , connectionTimeout: 10000
        , authMechanism: 'AMQPLAIN'
        , vhost: '/'
        , noDelay: true
        , ssl: { enabled : false
        }
    },
    express:{
        port:9000
    }
}