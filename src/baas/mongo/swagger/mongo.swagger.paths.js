 let $paths ={};
 $paths.collections = {
    "get": {
        "description": "get collection from mongodb",
        "produces": [
            "application/json"
        ],
        "responses": {
            "200": {
                "description": "A list of mnogo collections.",
                "schema": {
                    "$ref": "#/definitions/response"
                },
                "examples": {
                    "application/json": {
                        "docs": [
                            "permissions",
                            "roles",
                            "tokens",
                            "users"
                        ],
                        "message": "sucessfully got collections"
                    }
                }
            }
        }
    }
}
export const paths = $paths;