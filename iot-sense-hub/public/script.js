function showToast(message, type = "success") {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top", 
    position: "right", 
    backgroundColor: type === "success" ? "#4BB543" : "#FF3E3E",
    close: true,
    stopOnFocus: true,
  }).showToast();
}

function signup() {
  const fullName = document.getElementById("signupFullName").value.trim();
  const email = document.getElementById("signupEmail").value.trim().toLowerCase();
  const password = document.getElementById("signupPassword").value;

  if (!fullName || !email || !password) {
    showToast("Please fill in all fields.", "error");
    return;
  }

  axios.post('http://localhost:3000/insertUser', {
    fullName,
    email,
    password
  })
  .then(response => {
    if (response.status === 201 && response.data.success) {
      showToast("Sign up successful! You can now log in.", "success");
      showLogin();
    } else {
      showToast("Signup failed. Please try again.", "error");
    }
  })
  .catch(error => {
    console.error("Signup error:", error);
    showToast("Signup failed. Please try again later.", "error");
  });
}

function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}

function showLogin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

function login() {
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    showToast("Please enter email and password.", "error");
    return;
  }

  axios.post('http://localhost:3000/login', {
    email,
    password
  })
  .then(response => {
    if (response.status === 200 && response.data.success) {
      showToast("Login successful!", "success");
      setTimeout(() => {
        window.location.href = "home.html"; // redirect after short delay
      }, 1000);
    } else {
      showToast(response.data.message || "Login failed", "error");
    }
  })
  .catch(error => {
    if (error.response) {
      showToast(error.response.data.message || "Login failed", "error");
    } else {
      console.error("Login error:", error);
      showToast("Something went wrong. Try again later.", "error");
    }
  });
}

