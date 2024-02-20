document.addEventListener("DOMContentLoaded", function() {
    let nutritionContainer = document.getElementById("nutritionContainer");
    let reflectionContainer = document.getElementById("reflectionsContainer");

    let numbers = [7, 15, 30, 100, 365];
    let nutritionSVGs = ["apple", "pizza", "noodles", "steak", "cake"];
    let reflectionSVGs = ["quill", "sheet", "notebook", "book", "library"];

    // Load SVGs for nutrition streak
    for (let i = 0; i < numbers.length; i++) {
        let img = document.createElement("img");
        img.src = `/resources/${nutritionSVGs[i]}${numbers[i]}.svg`;
        img.alt = `Nutrition SVG ${i + 1}`;
        nutritionContainer.appendChild(img);
    }

    // Load SVGs for reflections streak
    for (let i = 0; i < numbers.length; i++) {
        let img = document.createElement("img");
        img.src = `/resources/${reflectionSVGs[i]}${numbers[i]}.svg`;
        img.alt = `Reflection SVG ${i + 1}`;
        reflectionContainer.appendChild(img);
    }
});