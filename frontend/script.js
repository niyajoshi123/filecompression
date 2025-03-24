// Register User
function register() {
    let email = document.getElementById("regEmail").value;
    let username = document.getElementById("regUsername").value;
    let password = document.getElementById("regPassword").value;

    if (!email || !username || !password) {
        alert("All fields are required!");
        return;
    }
    if (!email.includes("@")) {
        alert("Enter a valid email!");
        return;
    }

    // Send data to Flask API
    fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message === "Registration Successful!") {
            showLogin();
        }
    })
    .catch(error => console.error("Error:", error));
}

// Login User
function login() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Login Successful!") {
            alert("Login successful!");
            window.location.href = "dashboard.html";  // Redirect after login
        } else {
            alert("Invalid username or password!");
        }
    })
    .catch(error => console.error("Error:", error));
}

// Enter as Guest
function guestMode() {
    alert("Entering as Guest...");
    window.location.href = "dashboard.html";
}

// Toggle Forms
function showLogin() {
    document.getElementById("registerSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
}
function showRegister() {
    document.getElementById("registerSection").style.display = "block";
    document.getElementById("loginSection").style.display = "none";
}
