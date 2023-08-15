
// import the model
const Product=require('../models/productModel')
const {getPostData}=require('../utils/utils')



//function to fetch all the products from the database/file
// @route GET /api/products
 async function getAllProducts(req,res){
    try {
        const products=await Product.findAll() 

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(products));
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message:message.error}));
    }
}


// controller to get single product
// GET /api/products/:id

 async function getProductById(req,res,id){
    try {
        const product=await Product.findById(id) 

        if(!product){
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message:"No product found"}));
        }else{
             res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(product));
        }
       
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message:error.message}));
    }
}

// controller to create product
// POST /api/products
async function createProduct(req,res){
    try {
        
        const body=await getPostData(req)
        const {name,description,price}=JSON.parse(body);
        const newProduct=await Product.create(
                {
                    name,
                    description,
                    price
                }
            ); 
        res.writeHead(201,{'Content-Type':'application/json'});
        return  res.end(JSON.stringify(newProduct))
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message:error.message}));
    }
}



// controller to update product
// PUT /api/products/:id
async function updateProduct(req,res,id){
    try {
        
        const product=await Product.findById(id);

        if(!product){
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message:"No product found"}));
        }else{
            const body=await getPostData(req)
            const {name,description,price}=JSON.parse(body);
            const updatedProduct=await Product.update(id,
                    {
                        name: name || product.name,
                        description: description || product.description,
                        price: price || product.price
                    }
                ); 
            res.writeHead(200,{'Content-Type':'application/json'});
            return  res.end(JSON.stringify(updatedProduct))
        }
        
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message:error.message}));
    }
}


// controller to get delete product
// DELETE /api/products/:id

 async function deleteProduct(req,res,id){
    try {
        const product=await Product.findById(id) 

        if(!product){
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message:"No product found"}));
        }else{
            await Product.remove(id)
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message:`Product with ${id} has been removed`}));
        }
       
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message:error.message}));
    }
}

module.exports={
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}

