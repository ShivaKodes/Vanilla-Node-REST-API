//importing the data
const data=require('../data/data.json')
//to generate unique ids
const {v4:uuidv4}=require('uuid');


const {writeDataToFile}=require('../utils/utils')


//function to return all the items in the database/file
const findAll=()=>{
    return new Promise((resolve, reject)=>{
        resolve(data)
    })
}

// function to find specific item with given id from the data 
const findById=(id)=>{
    return new Promise((resolve, reject)=>{

        const product=data.find((product)=>product.id===id)
        resolve(product)
    })
}


// to create new product in the database/file
const create=(product)=>{
     return new Promise((resolve, reject)=>{
        const newProduct={id:uuidv4(),...product}
        data.push(newProduct)
        writeDataToFile('./data/data.json',data)
        resolve(newProduct)
    })
}


// to update an item with specific id
const update=(id,product)=>{
     return new Promise((resolve, reject)=>{
        const index=data.findIndex((product)=>product.id===id)
        data[index]={id,...product}
        writeDataToFile('./data/data.json',data);
        resolve(data[index])
    })
}


// to remove an item with specific id
const remove=(id)=>{
     return new Promise((resolve, reject)=>{
        const newProduct=data.filter((product)=>product.id!==id)
        writeDataToFile('./data/data.json',newProduct);
        resolve()
    })
}



//export the functions
module.exports={
    findAll,
    findById,
    create,
    update,
    remove
}