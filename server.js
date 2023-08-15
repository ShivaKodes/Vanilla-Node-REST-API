const http=require("node:http");
const { getAllProducts,getProductById,createProduct,updateProduct,deleteProduct }=require('./controllers/productControllers')

const server=http.createServer(async (req,res)=>{
    //check for the url and GET method 
    if(req.url==='/api/products' && req.method==='GET'){
        getAllProducts(req,res)
        
    }else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method==='GET'){

        // /\/api\/products\/([0-9]+)/ - regex to allow user enter any numeric value to get the specific product details

        // req.url returns /api/products/:id
        // splitting it on the basic of '/'- ['','api','products','id']
        // 3-the id in the array of strings
        const id=req.url.split('/')[3];


        // call the controller with req, res and the id of entered by the user
        getProductById(req,res,id)


    }else if(req.url==='/api/products' && req.method==='POST'){
        createProduct(req,res)


    }else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method==='PUT'){
         const id=req.url.split('/')[3];

         updateProduct(req,res,id)



    }else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method==='DELETE'){
        const id=req.url.split('/')[3];
        deleteProduct(req,res,id)


    }else{

        // user hits the unknown route
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message:"Route not found"})); 
    }
})


const PORT=process.env.PORT || 3000
server.listen(PORT,()=>console.log(`sever running on ${PORT}`))