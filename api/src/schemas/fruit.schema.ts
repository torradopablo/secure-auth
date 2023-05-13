const FruitShcema = {
    "Fruit":{
      "$id":"Fruit",
      "title": "Fruit",
      "type": "object",
      "properties": {
        "_id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "pricePerKio": {
          "type": "string"
        },
      },
      "required": [
        "_id",
        "name",
        "pricePerKio"
      ],
    },
}
exports.default = FruitShcema;
