const mongo_swagger_definition = require('./mongo.swagger.spec.js');
import { paths } from './mongo.swagger.paths';
import { definitions } from './mongo.swagger.definitions'

const swagger_options = {
        swaggerDefinition: mongo_swagger_definition,
        apis: ['./route.js'] // Path to the API docs
    };

const swaggerJSDoc = require('swagger-jsdoc');
// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swagger_spec = swaggerJSDoc(swagger_options);

swagger_spec.paths["/collections"] = paths.collections;
swagger_spec.definitions["response"]=  definitions.response;

export const swaggerSpec = swagger_spec;