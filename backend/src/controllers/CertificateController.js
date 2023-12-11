const asyncHandler = require('express-async-handler');
const fs = require('fs');
const path = require('path');
const Certificate = require('../models/Certificate');

const getCertificates = asyncHandler(async(req,res)=>{
    const certificate = await Certificate.findAll();
    res.status(200).json(certificate);
})

const createCertificate = asyncHandler(async(req,res,next)=>{
    const { name, email } = req.body;
    
    //generate unique certificate id
    const certificate_id = Math.floor(Math.random() * (999999999999 - 100000000000 + 1)) + 100000000000;

    const file_name = `qt_certificate-${Date.now()}.txt`;

    const filePath = path.join(__dirname, '../../public', file_name);
    console.log(filePath)

    const certificate = await Certificate.create({ name, email, certificate_id, file_name});

    const certificateData = {username:certificate.name,certificate_id:certificate.certificate_id}

    //download file to the public directory
    await fs.promises.writeFile(filePath, JSON.stringify(certificateData));
 
    res.status(200).json({
        message: "Certificate generated successfully",
        certificate,
      });

})

const deleteCertificate = asyncHandler(async(req,res,next)=>{
    const {license_id} = req.body

    if(!license_id){
        return res.status(404).json({ message: 'Please enter valid certificate id' });
    }

    const certificate = await Certificate.findByPk(req.params.certificateId)

    if(license_id != certificate.certificate_id){
        return res.status(404).json({ message: 'Invalid certificate Id' });
    }

    if (!certificate) {
        // Certificate with the specified ID not found
        return res.status(404).json({ message: 'Certificate not found' });
    }

    const filePath = path.join(__dirname, '../../public', certificate.file_name);
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        }
    });

    await certificate.destroy()

    res.status(200).json({
        message: "Certificate deleted successfully",
        certificate
    })
})

module.exports = {
    getCertificates,
    createCertificate,
    deleteCertificate
}