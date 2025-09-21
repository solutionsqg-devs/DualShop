
export async function searchVentas (){
    let response = await fetch('http://localhost:8080/api/ventas',{
    "method": 'GET',
    "headers":{"Content-type": 'application/json'}
    })
    return await response.json();
}
