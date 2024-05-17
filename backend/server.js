// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');

// const app = express();

// const port = 3000;

// app.use(cors());
// app.use(express.static('public'));


// class Product {
//     constructor(id, name, description, price) {
//         this.id = id;
//         this.name = name;
//         this.description = description;
//         this.price = price;
//     }
// }

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'products-db'
// });

// app.get('/api/products', cors(), (req, res) => {
//     connection.query('SELECT * FROM products', (error, results, fields) => {
//         if (error) {
//             console.error('Error fetching products: ', error);
//             res.status(500).json({ error: 'Internal server error' });
//         } else {
//             res.json(results); // Send the products as JSON response
//         }
//     });
// });

// app.get('/api/products/:id', cors(), (req, res) => {
//     const productId = req.params.id;

//     // Query the database to find the product with the specified ID
//     connection.query('SELECT * FROM products WHERE id = ?', [productId], (error, results, fields) => {
//         if (error) {
//             console.error('Error fetching product by ID:', error);
//             res.status(500).json({ error: 'Internal server error' });
//         } else if (results.length === 0) {
//             // If no product is found with the specified ID, return 404 Not Found
//             res.status(404).json({ message: 'Product not found' });
//         } else {
//             // If a product is found, return it in the response
//             res.json(results[0]);
//         }
//     });
// });


// connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
//     if (error) {
//         console.error('Error connecting to MySQL database: ', error);
//     } else {
//         console.log('Connected to MySQL database! Result of test query:', results[0].solution);
//     }
// });


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const app = express();
const port = 3000;
const mongo = require('mongodb');

app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb+srv://irisrzn:Olivia.2002@myfirstcluster.j36txik.mongodb.net/ecomm?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

async function startServer() {
    await connectToDatabase();

    const db = client.db("ecomm");
    const productsCollection = db.collection("product");
    const categoryCollection = db.collection("category");

    // GET all products
    app.get('/api/products', async (req, res) => {
        const products = await productsCollection.find().toArray();
        res.json(products);
    });

    // GET a single product by ID
    app.get('/api/products/:id', async (req, res) => {
        const productId = req.params.id;
        const product = await productsCollection.findOne({ "_id" : new ObjectId(productId) });
        res.json(product);
    });

    // POST a new product
    app.post('/api/products', async (req, res) => {
        const newProduct = req.body;
        const result = await productsCollection.insertOne(newProduct);
        res.json(result.ops[0]);
    });

    // PUT (update) a product
    app.put('/api/products/:id', async (req, res) => {
        const productId = req.params.id;
        const updatedProduct = req.body;
        const result = await productsCollection.updateOne({ _id: ObjectId(productId) }, { $set: updatedProduct });
        res.json(result);
    });

    // DELETE a product
    app.delete('/api/products/:id', async (req, res) => {
        const productId = req.params.id;
        const result = await productsCollection.deleteOne({ _id: ObjectId(productId) });
        res.json(result);
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

startServer();
