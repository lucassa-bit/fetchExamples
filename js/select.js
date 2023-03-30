'use strict'
const selectForm = document.querySelector("#course");

async function getAllCourse() {
    await fetchLogin();

    const coursesRequest = await fetch("https://test-matricula.herokuapp.com/api/course", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
    });
    const courses = await coursesRequest.json();

    for (let index = 0; index < courses.length; index++) {
        const element = courses[index];

        selectForm.innerHTML += `<option value="${element.name}">${element.name}</option>`;
    }
}


async function fetchLogin() {
    const keys = ["login", "password"];
    const toJson = { login: "Admin", password: "Admin" };
    const response = await fetch("https://test-matricula.herokuapp.com/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(toJson)
    });

    const token = await response.text();
    localStorage.setItem('token', "Bearer " + token);

    const responseMe = await fetch("https://test-matricula.herokuapp.com/api/user/me", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
    });

    const jsonUser = await responseMe.json()
    console.log(jsonUser);
}


async function fetchStudentPost(course) {
    const value = await fetch(`https://test-matricula.herokuapp.com/api/user/student?course=${course}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
    });

    const values = await value.json();

    for (let index = 0; index < values.length; index++) {
        const element = values[index];

        document.querySelector("form").innerHTML += `<p> ${element.name} - ${element.id_number} </p>`;
    }
} 

document.querySelector("#teste").addEventListener("click", () => {
    fetchStudentPost(selectForm.value);
})

getAllCourse();