import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: any;
beforeAll(async () => {
    mongo = new MongoMemoryServer();
    const uri = await mongo.getUri();


    await mongoose.connect(uri)
});

beforeEach(async () => {
    if (mongoose.connection.db) {
        const collections = await mongoose.connection.db.collections();

        for (let collection of collections) {
            await collection.deleteMany({});
        }
    }
});

afterAll(async () => {
   
    await mongo.stop();
    await mongoose.connection.close();
})