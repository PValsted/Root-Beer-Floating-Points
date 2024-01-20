
document.addEventListener("DOMContentLoaded", function () {

  //This is the main function responsible for generating and displaying a random recipe
  function generateRecipe(){
    //These variables store the API key and the endpoints for Spoonacular API
    const apiKey = "be875d51bd4444edac53deff89f0a0c2";
    const complexSearchEndpoint = "https://api.spoonacular.com/recipes/complexSearch";
    const analyzedInstructionsEndpoint = "https://api.spoonacular.com/recipes/{id}/analyzedInstructions";
    const number = 1; // Only retrieving one random recipe
    const sort = "random"; // Set to random for a random recipe

    // Get the selected cuisine type from an HTML select element with the id "cuisineType."
    const cuisineSelect = document.getElementById("cuisineType");
    const selectedCuisine = cuisineSelect.value;
    
    // Get the selected intolerance
    const glutenFree = document.getElementById("glutenFree");
    const dairyFree = document.getElementById("dairyFree");
    const shellfish = document.getElementById("shellfish");
    const intolerances = [];
      if (glutenFree.checked==true)
        intolerances.push("gluten");

      if (dairyFree.checked==true)
        intolerances.push("dairy");

      if (shellfish.checked==true)
        intolerances.push("shellfish");

    const intoleranceValue = intolerances.join(",");
    console.log(glutenFree.checked, dairyFree.checked, shellfish.checked);

    // Construct the URL for complexSearch to get a random recipe with the specified cuisine with the intolerance
    const complexSearchUrl = `${complexSearchEndpoint}?apiKey=${apiKey}&number=${number}&sort=${sort}&cuisine=${selectedCuisine}&intolerance=${intoleranceValue}`;

    // Make the GET request to complexSearch
    fetch(complexSearchUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Check if there is a result
        if (data.results && data.results.length > 0) {
          // Get the first (and only) random recipe from the list
          const randomRecipe = data.results[0];

          // Log the selected recipe to the console
          console.log("Selected Recipe:", randomRecipe);

          // Use the random recipe to display information or perform other actions
          const recipeContainer = document.getElementById("recipeContainer");
          const recipeTitle = document.getElementById("recipe-title");
          const instructions = document.getElementById("instructions");
          const recipeImageContainer = document.getElementById("recipe-image-container");

          recipeTitle.textContent = randomRecipe.title;
          instructions.textContent = randomRecipe.instructions 

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
          console.log("No recipes found.");
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