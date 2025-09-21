import Supplier from "./Supplier";

export async function searchSuppliers (){
    let response = await fetch('http://localhost:8080/api/suppliers',{
    "method": 'GET',
    "headers":{"Content-type": 'application/json'}
    })
    return await response.json();
/*
    if(!localStorage['suppliers']){
    localStorage['suppliers'] = '[]';
    }
    let suppliers = localStorage['suppliers'];
    suppliers = JSON.parse(suppliers);
    return suppliers;
*/
}

export async function removeSupplier(id:string){
    await fetch(`http://localhost:8080/api/suppliers/${id}`,{
    "method": 'DELETE',
    "headers":{"Content-type": 'application/json'}
    })
}

export async function saveSupplier(supplier:Supplier){
    await fetch('http://localhost:8080/api/suppliers',{
    "method": 'POST',
    "body": JSON.stringify(supplier),
    "headers":{"Content-type": 'application/json'}
    })
}

export async function searchSupplierById(id:string){
    let response = await fetch(`http://localhost:8080/api/suppliers/${id}`,{
    "method": 'GET',
    "headers":{"Content-type": 'application/json'}
    })
    return await response.json();
}