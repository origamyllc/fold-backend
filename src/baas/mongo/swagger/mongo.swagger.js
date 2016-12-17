const mongo_swagger_definition = require('./mongo.swagger.spec.js');
import { paths } from './mongo.swagger.paths';
import { definitions } from './mongo.swagger.definitions';

const swagger_options = {
        swaggerDefinition: mongo_swagger_definition,
        apis: ['./route.js'] // Path to the API docs
    };

const swaggerJSDoc = require('swagger-jsdoc');
// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swagger_spec = swaggerJSDoc(swagger_options);

swagger_spec.paths["/collections"] = paths.collections;
swagger_spec.paths["/{modelname}"] = paths.get_documents ;
swagger_spec.paths["/{modelname}/{id}"] =paths.get_documents_by_id;
swagger_spec.paths["/{modelname}/{field}/{value}"]=paths.get_documents_by_field;

swagger_spec.definitions["docs"]=  definitions.docs;
swagger_spec.definitions["message"]=  definitions.message;
swagger_spec.definitions["responses"]=  definitions.responses;
swagger_spec.definitions["collections"]=  definitions.default;
swagger_spec.definitions["documents"]=  definitions.default;
swagger_spec.definitions["not_found_error"]=  definitions.not_found_error;
swagger_spec.definitions["internal_server_error"]=  definitions.internal_server_error ;
export const swaggerSpec = swagger_spec;