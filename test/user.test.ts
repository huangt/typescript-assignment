import supertest from 'supertest';
import { expect } from 'chai';

let usernameTestValue = ''; 
const firstUserBody = {
    username: `testUser`,
    password: 'Aa12bb34',
};
const secondUserBody = {
    username: `testUser2`,
    password: '1a2b3',
};
const thirdUserBody = {
    username: `3testUser`,
    password: '11a12b34',
};
const fourthUserBody = {
    username: `testUser4`,
    password: 'abcd123',
};
const fifthUserBody = {
    username: `testUser5`,
    password: 'abcdefghijk',
};
const sixthUserBody = {
    username: `testUser6`,
    password: '123456789',
};
const app = require('../app');
const request = require('supertest');

describe('users and auth endpoints', function () {
    let request: supertest.SuperAgentTest;
    before(function () {
        request = supertest.agent(app);
    });
    it('should allow adding user POST to /api/register', async function () {
        const res = await request.post('/api/register').send(firstUserBody);
    
        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.username).to.be.a('string');
        usernameTestValue = res.body.username;
    });
    
    it('should allow get by username GET from /api/:username', async function () {
        const res = await request
            .get(`/api/${usernameTestValue}`)
            .send();
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.username).to.be.a('string');
        expect(res.body.username).to.equal(usernameTestValue);
    });
    it('should allow getting all users GET from /api/users', function (done) {
        request
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    it('should not allow adding user with invalid password(length < 6) POST to /api/register', async function () {
        const res = await request.post('/api/register').send(secondUserBody);
        expect(res.status).to.equal(400);
    });
    it('should not allow adding user with invalid password(three consecutive number) POST to /api/register', async function () {
        const res = await request.post('/api/register').send(fourthUserBody);
        expect(res.status).to.equal(400);
    });
    it('should not allow adding user with invalid password(only letter) POST to /api/register', async function () {
        const res = await request.post('/api/register').send(fifthUserBody);
        expect(res.status).to.equal(400);
    });
    it('should not allow adding user with invalid password(only number) POST to /api/register', async function () {
        const res = await request.post('/api/register').send(sixthUserBody);
        expect(res.status).to.equal(400);
    });
    it('should not allow adding user with invalid username POST to /api/register', async function () {
        const res = await request.post('/api/register').send(thirdUserBody);
        expect(res.status).to.equal(400);
    });
    it('should not allow adding user with duplicate username POST to /api/register', async function () {
        const res = await request.post('/api/register').send(firstUserBody);
        expect(res.status).to.equal(400);
    });
    it('should allow delete by username DELETE from /api/:username', async function () {
        const res = await request
            .delete(`/api/${usernameTestValue}`)
            .send();
        expect(res.status).to.equal(204);
    });
});