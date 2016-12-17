/**
 * Created by prashun on 12/15/16.
 */
var gulp = require('gulp');
var babel = require('gulp-babel');
var pm2 = require('pm2');
var eslint = require('gulp-eslint');
var rules = require('./eslint');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var env = require('gulp-env');

gulp.task('default', function(){});

gulp.task('build', function () {
    return gulp.src(['src/*.js','src/**/*.js','src/baas/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
    return gulp.src(['src/*.js','src/**/*.js','src/baas/**/*.js'])
        .pipe(eslint(rules))
        .pipe(eslint.format())
});

gulp.task('watch', function() {

});

gulp.task('dev:server', function (cb) {
     nodemon({
        script: './dist/server.js',
         env:{
              "CONFIG_PATH":'/Users/prashun/WebstormProjects/fold-backend/dist/config/env/dev.js',
             "NODE_ENV": require('./dist/config/env/dev.js').default.NODE_ENV,
             "PORT":require('./dist/config/env/dev.js').default.express.port,
             "MONGO_DB_URL":require('./dist/config/env/dev.js').default.mongo
         }
    });
});

gulp.task('int:server', function (cb) {
    var started = false;
    return nodemon({
        script: './dist/server.js',
        env: {
            "CONFIG_PATH":'/Users/prashun/WebstormProjects/fold-backend/dist/config/env/int.js',
            "NODE_ENV": require('./dist/config/env/int.js').default.NODE_ENV,
            "PORT":require('./dist/config/env/int.js').default.express.port,
            "MONGO_DB_URL":require('./dist/config/env/int.js').default.mongo
        }
    });
});

gulp.task('prod:server', function () {
    pm2.connect(true, function () {
        pm2.start({
            name: 'server',
            script: './dist/server.js',
            env: {
                "CONFIG_PATH":'/Users/prashun/WebstormProjects/fold-backend/dist/config/env/prod.js',
                "NODE_ENV": require('./dist/config/env/prod.js').default.NODE_ENV,
                "PORT":require('./dist/config/env/prod.js').default.express.port,
                "MONGO_DB_URL":require('./dist/config/env/prod.js').default.mongo
            }
        }, function () {
            console.log('pm2 started');
            pm2.streamLogs('all', 0);
        });
    });
});

gulp.task('qa:server', function (cb) {
    nodemon({
        script: './dist/server.js',
        env:{
            "CONFIG_PATH":'/Users/prashun/WebstormProjects/fold-backend/dist/config/env/qa.js',
            "NODE_ENV": require('./dist/config/env/qa.js').default.NODE_ENV,
            "PORT":require('./dist/config/env/qa.js').default.express.port,
            "MONGO_DB_URL":require('./dist/config/env/qa.js').default.mongo
        }
    });
});

gulp.task('stress:server', function () {
    pm2.connect(true, function () {
        pm2.start({
            name: 'server',
            script: './dist/server.js',
            env: {
                "CONFIG_PATH":'/Users/prashun/WebstormProjects/fold-backend/dist/config/env/stress.js',
                "NODE_ENV": require('./dist/config/env/stress.js').default.NODE_ENV,
                "PORT":require('./dist/config/env/stress.js').default.express.port,
                "MONGO_DB_URL":require('./dist/config/env/stress.js').default.mongo
            }
        }, function () {
            console.log('pm2 started');
            pm2.streamLogs('all', 0);
        });
    });
});

gulp.task('debug', ['build','lint','watch']);

gulp.task('dev',  ['build','lint','dev:server']);

gulp.task('int', ['build','lint','int:server']);

gulp.task('prod', ['build','prod:server']);

gulp.task('qa', ['build','lint','qa:server']);

gulp.task('stress',  ['build','stress:server']);

