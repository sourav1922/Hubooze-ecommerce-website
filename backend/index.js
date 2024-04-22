const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { error } = require("console");
// const { error } = require("console");

app.use(express.json());

app.use(cors());

// database connection with mongoosedb

mongoose.connect("mongodb+srv://abhishek88414:abhishek233@cluster0.pg8tz4y.mongodb.net/ecommrance");

//API creation

app.get("/", (req, res) => {
    res.send("Express App is Running")
})

// Image storage engine

const storage = multer.diskStorage({

    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })
// Creating imagem ind point

app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

//schema for product creating


const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});


// Shema creating for user model 


const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }

})

// Creating endpoint of user registions

app.post('/signup', async (req, res) => {

    let check = await Users.findOne({ email: req.body.email })

    if (check) {
        return res.status(400).json({ success: false, error: "exiting user found with email id and addresss" })
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })

})

// Creating endpoint for user login

app.post('/login', async (req, res) => {

    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passwordCompare = req.body.password === user.password;

        if (passwordCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, errors: "wrong password" })
        }
    }
    else {
        res.json({ success: false, errors: "worng Email Id" })
    }

})



app.post('/addproduct', async (req, res) => {
    let products = await Product.find({})
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }

    const newProduct = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        date: req.body.date, // Assuming you're passing the date in the request body
        available: req.body.available // Assuming you're passing the availability in the request body
    });

    console.log(newProduct);
    await newProduct.save();
    console.log("saved");

    res.json({
        success: true,
        name: req.body.name,
    });



});








app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id })
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.names
    });
})


// creating API for getting product

app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Product Fetched");
    res.send(products);
}
)



// creating endpoint of api

app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollections = products.slice(1).slice(-8);
    console.log("New collection Fetched");
    res.send(newcollections);
})

app.get('/popularinwoman', async (req, res) => {
    let products = await Product.find({ category: "women" });
    let popularinwoman = products.slice(0, 4);
    console.log("Popular in woman Fetched");
    res.send(popularinwoman);
})

// Creating middelware to featch user

const featchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "please authenicate using valid token" })
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        }
        catch (error) {
            res.status(401).send({ errors: "Plz authentications" })
        }
    }
}


// Creating endpoint for adding to cart
app.post('/addtocart',featchUser, async (req, res) => {
    console.log("Added",req.body.itemId);
    let userData=await Users.findOne({_id:req.user.id}) ;
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})

//Creating endpoint for remove product from cartdata

app.post('/removefromCart',featchUser,async(req,res)=>{

    console.log("remove",req.body.itemId);
    let userData=await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("remove")
})

// creating endpoint for getting cartdata
app.post('/getcart',featchUser,async (req,res)=>{
    console.log("GetCart")
    let userData=await Users.findOne({_id:req.user.id});
    res.json(userData.cartData)
})




app.listen(port, (error) => {
    if (!error) {
        console.log("server is running " + port)
    }
    else {
        console.log("Error :" + error)
    }
})

