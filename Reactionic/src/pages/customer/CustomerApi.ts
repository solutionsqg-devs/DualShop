import Customer from "./Customer";

export async function searchCustomers (){
    let response = await fetch('http://localhost:8080/api/customers',{
    "method": 'GET',
    "headers":{"Content-type": 'application/json'}
    })
    return await response.json();
}

export async function removeCustomer(id:string){
    await fetch('http://localhost:8080/api/customers/'+id,{
    "method": 'DELETE',
    "headers":{"Content-type": 'application/json'}
    })
}

export async function saveCustomer(customer:Customer){
    await fetch('http://localhost:8080/api/customers',{
    "method": 'POST',
    "body": JSON.stringify(customer),
    "headers":{"Content-type": 'application/json'}
    })
}

export async function searchCustomerById(id:string){
    let response = await fetch(`http://localhost:8080/api/customers/${id}`,{
    "method": 'GET',
    "headers":{"Content-type": 'application/json'}
    })
    return await response.json();
}