const chai = require('chai')
const chaiHttp = require('chai-http')
const sinon = require('sinon')
const app = require('../index')
const externalApi = require('../utils/externalApi')

const { expect } = chai
chai.use(chaiHttp)

describe('API Endpoints', () => {
  before(() => {
    sinon.stub(externalApi, 'getFileList').resolves([
      'test1.csv', 'test2.csv', 'test3.csv', 'test18.csv', 'test4.csv',
      'test5.csv', 'test6.csv', 'test9.csv', 'test15.csv'
    ])

    sinon.stub(externalApi, 'downloadFile').callsFake((fileName) => {
      if (fileName === 'test6.csv') {
        return Promise.resolve(`file,text,number,hex
test6.csv,plGDYpiNMeTnHxsZxqFzIzhVEGW,,35422b3f39f7257fa70f2223e9b69b73
test7.csv,xopJdHvbmJMEUSHEWAhQaVPZkw,,932f2af3dadfa42444100cf652b2f1e9
test8.csv,jCrMDrz,,72574de72ba3b8f67b5d1d6e318a7417
test9.csv,UWnvbNHe,,f5488322ea682d460929a5d9ed160434
test10.csv,DnBlMQVaSUqbj,,6613613187257926210c60a86846d07e
test11.csv,fihSPFOmSZYXpZpZmRLVF,,a6d7ec27716846088f073d7f77c7ddb3
test12.csv,BhzJmUt,,fc7447cf4d46077860f31ec64a58ccc9
test13.csv,ViZspgaGYWyYmxySGANYpmYoDRuMq,,46dcd7c5285101bad201dda61e1f6d66
test14.csv,oqQyQjYOtnvxkcFsGcTBXNAg,,11d6b248f8dfe571d61d9afba8d8fbcc
test15.csv,cLuhONLqvLKWWrtoRNjJlOT,,e98115a32ce8c34feff0f95204dce0b6`)
      } else {
        return Promise.reject(new Error('File not found'))
      }
    })
  })

  after(() => {
    sinon.restore()
  })

  describe('GET /files/list', () => {
    it('should return a list of files', (done) => {
      chai.request(app)
        .get('/files/list')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          expect(res.body).to.include.members([
            'test1.csv', 'test2.csv', 'test3.csv', 'test18.csv', 'test4.csv',
            'test5.csv', 'test6.csv', 'test9.csv', 'test15.csv'
          ])
          done()
        })
    })
  })

  describe('GET /files/data', () => {
    it('should return file data for test6.csv with correct structure', (done) => {
      chai.request(app)
        .get('/files/data')
        .query({ fileName: 'test6.csv' })
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.have.property('file', 'test6.csv')
          expect(res.body[0].lines).to.be.an('array').that.is.not.empty
          expect(res.body[0].lines[0]).to.deep.equal({
            text: 'xhWfclMXlHmfwQEtXIuukXuziGbwmY',
            number: null,
            hex: 'a7591078a767a0dadbc459235211bdf7'
          })
          done()
        })
    })

    it('should return a 404 status for an invalid file name', (done) => {
      chai.request(app)
        .get('/files/data')
        .query({ fileName: 'invalid-file.csv' })
        .end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
    })
  })
})
