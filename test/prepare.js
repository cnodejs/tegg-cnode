const { MongoClient } = require('mongodb');

async function main() {
  const mongoUrl = 'mongodb://root:root@mongo:27017/';
  const client = new MongoClient(mongoUrl);

  // user.cnode;
  const initUser = async () => {
    const adminDb = client.db('admin');
    const collection = adminDb.collection('system.users');

    const cnodeUser = await collection.findOne({
      user: 'cnode',
    });

    console.log('admin.system.users', cnodeUser);

    if (!cnodeUser) {
      await adminDb.addUser('cnode', 'cnode', {
        roles: [
          {
            role: 'readWrite',
            db: 'cnode',
          },
        ],
      });
    }
  };

  // db.cnode
  const initCNode = async () => {
    const cnodeDb = client.db('cnode');
    const collection = cnodeDb.collection('cnode');

    const cnodeDocument = await collection.findOne({
      cnode: 'cnode',
    });

    console.log('cnode.cnode', cnodeDocument);

    if (!cnodeDocument) {
      await collection.insertOne({
        cnode: 'cnode',
      });
    }
  };

  await client.connect();

  await initUser();
  await initCNode();

  await client.close();
}

main();
