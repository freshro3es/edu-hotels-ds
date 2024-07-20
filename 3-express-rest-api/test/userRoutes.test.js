import request from 'supertest';
import { expect } from 'chai';
import server from '../../3-express-rest-api/server.js'; // Импортируем сервер для тестирования

describe('User API', () => {
    let app;

    before((done) => {
        app = server.listen(3001, done); // Запускаем сервер на другом порту для тестов
    });

    after((done) => {
        app.close(done); // Закрываем сервер после тестов
    });

    it('should create a user', (done) => {
        request(app)
            .post('/users')
            .send({ name: 'Kenny', age: 35 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('name', 'Kenny');
                expect(res.body).to.have.property('age', 35);
                done();
            });
    });

    it('should get all users', (done) => {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get a user by ID', (done) => {
        request(app)
            .post('/users')
            .send({ name: 'Cartman', age: 10 })
            .set('Accept', 'application/json')
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                const userId = res.body.id;
                request(app)
                    .get(`/users/${userId}`)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.body).to.have.property('name', 'Cartman');
                        expect(res.body).to.have.property('age', 10);
                        done();
                    });
            });
    });

    it('should update a user by ID', (done) => {
        request(app)
            .post('/users')
            .send({ name: 'Stan', age: 10 })
            .set('Accept', 'application/json')
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                const userId = res.body.id;
                request(app)
                    .put(`/users/${userId}`)
                    .send({ name: 'Stan Marsh', age: 11 })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.body).to.have.property('name', 'Stan Marsh');
                        expect(res.body).to.have.property('age', 11);
                        done();
                    });
            });
    });

    it('should delete a user by ID', (done) => {
        request(app)
            .post('/users')
            .send({ name: 'Kyle', age: 10 })
            .set('Accept', 'application/json')
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                const userId = res.body.id;
                request(app)
                    .delete(`/users/${userId}`)
                    .expect(204)
                    .end((err) => {
                        if (err) return done(err);
                        request(app)
                            .get(`/users/${userId}`)
                            .expect(404)
                            .end(done);
                    });
            });
    });
});
