const { client, DB_NAME, COLLECTION_NAME } = require("./fixtures");

(async () => {
  await client.connect();
  const db = client.db(DB_NAME);
  const collections = await db.listCollections().toArray();
  const exists = !!collections.find((c) => c.name === COLLECTION_NAME);
  if (exists) {
    const collection = db.collection(COLLECTION_NAME);
    await collection.deleteMany();
  } else await db.createCollection(COLLECTION_NAME);
  await client.close();
})();
