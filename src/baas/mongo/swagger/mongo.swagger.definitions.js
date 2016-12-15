let $definitions ={};

$definitions.default = {
    "required": [
        "response"
    ],
    "properties": {
            "response": {
                "$ref": "#/definitions/responses"
            }
    }
};

$definitions.responses = {
    "properties": {
        "docs":{
            "$ref": "#/definitions/docs"
        },
        "message":{
            "$ref": "#/definitions/message"
        }
    }
}


$definitions.docs={
    "type": "array",
        "items": {
        "type": "object"
    }
}

$definitions.message={
    "type": "string"
}

$definitions.not_found_error= {
    "properties" : {
        "type": { "type": "string" },
        "message":{ "$ref": "#/definitions/message" },
        "details":{ "type": "object" },
        "status": { "type": "number" },
        "errorCode": { "type": "string" },
        "isAppError": { "type": "boolean" }
    }
}

$definitions.internal_server_error = {
    "properties" : {
        "type": { "type": "string" },
        "message":{ "$ref": "#/definitions/message" },
        "details":{ "type": "object" },
        "status": { "type": "number" },
        "errorCode": { "type": "string" },
        "isAppError": { "type": "boolean" }
    }
}

export const definitions = $definitions;