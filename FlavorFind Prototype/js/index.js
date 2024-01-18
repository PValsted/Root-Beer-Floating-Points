document.addEventListener("DOMContentLoaded", function () {
  // Wait for the DOM to be fully loaded

  function generateRecipe() {
    const apiKey = "be875d51bd4444edac53deff89f0a0c2";
    const complexSearchEndpoint = "https://api.spoonacular.com/recipes/complexSearch";
    const analyzedInstructionsEndpoint = "https://api.spoonacular.com/recipes/{id}/analyzedInstructions";
    const cuisineSelect = document.getElementById("cuisineType");
    const selectedCuisine = cuisineSelect.value;
    const number = 10; // You can adjust this number as needed for complexSearch

    // Construct the URL for complexSearch to get a list of recipes for the selected cuisine
    const complexSearchUrl = `${complexSearchEndpoint}?apiKey=${apiKey}&cuisine=${selectedCuisine}&number=${number}`;

    // Make the GET request to complexSearch
    fetch(complexSearchUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Check if there are results
        if (data.results && data.results.length > 0) {
          // Randomly select one recipe from the list
          const randomIndex = Math.floor(Math.random() * data.results.length);
          const randomRecipe = data.results[randomIndex];

          // Log the selected recipe to the console
          console.log("Selected Recipe:", randomRecipe);

          // Use the random recipe to display information or perform other actions
          const recipeContainer = document.getElementById("recipeContainer");
          const recipeTitle = document.getElementById("recipe-title");
          const instructions = document.getElementById("instructions");
          const recipeImageContainer = document.getElementById("recipe-image-container");

          recipeTitle.textContent = randomRecipe.title;
          instructions.textContent = randomRecipe.instructions || "No instructions available.";

          // Display the recipe image
          const recipeImage = document.createElement("img");
          recipeImage.src = randomRecipe.image;
          recipeImage.alt = randomRecipe.title;
          recipeImageContainer.innerHTML = "";
          recipeImageContainer.appendChild(recipeImage);

          // Get analyzed instructions for the selected recipe
          const analyzedInstructionsUrl = `${analyzedInstructionsEndpoint.replace("{id}", randomRecipe.id)}?apiKey=${apiKey}&stepBreakdown=true`;

          // Make the GET request to analyzedInstructions
          return fetch(analyzedInstructionsUrl);
        } else {
          console.log("No recipes found for the selected cuisine.");
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(analyzedInstructionsData => {
        // Log the analyzed instructions to the console
        console.log("Analyzed Instructions:", analyzedInstructionsData);

        // Use the analyzed instructions data as needed
        const stepsContainer = document.getElementById("steps-container");

        if (analyzedInstructionsData.length > 0 && analyzedInstructionsData[0].steps) {
          const steps = analyzedInstructionsData[0].steps;

          // Clear existing content
          stepsContainer.innerHTML = "";

          // Append each step to the container
          steps.forEach(step => {
            const stepParagraph = document.createElement("p");
            stepParagraph.textContent = `Step ${step.number}: ${step.step}`;
            stepsContainer.appendChild(stepParagraph);
          });
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  // Attach the generateRecipe function to the button click event
  document.getElementById("generateButton").addEventListener("click", generateRecipe);
});
