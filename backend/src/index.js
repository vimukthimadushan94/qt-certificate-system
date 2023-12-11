const express = require('express')
const cors = require('cors');
const sequelize = require('./config/dbConfig');
const CertificateRoutes = require('./routes/CertificateRoutes');
const errorHandler = require('./middleware/errorHandler');
bodyParser = require("body-parser");
const swagger = require('./config/swagger');
const app = express()
app.use(cors());

app.use(express.json())


app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
app.use(bodyParser.json());

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });


    
app.use('/api/certificate',CertificateRoutes)

app.use(errorHandler);

swagger(app)

module.exports = app;

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});