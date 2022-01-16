const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');
const db = require('../models/connections/mongodb');
const should = chai.should();

chai.use(chaiHttp);

describe('Records', () => {
    before((done) => {
        db.connect().then(() => done())
    });
    describe('/POST records', () => {
        it('it should not a record without required payload', (done) => {
            // Removed 'startDate' from the payload to test the error
            const payload = {
                endDate: '2016-01-30',
                minCount: 2813,
                maxCount: 2813
            };
            chai.request(server)
                .post('/api/v1/records')
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('code').not.equal(0);
                    res.body.should.have.property('msg');
                    res.body.msg.should.be.a('string');
                    res.body.msg.should.equal('Valid startDate is required');
                    done(err);
                });
        });


        it('it should get the records', (done) => {
            const payload = {
                startDate: '2016-01-26',
                endDate: '2016-01-30',
                minCount: 2813,
                maxCount: 2813
            };

            chai.request(server)
                .post('/api/v1/records')
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('code').eql(0);
                    res.body.should.have.property('msg').eql('success');
                    res.body.should.have.property('records');
                    res.body.records.should.be.a('array');
                    done(err);
                });
        });
    });
});