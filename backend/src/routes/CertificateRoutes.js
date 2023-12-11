const express = require("express")
const CertificateController = require("../controllers/CertificateController")
const router = express.Router()


//swagger schema for Certificate model
/**
 * @swagger
 * components:
 *   schemas:
 *     Certificate:
 *       type: object
 *       required:
 *         - email
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The title of your certificate
 *         email:
 *           type: string
 *           description: The Certificate author
 *         certificate_id:
 *           type: integer
 *           description: The Certificate Id(randomly generated 12 digit number)
 *         createdAt:
 *           type: string
 *           description: created data time
 *         updatedAt:
 *           type: string
 *           description: updated data time
 *       example:
 *         id: 1
 *         name: test certificate name
 *         email: test@gmail.com
*/


/**
 * @swagger
 * tags:
 *   name: Certificate
 *   description: The Certificate managing API
 * /api/certificate:
 *   get:
 *     summary: Lists all the certificates
 *     tags: [Certificate]
 *     responses:
 *       200:
 *         description: The list of the certificates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Certificate'
 *   post:
 *     summary: Create a new Certificate
 *     tags: [Certificate]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certificate'
 *     responses:
 *       200:
 *         description: The created Certificate.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certificate'
 *       500:
 *         description: Some server error
 * /api/certificate/{certificateId}:
 *   delete:
 *     summary: Remove the certificate by id
 *     tags: [Certificate]
 *     parameters:
 *       - in: path
 *         name: certificateId
 *         schema:
 *           type: string
 *         required: true
 *         description: Primary key for the certificate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               license_id:
 *                 type: string
 *                 description: The license id
 *     responses:
 *       200:
 *         description: The certificate was deleted
 *       404:
 *         description: The certificate was not found
 *
 */


router.route('/')
        .get(CertificateController.getCertificates)
        .post(CertificateController.createCertificate)

router.route('/:certificateId')
        .delete(CertificateController.deleteCertificate)

module.exports = router