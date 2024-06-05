const formOpenBtn = document.querySelector("#form-open"),
    home = document.querySelector(".home"),
    formContainer = document.querySelector(".form_container"),
    formCloseBtn = document.querySelector(".form_close"),
    signupBtn = document.querySelector("#signup"),
    loginBtn = document.querySelector("#login"),
    pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

pwShowHide.forEach((icon) => {
    icon.addEventListener("click", () => {
        let getPwInput = icon.parentElement.querySelector("input");
        if (getPwInput.type === "password") {
            getPwInput.type = "text";
            icon.classList.replace("uil-eye-slash", "uil-eye");
        } else {
            getPwInput.type = "password";
            icon.classList.replace("uil-eye", "uil-eye-slash");
        }
    });
});

signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.remove("active");
});

const users = []

function inputValue(id) {
    return document.getElementById(id).value
}

function showOutput(output) {
    document.getElementById("output").innerHTML = output
}

const getRandomId = () => Math.random().toString(36).slice(2)

function handlesignUp() {
    const signupForm = document.getElementById("signUpForm")



    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


    let email = inputValue("emailSignUp")

    let password = inputValue("passwordSignUp")

    if (password.length < 6) {
        showNotification("Minimun length of password is 6", "error")
        return
    }

    if (!emailRegex.test(email) || !email || !password) {
        showNotification("Enter email and password correctly", "error")
        return
    }

    let user = {
        email,
        password,
        uid: getRandomId(),
        status: "active",
        createdAt: new Date()

    }

    const userFind = users.find(user => user.email === email)

    if (userFind) {
        showNotification("User already registered", "error")
        return
    }
    else {
        users.push(user)
        showNotification("Successfully Registered", "success")
        signupForm.reset()
    }
    console.log(users)
}

function handleLogin() {

    const loginForm = document.getElementById("loginForm")

    let email = inputValue("emailLogin")

    let password = inputValue("passwordLogin")

    if (!email || !password) {
        showNotification("Enter email and password correctly", "error")
    }

    const checkUser = users.find(user => user.email === email)

    if (checkUser) {
        const checkPassword = users.find(user => user.password === password)

        if (checkPassword) {
            showNotification("Successfully LoggedIn", "success")
            // loginForm.reset()
            // Hide the login form and show the blank screen
            home.classList.remove("show");
            blankScreen.style.display = "flex";
            header.style.display = "none"
            // document.getElementById("emailAfterLogin").innerHTML = email
        } else {
            showNotification("Incorrect Password entered", "error")
        }
    } else {
        showNotification("Incorrect Email entered", "error")
    }
}

let todos = []

function createTodo() {
    let title = inputValue("title")

    let description = inputValue("description")

    let date = inputValue("date")

    const todo = {
        title,
        description,
        date,
        id: getRandomId(),
        status: "incomplete",
        createdAt: new Date()
    }
    todos.push(todo)

    console.log(todos)
}

function readTodo() {
    console.log(todos)
    // const userId = users.find(user => user.id)
    // console.log(userId)
}

function updateTodo() {
    let name = prompt("Enter the title whose description you want to update")

    let toUpdate = prompt("Enter the text you wanted to appear")

    const updatedTodo = todos.map((todo, i) => {
        if (todo.title === name) {
            return { ...todo, status: toUpdate }
        } else {
            return todo
        }
    })

    todos = updatedTodo
    console.log(todos)
}

function showTable() {
    if (!users.length) {
        showNotification("No single user is registered", "error")
        return
    }

    let tableStarting = '<div class="table-responsive"><table class="table">'
    let tableEnding = '</table></div>'

    let tableHead = '<thead><tr><th scope="col"#</th><th scope="col">Title</th><th scope="col">Description</th><th scope="col">Date</th><th scope="col">Status</th><th scope="col">ID</th></tr></thead>'

    let tableBody = ""

    for (let i = 0; i < todos.length; i++) {
        tableBody += '<tr><th scope="row">' + (i + 1) + '</th><td>' + todos[i].title + '</td><td>' + todos[i].description + '</td><td>' + todos[i].date + '</td><td>' + todos[i].status + '</td><td>' + todos[i].id + '</td></tr>'
    }

    let table = tableStarting + tableHead + '<tbody>' + tableBody + '</tbody>' + tableEnding

    showOutput(table)
}

function deleteTodo() {
    let titleForDelete = prompt("Enter the title of object which you want to delete")

    const filteredTodo = todos.filter(todo => todo.title !== titleForDelete)

    todos = filteredTodo
}


function showNotification(message, type) {

    let bgColor

    switch (type) {
        case 'success':
            bgColor = "linear-gradient(to right, #1D976C, #93F9B9)"
            break
        case 'error':
            bgColor = "linear-gradient(to right, #93291e, #ed213a)"
            break
        default:
            bgColor = "#000"
    }

    Toastify({
        text: message,
        duration: 3000,
        // destination: "https://github.com/apvarun/toastify-js",
        // newWindow: true,
        // close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: bgColor,
        },
        onClick: function () { } // Callback after click
    }).showToast();
}