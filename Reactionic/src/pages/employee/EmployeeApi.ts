import Employee from "./Employee";

export async function searchEmployees (){
    let response = await fetch('http://localhost:8080/api/employees',{
    "method": 'GET',
    "headers":{"Content-type": 'application/json'}
    })
    return await response.json();
/*
    if(!localStorage['employees']){
    localStorage['employees'] = '[]';
    }
    let employees = localStorage['employees'];
    employees = JSON.parse(employees);
    return employees;
*/
}

export async function removeEmployee(id:string){
    await fetch(`http://localhost:8080/api/employees/${id}`,{
    "method": 'DELETE',
    "headers":{"Content-type": 'application/json'}
    })
}

export async function saveEmployee(employee:Employee){
    await fetch('http://localhost:8080/api/employees',{
    "method": 'POST',
    "body": JSON.stringify(employee),
    "headers":{"Content-type": 'application/json'}
    })
}

export async function searchEmployeeById(id:string){
    let response = await fetch(`http://localhost:8080/api/employees/${id}`,{
    "method": 'GET',
    "headers":{"Content-type": 'application/json'}
    })
    return await response.json();
}