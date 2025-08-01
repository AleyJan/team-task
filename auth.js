function showAlert(message, type = "warning") {
  const alertBox = document.getElementById("custom-alert");
  alertBox.textContent = message;
  alertBox.className = `alert alert-${type} position-fixed`;
  alertBox.classList.remove("d-none");

  setTimeout(() => {
    alertBox.classList.add("d-none");
  }, 2500);
}



// Register User
function registerUser(e) {
  e.preventDefault();
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if already registered
  const alreadyExists = users.find(u => u.email === email);
  if (alreadyExists) {
    sessionStorage.setItem("loginMessage", "This email is already registered. Please login.");
    sessionStorage.setItem("alertType", "warning");
    window.location.href = "login.html";

    return;
  }

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
  sessionStorage.setItem("loginMessage", "Registered successfully! Please login.");
  window.location.href = "login.html";

}

// Login User
function loginUser(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("loginSuccess", "true");  // 🔸 Flag for showing alert
    window.location.href = "index.html";
  } else {
    document.getElementById("login-alert").innerHTML = `
      <div class="alert alert-danger" role="alert">
        You are not registered. Please register first.
      </div>`;
    setTimeout(() => {
      window.location.href = "register.html";
    }, 2000);
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  showAlert("You are now logged out.","success")

  window.location.href = "login.html";
}

function checkLoginSuccess() {
  if (localStorage.getItem("loginSuccess") === "true") {
    showAlert("Login successful!", "success");
    localStorage.removeItem("loginSuccess"); // 🔸 So it doesn't show again
  }
}
