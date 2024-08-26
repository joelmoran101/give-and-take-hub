const swaggerUI = require('swagger-ui-express');
const yaml = require('yamljs');
const path = require('path');

const swaggerDocument = yaml.load(path.join(__dirname, 'swagger.yaml'));

function swaggerDocs(app, port) {
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    console.log(`Version 1 Docs available at http://localhost:${port}/docs`);
}
module.exports = swaggerDocs