document.addEventListener("DOMContentLoaded", () => {
  const addMealBtn = document.getElementById("add-meal-btn");
  const addMealSection = document.getElementById("add-meal-section");
  const backToHomeBtn = document.getElementById("back-to-home");
  const mainContent = document.getElementById("main-content");

  // Show "Add Your Meals" section and hide other content
  addMealBtn.addEventListener("click", () => {
    addMealSection.classList.remove("hidden");
    mainContent.classList.add("hidden");
  });

  // Go back to homepage view when back arrow is clicked
  backToHomeBtn.addEventListener("click", () => {
    addMealSection.classList.add("hidden");
    mainContent.classList.remove("hidden");
  });

  // Handle form submission for adding a meal
  const form = document.getElementById("add-meal-form");
  const resultMessage = document.getElementById("result-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simulate a successful meal submission
    resultMessage.textContent = "Your meal has been added successfully!";

    // Optionally, clear the form after submission
    form.reset();
  });
});

function smoothScrollToHome() {
  // Hide all sections except home
  sections.forEach((section) => {
    if (section.id !== "home") {
      section.classList.add("hidden");
    } else {
      section.classList.remove("hidden");
    }
  });

  // Smooth scroll to top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  // Update active nav link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });
  document.querySelector('a[href="#home"]').classList.add("active");

  // Prevent default anchor behavior
  event.preventDefault();
}

// Update your existing DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  // Add click event to home link
  document
    .querySelector('a[href="#home"]')
    .addEventListener("click", smoothScrollToHome);

  // Your existing code...
});

// Go Back to Home function
function goToHome() {
  // Hide current section
  sections.forEach((section) => section.classList.add("hidden"));

  // Show home section
  document.getElementById("home").classList.remove("hidden");

  // Scroll to top smoothly
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Update your existing showSection function to include scroll to top
function showSection(sectionId) {
  sections.forEach((section) => section.classList.add("hidden"));
  document.getElementById(sectionId).classList.remove("hidden");

  // Scroll to top when changing sections
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Smooth scroll functions
function scrollToCategories() {
  const categoriesSection = document.getElementById("categories");
  if (categoriesSection) {
    categoriesSection.scrollIntoView({ behavior: "smooth" });
  }
}

function scrollToMeals(category) {
  // Filter meals by category and show the select meal section
  filterMeals(category);

  // Ensure the meal section is visible
  const mealSection = document.getElementById("select-meal");
  mealSection.classList.remove("hidden");

  // Smooth scroll to the meal section
  mealSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// Explore button event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Listen for clicks on any Explore button
  const exploreButtons = document.querySelectorAll(".explore-btn");
  const selectMealSection = document.getElementById("select-meal");

  exploreButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const category = e.currentTarget.dataset.category;
      // Filter and show meals for the selected category
      filterMeals(category);

      // Show the Select Your Meal section
      selectMealSection.classList.remove("hidden");

      // Scroll smoothly to the Select Your Meal section
      selectMealSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});

// Sample Meal Data
const meals = [
  {
    id: 1,
    name: "Grilled Chicken",
    image: "1.jpg",
    category: "keto",
    ingredients: ["Chicken Breast", "Olive Oil", "Salt", "Pepper"],
    instructions:
      "1. Preheat grill. 2. Season chicken with olive oil, salt, and pepper. 3. Grill for 6-8 minutes per side.",
  },
  {
    id: 2,
    name: "Vegetable Stir Fry",
    image: "2.jpg",
    category: "vegetarian",
    ingredients: ["Broccoli", "Carrots", "Bell Peppers", "Soy Sauce"],
    instructions:
      "1. Heat oil in a pan. 2. Add vegetables and stir fry for 5-7 minutes. 3. Add soy sauce and serve.",
  },
  {
    id: 3,
    name: "Pasta Carbonara",
    image: "3.jpg",
    category: "vegetarian",
    ingredients: ["Pasta", "Eggs", "Parmesan", "Bacon"],
    instructions:
      "1. Cook pasta. 2. Mix eggs, parmesan, and bacon. 3. Combine with pasta and serve.",
  },
  {
    id: 4,
    name: "Butter Bean Curry Wraps",
    image: "4.jpg",
    category: "vegan",
    ingredients: ["Sauté onion, garlic, ginger; add curry spices"],
    instructions:
      "1. Stir in canned butter beans, tomatoes, coconut milk; simmer. 2. Warm tortillas, fill with curry, greens, and toppings.",
  },
];

// DOM Elements
const mealList = document.getElementById("meal-list");
const mealDetails = document.getElementById("meal-details");
const sections = document.querySelectorAll("section");
const authLink = document.getElementById("authLink");

// Update profile link with current user's name
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
  authLink.innerHTML = `<i class="fas fa-user"></i> ${currentUser.name}`;
  authLink.href = "#";
  authLink.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  });
}

// Display Meals
function displayMeals(filterCategory = "all") {
  mealList.innerHTML = "";
  const filteredMeals =
    filterCategory === "all"
      ? meals
      : meals.filter((meal) => meal.category === filterCategory);
  filteredMeals.forEach((meal) => {
    const mealCard = document.createElement("div");
    mealCard.className = "meal-card";
    mealCard.innerHTML = `
      <img src="${meal.image}" alt="${meal.name}" class="meal-image">
      <h3>${meal.name}</h3>
      <button onclick="showMealDetails(${meal.id})">View Recipe</button>
    `;
    mealList.appendChild(mealCard);
  });
  resizeMealImages();
}

// Show Meal Details
function showMealDetails(mealId) {
  const meal = meals.find((m) => m.id === mealId);
  mealDetails.innerHTML = `
    <h3>${meal.name}</h3>
    <img src="${meal.image}" alt="${meal.name}" class="detail-image">
    <h4>Ingredients:</h4>
    <ul>
      ${meal.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
    </ul>
    <h4>Instructions:</h4>
    <p>${meal.instructions}</p>
  `;
  resizeDetailImage();
  showSection("prepare-meal");
}

// Show Section (hide all sections, then show the target)
function showSection(sectionId) {
  sections.forEach((section) => section.classList.add("hidden"));
  document.getElementById(sectionId).classList.remove("hidden");
}

// Filter Meals (for category buttons)
function filterMeals(category) {
  displayMeals(category);
  showSection("select-meal");
}

// Resize meal card images
function resizeMealImages() {
  const mealImages = document.querySelectorAll(".meal-image");
  mealImages.forEach((image) => {
    image.style.width = "200px";
    image.style.height = "150px";
    image.style.objectFit = "cover";
  });
}

// Resize meal detail image
function resizeDetailImage() {
  const detailImage = document.querySelector(".detail-image");
  if (detailImage) {
    detailImage.style.width = "300px";
    detailImage.style.height = "250px";
    detailImage.style.objectFit = "cover";
  }
}
