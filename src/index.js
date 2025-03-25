document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imageContainer = document.getElementById("dog-image-container");
    const breedList = document.getElementById("dog-breeds");
    const dropdown = document.getElementById("breed-dropdown");
    let breeds = []; 

    // Fetching and displaying images
    fetch(imgUrl)
        .then((response) => response.json())
        .then((data) => {
            data.message.forEach((imgSrc) => {
                const img = document.createElement("img");
                img.src = imgSrc;
                img.style.width = "200px";
                img.style.margin = "10px";
                imageContainer.appendChild(img);
            });
        });

    // Fetching and displaying breeds
    fetch(breedUrl)
        .then((response) => response.json())
        .then((data) => {
            breeds = Object.keys(data.message); // Extract breed names
            displayBreeds(breeds);
        });

    // displaying breeds in the <ul>
    function displayBreeds(breedArray) {
        breedList.innerHTML = ""; // Clear previous list
        breedArray.forEach((breed) => {
            const li = document.createElement("li");
            li.textContent = breed;
            li.addEventListener("click", () => {
                li.style.color = "blue"; // Change color on click
            });
            breedList.appendChild(li);
        });
    }

    // Filtering breeds based on dropdown selection
    dropdown.addEventListener("change", (event) => {
        const selectedLetter = event.target.value;
        const filteredBreeds = breeds.filter((breed) =>
            breed.startsWith(selectedLetter)
        );
        displayBreeds(filteredBreeds);
    });
});
