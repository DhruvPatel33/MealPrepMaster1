document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    if (localStorage.getItem(email)) {
      alert("User already exists!");
    } else {
      const user = {
        name: name,
        email: email,
        password: password,
        favorites: [],
      };
      localStorage.setItem(email, JSON.stringify(user));
      localStorage.setItem("currentUser", JSON.stringify(user));
      // Redirect to the homepage after registration
      window.location.href = "homepage.html";
    }
  });
