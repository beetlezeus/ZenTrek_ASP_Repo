
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch the number of reflections from the server
        const responseR = await fetch('dailyReflections/total');
        const dataR = await responseR.json();
        const numberOfReflections = dataR.numberOfReflections;

        const responseN = await fetch('nutrition/total');
        const dataN = await responseN.json();
        const numberOfNutriLogs = dataN.numberOfNutriLogs;



        // Log or use the number of reflections as needed
        console.log('Number of Reflections:', numberOfReflections);

        // Log or use the number of nutri logs as needed
        console.log('Number of nutri logs:', numberOfNutriLogs);



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
            await numberToBadge(numberOfNutriLogs, numbers[i], img);
            nutritionContainer.appendChild(img);
        }

        // Load SVGs for reflections streak
        for (let i = 0; i < numbers.length; i++) {
            let img = document.createElement("img");
            img.src = `/resources/${reflectionSVGs[i]}${numbers[i]}.svg`;
            img.alt = `Reflection SVG ${i + 1}`;
            await numberToBadge(numberOfReflections, numbers[i], img);
            reflectionContainer.appendChild(img);
        }
    } catch (error) {
        console.error('Error fetching reflections:', error);
    }
});

async function numberToBadge(number, numbers, img) {
    if (number >= numbers) {
        img.classList.add("new-badge"); // Add CSS class for obtained badge
    }
}
