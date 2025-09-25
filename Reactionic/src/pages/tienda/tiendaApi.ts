
export async function searchProducts (){
    let response = await fetch('http://localhost:8080/api/products',{
    "method": 'GET',
    "headers":{"Content-type": 'application/json'}
    })
    const data = await response.json();
    console.log('Raw products data from API:', data);
    return data;
}
export async function searchCustomers (){
    let response = await fetch('http://localhost:8080/api/customers',{
    "method": 'GET',
    "headers":{"Content-type": 'application/json'}
    })
    return await response.json();
}
export async function removeProduct(id:string){
    // TODO
    // await fetch(`http://localhost:8080/api/products/${id}`,{
    // "method": 'DELETE',
    // "headers":{"Content-type": 'application/json'}
    // })
}
export async function saveProduct(carrito:any){
    await fetch('http://localhost:8080/api/ventas',{
    "method": 'POST',
    "body": JSON.stringify(carrito),
    "headers":{"Content-type": 'application/json'}
    })
}
