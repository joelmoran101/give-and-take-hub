// BrowseItems.test.tsx
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectToDatabase } from '../config/mongoDb';

describe('BrowseItems', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await connectToDatabase(MongoMemoryServer);
  });

  // ...
});