let $definitions ={};
$definitions.response = {
    "required": [
    "message"
],
    "properties": {
    "docs": {
        "type": "array",
            "items": {
            "type": "string"
        }
    },
    "message": {
        "type": "string"
    }
}
};

export const definitions = $definitions;