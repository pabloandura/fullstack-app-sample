const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const { expect } = chai;
chai.use(chaiHttp);

describe('API Endpoints', () => {

  describe('GET /', () => {
    it('should return API running confirmation message', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Servidor API en funcionamiento');
          done();
        });
    });
  });

  describe('GET /files/list', () => {
    it('should return an array of file names', (done) => {
      chai.request(app)
        .get('/files/list')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          res.body.forEach(file => expect(file).to.be.a('string'));
          done();
        });
    });
  });

  describe('GET /files/data', () => {
    it('should return formatted data from all available files', (done) => {
      chai.request(app)
        .get('/files/data')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          res.body.forEach(fileData => {
            expect(fileData).to.have.property('file').that.is.a('string');
            expect(fileData).to.have.property('lines').that.is.an('array');
            fileData.lines.forEach(line => {
              expect(line).to.have.property('text').that.is.a('string');
              expect(line).to.have.property('number').that.is.a('number');
              expect(line).to.have.property('hex').that.is.a('string').and.have.lengthOf(32);
            });
          });
          done();
        });
    });

    it('should return data only for a specific file when fileName is provided', (done) => {
      chai.request(app)
        .get('/files/data?fileName=test1.csv')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').with.lengthOf(1);
          expect(res.body[0]).to.have.property('file').that.equals('test1.csv');
          done();
        });
    });
  });
});
