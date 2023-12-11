const { expect } = require('chai');
const sinon = require('sinon');
const fs = require('fs');
const supertest = require('supertest');
const app = require('../src/index');
const Certificate = require('../src/models/Certificate');
const { createCertificate } = require('../src/controllers/CertificateController');
const path = require('path');

describe('Certificate Controller', () => {
  it('should return a list of certificates', async () => {

    const response = await supertest(app).get('/api/certificate');

    expect(response.status).to.equal(200);

    response.body.forEach((certificate) => {
        expect(certificate).to.have.property('id');
        expect(certificate).to.have.property('name');
        expect(certificate).to.have.property('email');
        expect(certificate).to.have.property('certificate_id');
        expect(certificate).to.have.property('updatedAt');
        expect(certificate).to.have.property('createdAt');
        expect(certificate).to.have.property('file_name');
    });

  });
});


describe('Create Certificate API', () => {
  it('should create a certificate and return success message', async () => {

    
    const mockCertificate = {
      id: 17,
      name: 'John Doe',
      email: 'john@example.com',
      certificate_id: 123456789,
    };

    sinon.stub(Certificate, 'create').resolves(mockCertificate);
    // sinon.stub(fs.promises, 'writeFile').resolves();

    const req = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    };
    
    const res = {
      status: sinon.stub().returnsThis,
      json: sinon.stub(),
    };

    const next = sinon.stub();

    await createCertificate(req, res, next);


    try {
        expect(res.json.calledOnce).to.be.true;

        expect(res.json.calledWithMatch({ message: 'Certificate generated successfully', certificate: mockCertificate })).to.be.true;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
      
      sinon.restore();
    }

  });
});


describe('Delete certificate API', () => {
  describe('DELETE /api/certificate/:certificateId', () => {
    it('should delete a certificate and return success message', async () => {
      const mockCertificate = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        certificate_id: 123456789,
        file_name: 'qt_certificate-123456789.txt',
        destroy: sinon.stub().resolves(), 
      };

      sinon.stub(Certificate, 'findByPk').resolves(mockCertificate);
      sinon.stub(fs, 'unlink').resolves();

      const request = supertest(app);

      const response = await request.delete('/api/certificate/1').send({
        license_id: mockCertificate.certificate_id,
      });

      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Certificate deleted successfully');

      expect(mockCertificate.destroy.calledOnce).to.be.true;

      sinon.assert.calledWith(fs.unlink, path.join(__dirname, '../public', mockCertificate.file_name));
      sinon.restore();
    });
  });
});