const typeDefs = `#graphql

type Fruit {
  _id: String
  name: String
  pricePerKilo: String
}

type Delete {
  acknowledged: String
  deletedCount: String
}

type Update {
  acknowledged: String
  modifiedCount: String
  upsertedId: String
  upsertedCount: String
  matchedCount: String
}


type Query {
    getFruits: [Fruit],
}

type Mutation {
    createFruit(_id:String, name:String, pricePerKilo:String): Fruit,
    deleteFruit(_id:String): Delete,
    updateFruit(_id:String, name:String, pricePerKilo:String):Update,
}
`;

export default typeDefs;