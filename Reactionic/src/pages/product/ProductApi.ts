import Product from "./Product";

export async function searchProducts (){
    let response = await fetch('http://localhost:8080/api/products',{
    "method": 'GET',
    "headers":{"Content-type": 'application/json'}
    })
    return await response.json();
}

export async function removeProduct(id:string){
    await fetch(`http://localhost:8080/api/products/${id}`,{
    "method": 'DELETE',
    "headers":{"Content-type": 'application/json'}
    })
}

export async function saveProduct(product:Product){
    await fetch('http://localhost:8080/api/products',{
    "method": 'POST',
    "body": JSON.stringify(product),
    "headers":{"Content-type": 'application/json'}
    })
}

export async function searchProductById(id:string){
    let url = 'http://localhost:8080/api/products/'+id
    let response = await fetch(url,{
    "method": 'GET',
    "headers":{"Content-type": 'application/json'}
    })
    return await response.json();
}