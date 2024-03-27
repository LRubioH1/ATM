const accounts = [
    { mail: "princesaamanecer700325@gmail.com", saldo: 850, password: "Adominguez700325" },
    { mail: "Miguel@hotmail.com", saldo: 650, password: "010203" },
    { mail: "jhgutierrez@yahoo.com.mx", saldo: 800, password: "guthj100581" },
    { mail: "LiRu76@gmail.com", saldo: 550, password: "x1y2z3w8v9" },
];

function validateLogin(event) {
    event.preventDefault();
    
    const user = document.getElementById("userInput").value;
    const password = document.getElementById("inputPassword").value;

    let flag = false;
    let loggedInAccount;
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].mail === user && accounts[i].password === password) {
            flag = true;
            loggedInAccount = accounts[i];
            break;
        }
    }
    
    if (flag) {
        localStorage.setItem("loggedInAccount", JSON.stringify(loggedInAccount)); // Almacenar información de la cuenta
        window.location.href = "home.html"; // Redirigir al usuario a la página de inicio
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
}

function checkBalance() {
    const loggedInAccount = JSON.parse(localStorage.getItem("loggedInAccount"));
    alert("Saldo actual: $" + loggedInAccount.saldo);
}

function depositAmount() {
    const loggedInAccount = JSON.parse(localStorage.getItem("loggedInAccount"));
    const amount = parseFloat(prompt("Por favor, ingrese el monto a ingresar:"));
    
    if (isNaN(amount) || amount <= 0) {
        alert("Ingrese un monto válido.");
        return;
    }
    
    loggedInAccount.saldo += amount;
    localStorage.setItem("loggedInAccount", JSON.stringify(loggedInAccount)); // Actualizar información de la cuenta en el almacenamiento local
    alert("Monto ingresado: $" + amount.toFixed(2) + "\nNuevo saldo: $" + loggedInAccount.saldo.toFixed(2));
}

function withdrawAmount() {
    const loggedInAccount = JSON.parse(localStorage.getItem("loggedInAccount"));
    const amount = parseFloat(prompt("Por favor, ingrese el monto a retirar:"));
    
    if (isNaN(amount) || amount <= 0 || amount > loggedInAccount.saldo || amount > 990 || loggedInAccount.saldo - amount < 10) {
        alert("Monto inválido o excede los límites.");
        return;
    }
    
    loggedInAccount.saldo -= amount;
    localStorage.setItem("loggedInAccount", JSON.stringify(loggedInAccount)); // Actualizar información de la cuenta en el almacenamiento local
    alert("Monto retirado: $" + amount.toFixed(2) + "\nNuevo saldo: $" + loggedInAccount.saldo.toFixed(2));
}

document.getElementById("loginForm").addEventListener("submit", validateLogin);

function logout() {
    localStorage.removeItem("loggedInAccount"); // Eliminar la información de la cuenta almacenada
    window.location.href = "Cierre.html"; // Redirigir al usuario a la página de logout
}