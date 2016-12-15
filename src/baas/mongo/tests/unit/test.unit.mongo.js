/**
 * Created by prashun on 12/7/16.
 */
// index.js
var path = require('path');
global.appRoot = process.cwd();
const helper = require(global.appRoot + '/src/baas/mongo/mongo.helper');
const expect = require('chai').expect;

describe('1. tests for Mongo api ', () => {


    it('1.1 should get collections from mongo ', (done) => {
        helper.get_collections().then((collections) => {
            expect(collections.length).to.not.equals(0);
        });
        done()
    });

    it('1.2 should return the documents if the collection extists',(done) => {
        helper.show('user').then((collections) => {
            expect(collections.length).to.not.equals(0);
        });
        done();
    });

    it('1.3 should throw error if collection does not exist',(done) => {
        helper.show('users').then((collections) => {
            expect(collections.toString()).to.equals("Error: model does not exist" );
        });
        done();
    });

    it('1.4 should return the documents from the collection by id',(done) => {
        helper.getById('user','58031b53ce85efc3fd5dd821').then((collections) => {
            expect(collections.length).to.not.equals(0);
        });
        done();
    });

    it('1.5 should throw error if the document does not exist',(done) => {
        helper.getById('user','58031b53ce85efc3fd5dd8').then((collections) => {
            expect(collections).not.to.be.defined;
        });
        done();
    });

    it('1.6 should return the documents from the collection by id',(done) => {
        helper.find('user','username','lisa2').then((collections) => {
            expect(collections.length).to.not.equals(0);
        });
        done();
    });

    it('1.7 should throw error if the document does not exist',(done) => {
        helper.find('user','username','xyz').then((collections) => {
            expect(collections).not.to.be.defined;
        });
        done();
    });

    it('1.8 should save the documents for the given collection', function (done) {

        let user_stub = {
            "username": "lista1",
            "hashedPassword": "sJX8i7+EIsZUSHaIDYqprI1qz2lLmm9gXj6Rm1vY5RAE5LxMpc8dhHAFt2DjZD2Z0DCDwjqTY3di224uLVgYtw==",
            "salt": "WwGMU72wfXmxrc6yCa9YFw==",
            "roles": "57aec663adeceec90f543e19",
            "email": "lista1@cut.com1"
        }

        helper.insert('user', user_stub).then(function (collections) {
            expect(collections.length).to.not.equals(0);
        });
        done();
    });

    it('1.9 should throw an error when the documents for the given collection fail to be inserted', function (done) {

        let user_stub = {
            "username": "lista1",
            "hashedPassword": "sJX8i7+EIsZUSHaIDYqprI1qz2lLmm9gXj6Rm1vY5RAE5LxMpc8dhHAFt2DjZD2Z0DCDwjqTY3di224uLVgYtw==",
            "salt": "WwGMU72wfXmxrc6yCa9YFw==",
            "roles": "57aec663adeceec90f543e19",
            "email": "lista1@cut.com1"
        }

        helper.insert('user', user_stub).then(function (collections) {
            expect(collections.message).to.equals('user validation failed');
        });
        done();
    });

    it('1.10 should update the documents for the given collection by id', function (done) {

        let user_stub = {
            "username": "lisa2"
        }

        helper.updateById('user','58031b53ce85efc3fd5dd821', user_stub).then(function (collections) {
            expect(collections.length).to.not.equals(0);
            expect(collections.ok).to.equals(1);
        });
        done();
    });

    it('1.11 should throw an error when the documents for the given collection fail to be updated', function (done) {

        let user_stub = {
            "username": "lista1"
        }

         helper.updateById('user','58031b5ce85efc3fd5dd821', user_stub).then(function (collections) {
             expect(collections.ok).to.equals(0);
        });
        done();
    });


    it('1.12 should update the documents for the given collection by field', function (done) {

        let user_stub = {
            "username": "lisa"
        }

        helper.updateByField('user','username','lisa4', user_stub).then(function (collections) {
            expect(collections.length).to.not.equals(0);
            expect(collections.ok).to.equals(1);
        });
        done();
    });

   it('1.13 should throw an error when the documents for the given collection fail to be updated', function (done) {

        let user_stub = {
            "username": "lista1"
        }

       helper.updateByField('xyz','username','lisa', user_stub).then(function (collections) {
           expect(collections.ok).to.equals(0);
        });
        done();
    });

});