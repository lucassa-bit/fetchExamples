function fetchSecretaryPost() {
    const keys = ["name", "email", "id_number", "login", "password", "birthDate"];
    const toJson = {};

    const inputs = document.getElementsByClassName("form-text1");
    for (let index = 0; index < inputs.length; index++) {
        if (keys[index] == keys[5]) {
            const element = inputs[index].value.split('-');
            const date = `${element[2]}/${element[1]}/${element[0]}`
            toJson[keys[index]] = date;
        } else {
            toJson[keys[index]] = inputs[index].value;

        }
    }

    fetch("http://localhost:8030/api/user/secretary", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(toJson)
    }).then((value) => {
        console.log(value);
    });
}

function fetchLogin() {
    const keys = ["login", "password"];
    const toJson = {};

    const inputs = document.getElementsByClassName("form-text2");
    for (let index = 0; index < inputs.length; index++) {
        toJson[keys[index]] = inputs[index].value;
    }

    console.log(toJson);
    
    (async () => {
        const response = await fetch("https://test-matricula.herokuapp.com/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(toJson)
        });

        const token = await response.text();
        console.log(token);
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
        localStorage.setItem('cargo', jsonUser.userType);

        const user = localStorage.getItem('cargo');

        if(user === 'SECRETARY') {
            console.log('SOU SECRETARIA');
            // vai pra tela de secretaria
        } 
        else if(user === 'STUDENT') {
            // vai pra tela de estudante
        }
        else {
            // vai pra tela de professor
        }
    })();
}

function fetchStudentPost() {
    const keys = ["name", "email", "id_number", "login", "password", "birthDate", "course"];
    const toJson = {};

    const inputs = document.getElementsByClassName("form-text3");
    for (let index = 0; index < inputs.length; index++) {
        if (keys[index] == keys[5]) {
            const element = inputs[index].value.split('-');
            const date = `${element[2]}/${element[1]}/${element[0]}`
            toJson[keys[index]] = date;
        } else {
            toJson[keys[index]] = inputs[index].value;

        }
    }
    toJson[keys[6]] = document.querySelector(".select_courses").value;

    console.log(toJson);
    fetch("http://localhost:8030/api/user/teacher", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(toJson)
    }).then((value) => {
        console.log(value);
    });
}

document.querySelector(".form-btn1").addEventListener("click", fetchSecretaryPost);
document.querySelector(".form-btn2").addEventListener("click", fetchLogin);
document.querySelector(".form-btn3").addEventListener("click", fetchStudentPost);

(async () => {
    const response = await fetch("http://localhost:8030/api/course", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
    });
    const body = await response.json();
    console.log(body);

    for (let index = 0; index < body.length; index++) {
        const element = `<option value="${body[index].name}">${body[index].name}</option>`;
        document.querySelector(".select_courses").insertAdjacentHTML('beforeend', element);
    }

})();