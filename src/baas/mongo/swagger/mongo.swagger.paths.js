let $paths = {};
$paths.collections = {
    "get": {
        "description": "get collection from mongodb",
        "produces": [
            "application/json"
        ],
        "responses": {
            "200": {
                "description": "A list of mongo collections.",
                "schema": {
                    "$ref": "#/definitions/collections"
                },
                "examples": {
                    "application/json": ' { "response": { "docs": [ "permissions","roles","tokens","users"], "message": "sucessfully got collections"}'
                }
            },
            "404": {
                "description": "unexpected error",
                "schema": {
                    "$ref": "#/definitions/not_found_error"
                }
            },
            "500": {
                "description": "internal_server_error",
                "schema": {
                    "$ref": "#/definitions/internal_server_error"
                }
            }
        }

    }
}


$paths.get_documents = {
    "get": {
        "description": "get documents for the given collection from mongodb",
        "produces": [
            "application/json"
        ],
        "parameters": [
            {
                "name": "modelname",
                "in": "path",
                "required": true,
                "description": "The name of the collection to retrieve documents from ",
                "type": "string"
            }
        ],
        "responses": {
            "200": {
                "description": "A list of documents for the given collection",
                "schema": {
                    "$ref": "#/definitions/documents"
                },
                "examples": {
                    "application/json": '{ response": { "docs": [ { "_id": "58031b53ce85efc3fd5dd821", "username": "lisa2", "hashedPassword":"sJX8i7+EIsZUSHaIDYqprI1qz2lLmm9gXj6Rm1vY5RAE5LxMpc8dhHAFt2DjZD2Z0DCDwjqTY3di224uLVgYtw==", "__v": 0, "salt": "WwGMU72wfXmxrc6yCa9YFw==", "roles": ["57aec663adeceec90f543e19"], "email": "lisa1@cut.com" }],"message": "found data for collection user" }'
                }
            },
            "404": {
                "description": "unexpected error",
                "schema": {
                    "$ref": "#/definitions/not_found_error"
                }
            },
            "500": {
                "description": "internal_server_error",
                "schema": {
                    "$ref": "#/definitions/internal_server_error"
                }
            }
        }

    },
    "post": {
        "description": "post documents for the given collection to mongodb",
        "produces": [
            "application/json"
        ],
        "parameters": [
            {
                "name": "modelname",
                "in": "path",
                "required": true,
                "description": "The name of the collection to post documents to",
                "type": "string"
            }, {
                "name": "request",
                "in": "body",
                "description": "body of the document to be posted",
                "required": true,
                "schema": {
                    "type": "object"
                }
            }
        ],
        "responses": {
            "200": {
                "description": "A list of documents for the given collection",
                "schema": {
                    "$ref": "#/definitions/documents"
                }
            },
            "404": {
                "description": "unexpected error",
                "schema": {
                    "$ref": "#/definitions/not_found_error"
                }
            },
            "500": {
                "description": "internal_server_error",
                "schema": {
                    "$ref": "#/definitions/internal_server_error"
                }
            }
        }
    }
}

$paths.get_documents_by_id = {
    "get": {
        "description": "get document for the given collection by id from mongodb",
        "produces": [
            "application/json"
        ],
        "parameters": [
            {
                "name": "modelname",
                "in": "path",
                "required": true,
                "description": "The name of the collection to retrieve documents from ",
                "type": "string"
            },
            {
                "name": "id",
                "in": "path",
                "required": true,
                "description": "The id of the document to be retrieved",
                "type": "string"
            }
        ],
        "responses": {
            "200": {
                "description": "A list of documents for the given collection",
                "schema": {
                    "$ref": "#/definitions/documents"
                },
                "examples": {
                    "application/json": '{ response": { "docs": [ { "_id": "58031b53ce85efc3fd5dd821", "username": "lisa2", "hashedPassword":"sJX8i7+EIsZUSHaIDYqprI1qz2lLmm9gXj6Rm1vY5RAE5LxMpc8dhHAFt2DjZD2Z0DCDwjqTY3di224uLVgYtw==", "__v": 0, "salt": "WwGMU72wfXmxrc6yCa9YFw==", "roles": ["57aec663adeceec90f543e19"], "email": "lisa1@cut.com" }],"message": "found data for collection user" }'
                }
            },
            "404": {
                "description": "unexpected error",
                "schema": {
                    "$ref": "#/definitions/not_found_error"
                }
            },
            "500": {
                "description": "internal_server_error",
                "schema": {
                    "$ref": "#/definitions/internal_server_error"
                }
            }
        }
    },
    "put": {
        "description": "update documents for the given collection by id",
        "produces": [
            "application/json"
        ],
        "parameters": [
            {
                "name": "modelname",
                "in": "path",
                "required": true,
                "description": "The name of the collection for which to update the document",
                "type": "string"
            },
            {
                "name": "id",
                "in": "path",
                "required": true,
                "description": "The id of the document to be retrieved",
                "type": "string"
            },
            {
                "name": "request",
                "in": "body",
                "description": "body of the document to be posted",
                "required": true,
                "schema": {
                    "type": "object"
                }
            }
        ],
        "responses": {
            "200": {
                "description": "the updated document",
                "schema": {
                    "$ref": "#/definitions/documents"
                }
            },
            "404": {
                "description": "unexpected error",
                "schema": {
                    "$ref": "#/definitions/not_found_error"
                }
            },
            "500": {
                "description": "internal_server_error",
                "schema": {
                    "$ref": "#/definitions/internal_server_error"
                }
            }
        }
    }
};

$paths.get_documents_by_field = {
    "get": {
        "description": "get document for the given collection by id from mongodb",
        "produces": ["application/json"],
        "parameters": [{
            "name": "modelname",
            "in": "path",
            "required": true,
            "description": "The name of the collection to retrieve documents from ",
            "type": "string"
        }, {
            "name": "field",
            "in": "path",
            "required": true,
            "description": "The field by which to query the collection",
            "type": "string"
        }, {
            "name": "value",
            "in": "path",
            "required": true,
            "description": "The value for the field by which to query the collection",
            "type": "string"
        }],
        "responses": {
            "200": {
                "description": "A list of documents for the given collection",
                "schema": {
                    "$ref": "#/definitions/documents"
                },
                "examples": {
                    "application/json": '{ response": { "docs": [ { "_id": "58031b53ce85efc3fd5dd821", "username": "lisa2", "hashedPassword":"sJX8i7+EIsZUSHaIDYqprI1qz2lLmm9gXj6Rm1vY5RAE5LxMpc8dhHAFt2DjZD2Z0DCDwjqTY3di224uLVgYtw==", "__v": 0, "salt": "WwGMU72wfXmxrc6yCa9YFw==", "roles": ["57aec663adeceec90f543e19"], "email": "lisa1@cut.com" }],"message": "found data for collection user" }'
                }
            },
            "404": {
                "description": "unexpected error",
                "schema": {
                    "$ref": "#/definitions/not_found_error"
                }
            },
            "500": {
                "description": "internal_server_error",
                "schema": {
                    "$ref": "#/definitions/internal_server_error"
                }
            }
        }
    },
    "put": {
        "description": "update documents for the given collection by id",
        "produces": [
            "application/json"
        ],
        "parameters": [
            {
                "name": "modelname",
                "in": "path",
                "required": true,
                "description": "The name of the collection for which to update the document",
                "type": "string"
            },
            {
                "name": "field",
                "in": "path",
                "required": true,
                "description": "The field by which to query the collection",
                "type": "string"
            }, {
                "name": "value",
                "in": "path",
                "required": true,
                "description": "The value for the field by which to query the collection",
                "type": "string"
            },
            {
                "name": "request",
                "in": "body",
                "description": "body of the document to be posted",
                "required": true,
                "schema": {
                    "type": "object"
                }
            }
        ],
        "responses": {
            "200": {
                "description": "the updated document",
                "schema": {
                    "$ref": "#/definitions/documents"
                }
            },
            "404": {
                "description": "unexpected error",
                "schema": {
                    "$ref": "#/definitions/not_found_error"
                }
            },
            "500": {
                "description": "internal_server_error",
                "schema": {
                    "$ref": "#/definitions/internal_server_error"
                }
            }
        }
    }
};
export const paths = $paths;