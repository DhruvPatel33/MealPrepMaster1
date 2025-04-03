document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (localStorage.getItem(email)) {
    const user = JSON.parse(localStorage.getItem(email));
    if (user.password === password) {
      // Save the logged-in user for later use
      localStorage.setItem("currentUser", JSON.stringify(user));
      // Redirect to the homepage
      window.location.href = "homepage.html";
    } else {
      alert("Invalid password!");
    }
  } else {
    alert("User not found!");
  }
});
