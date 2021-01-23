const MongoClient = require('mongodb').MongoClient;

const url =
  'mongodb+srv://saad:saad@schoolhub.zmtqr.mongodb.net/users?retryWrites=true&w=majority';

const createUser = async (req, res, next) => {
  const newProduct = {
    type: req.body.type,
    email: req.body.email,
    username: req.body.username,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password
  };
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = db.collection('users').insertOne(newProduct);
  } catch (error) {
    return res.json({message: 'Could not store data.'});
  };
  client.close();

  res.json(newProduct);
  
};

const getUser = async (req, res, next) => {
  const client = new MongoClient(url);

  let products;

  try {
    await client.connect();
    const db = client.db();
    products = await db.collection('users').find().toArray();
  } catch (error) {
    return res.json({message: 'Could not find user.'});
  };
  client.close();

  res.json(products);
};

exports.createUser = createUser;
exports.getUser = getUser;


/*
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://saad:saad@schoolhub.zmtqr.mongodb.net/users?retryWrites=true&w=majority';

const createUser = async (req, res, next) => {
    const newUser = {
        type: req.body.type,
        email : req.body.email,
        username : req.body.username,
        phoneNumber : req.body.phoneNumber,
        password : req.body.password
    }
    const client = new MongoClient(url);

    try{
        await client.connect();
        const db = client.db();
        const result = db.collection('Users').insertOne(newUser);
    } catch(error){
        return res.json({message: "Cannot store data"})
    }

    client.close()

    res.json(newUser)
}

const getUser = async (req, res, next) => {
    const client = new MongoClient(url);
    let userr;
    try{
        await client.connect();
        const db = client.db;
        userr = await db.collection('Users').find().toArray();
    } catch(error){
        res.json({message:"No user found"})
    }

    client.close();

    res.json(userr)
}

const loginUser = async (req, res, next) => {
    const existingUser = {
        type: req.body.type,
        email : req.body.email,
        password : req.body.password,
    }
    const client = new MongoClient(url);

    try{
        await client.connect();
        const db = client.db();
        const result = db.collection('Users').find(existingUser);
    }catch(error){
        return res.json({message: "Cannot login"})
    }

    client.close()

    res.json(existingUser)
    console.log(res.json(existingUser))
}

exports.createUser = createUser;
exports.getUser = getUser;
exports.loginUser = loginUser;
*/