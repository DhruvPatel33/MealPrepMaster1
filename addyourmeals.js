document.addEventListener("DOMContentLoaded", () => {
  // Handle form submission for adding a meal
  const form = document.getElementById("add-meal-form");
  const resultMessage = document.getElementById("result-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const mealName = document.getElementById("meal-name").value;
    const mealRecipe = document.getElementById("meal-recipe").value;
    const mealImageInput = document.getElementById("meal-image");

    if (!mealImageInput.files.length) {
      alert("Please upload a meal image!");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(mealImageInput.files[0]);
    reader.onload = function () {
      const mealImage = reader.result; // Convert image to base64

      const newMeal = {
        name: mealName,
        recipe: mealRecipe,
        image: mealImage,
      };

      let savedMeals = JSON.parse(localStorage.getItem("savedMeals")) || [];
      savedMeals.push(newMeal);
      localStorage.setItem("savedMeals", JSON.stringify(savedMeals));

      resultMessage.textContent = "Your meal has been saved successfully!";
      form.reset();
    };

    // Simulate successful meal submission
    resultMessage.textContent = "Your meal has been added successfully!";

    // Optionally, clear the form after submission
    form.reset();

    // In a real-world application, use AJAX/fetch to send form data to your server.
  });

  // Go Back Arrow - Redirect to homepage when clicked
  const goBackArrow = document.getElementById("go-back-arrow");
  goBackArrow.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "homepage.html"; // Update the URL if your homepage path differs
  });
});
