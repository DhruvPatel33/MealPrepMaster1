document.addEventListener("DOMContentLoaded", () => {
  const savedMealsContainer = document.getElementById("saved-meals-list");
  const recipeModal = document.getElementById("recipe-modal");
  const closeModal = document.querySelector(".close-btn");
  const recipeTitle = document.getElementById("recipe-title");
  const recipeImage = document.getElementById("recipe-image");
  const recipeText = document.getElementById("recipe-text");

  function loadSavedMeals() {
    let savedMeals = JSON.parse(localStorage.getItem("savedMeals")) || [];

    if (savedMeals.length === 0) {
      savedMealsContainer.innerHTML =
        "<p>No meals saved yet. Go add some delicious meals!</p>";
      return;
    }

    savedMealsContainer.innerHTML = ""; // Clear previous content

    savedMeals.forEach((meal, index) => {
      const mealCard = document.createElement("div");
      mealCard.classList.add("meal-card");
      mealCard.innerHTML = `
              <img src="${meal.image}" alt="${meal.name}" class="meal-image">
              <h3>${meal.name}</h3>
              <button class="view-recipe-btn" data-index="${index}">View Recipe</button>
              <button class="delete-btn" data-index="${index}">Delete</button>
          `;
      savedMealsContainer.appendChild(mealCard);
    });

    // Handle View Recipe button clicks
    document.querySelectorAll(".view-recipe-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const mealIndex = event.target.getAttribute("data-index");
        const meal = savedMeals[mealIndex];

        recipeTitle.textContent = meal.name;
        recipeImage.src = meal.image;
        recipeText.textContent = meal.recipe;

        recipeModal.style.display = "block";
      });
    });

    // Handle Delete button clicks
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const mealIndex = event.target.getAttribute("data-index");
        savedMeals.splice(mealIndex, 1);
        localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
        loadSavedMeals(); // Refresh meals
      });
    });
  }

  // Close modal when clicking close button
  closeModal.addEventListener("click", () => {
    recipeModal.style.display = "none";
  });

  // Close modal when clicking outside content
  window.addEventListener("click", (event) => {
    if (event.target === recipeModal) {
      recipeModal.style.display = "none";
    }
  });

  loadSavedMeals();
});
