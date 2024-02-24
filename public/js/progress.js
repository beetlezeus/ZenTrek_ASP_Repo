
let sketch1 = function(p5) {
    let canvasDays;

    p5.setup = function() {
        let containerDays = document.getElementById("dayContainer");

        // Get the width and height of the container
        let containerWidth = containerDays.offsetWidth;
        let containerHeight = containerDays.offsetHeight;

        // Create a canvas with the same size as the container
        canvasDays = p5.createCanvas(containerWidth, containerHeight); 

        // Move the canvas inside the container
        canvasDays.parent('dayContainer');
    }

    p5.draw = function() {
        dayBadges(canvasDays);
    }

    p5.setCanvasSize = function(width, height) {
        // Set canvas size based on container size
        p5.resizeCanvas(width, height);
    }

    // Listen for window resize event
    window.addEventListener('resize', function() {
        let containerDays = document.getElementById("dayContainer");
        p5.setCanvasSize(containerDays.offsetWidth, containerDays.offsetHeight);
    });

    // Logic for drawing and creating the day streak badges 
    function dayBadges(canvas) {
        let streakDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

        // buffer is 1% of the canvas, on each side of the badge
        let buffer = canvas.width * 0.1;

        // badge slot is a square that will contain the badge
        let badgeSlot = canvas.width / 7;

        // badge area is the horizontal area the badge will occupy
        let badgeArea = badgeSlot - 2 * buffer;

        let badgeRadius = badgeArea / 2;

        let yPos = canvas.height / 2;

        // colors to use later when implementing streak logic
        p5.fill(0, 220, 70);
        // fill(200, 19, 40);
        // fill(180, 200, 190);
        p5.strokeWeight(1);
        p5.stroke(108, 70, 250);

        for (let i = 0; i < streakDays.length; i++) {
            p5.push();
            let xPos = buffer + (badgeSlot * i) + badgeRadius; // Calculate the x-position of the ellipse center
            p5.ellipse(xPos, yPos, badgeArea * 2);

            p5.textAlign(p5.CENTER, p5.CENTER); // Align text to the center of the ellipse
            p5.textSize(badgeSlot * 0.4); // Adjust text size

            // Draw the streak day letter at the center of the ellipse
            p5.fill(255); // Set text color to white
            p5.text(streakDays[i], xPos, yPos);
            p5.pop();
        }


        function streakLogic (timestamp){
            
        }
    }



    // Code for updating the current streak value text underneath the day badges.
    let currentStreakValue = 1; // example value, replace it with the data from the database

    // DOMContentLoaded event listener to ensure the code runs after the DOM is fully loaded
        document.addEventListener("DOMContentLoaded", function() {
        // Get the span element by its id
        let currentStreakSpan = document.getElementById("currentStreak");
        let finish = document.getElementById("finalS");

        let oneDay = false;
        // value that will place the final 's' if the number of days if higher than one.
        let final = 's.';

        if(currentStreakValue === 1){
            oneDay = true;
            final = '.'
        }
        
        // Update the content of the span element with the current streak value
        currentStreakSpan.textContent = currentStreakValue;
        finish.textContent = final;

    });

};

let sketch2 = function(p5) {
    let canvasStreaks;
    let activityArray = [];

    p5.setup = function() {
        let containerStreaks = document.getElementById("streakContainer");

        // Get the width and height of the container
        let containerWidth = containerStreaks.offsetWidth;
        let containerHeight = containerStreaks.offsetHeight;

        // Create a canvas with the same size as the container
        canvasStreaks = p5.createCanvas(containerWidth, containerHeight); 

        // Move the canvas inside the container
        canvasStreaks.parent('streakContainer');

        // Set the canvas height to match the container height
        p5.resizeCanvas(containerWidth, containerHeight);

        fetch('userDetails/activities')
            .then(response => response.json())
            .then(data => {
                // Update the activityArray with the fetched data

                console.log(data);
                activityArray = data;
            })
            .catch(error => console.error('Error fetching activity array:', error));

        
    }

    p5.draw = function() {
        streak(activityArray, canvasStreaks); // Call the streak function to draw the rectangles
    }

    // Listen for window resize event
    window.addEventListener('resize', function() {
        resizeCanvasAndRedraw();
    });

    // Function to resize canvas and redraw elements
    function resizeCanvasAndRedraw() {
        let containerStreaks = document.getElementById("streakContainer");
        let containerWidth = containerStreaks.offsetWidth;
        let containerHeight = containerStreaks.offsetHeight;

        // Resize canvas
        canvasStreaks.resize(containerWidth, containerHeight);

        // // Redraw elements
        p5.redraw();
    }


    function streak(activities, canvas) {
        let chosenActivities = [];
        let daysArray = [];
        let activityText = [];
        // let containerStreaks = document.getElementById("streakContainer");
        // let containerHeight = containerStreaks.offsetHeight; // Get the container's height
        // let containerWidth = containerStreaks.offsetWidth; // Get the container's width
    
        activities.forEach(item => {
            if (item.value === true) {
                chosenActivities.push(item.name);
                daysArray.push(item.days);
                activityText.push(item.name);
            }
        });

    

        // buffer is 1% of the canvas, on each side of the badge
        let bufferX = canvas.width * 0.05;
        let bufferY = canvas.height * 0.05;

        // number of rows according to the number of activities selected
        let rows = chosenActivities.length;

        let maxDays = Math.max(...daysArray); // Find the maximum number of days among all categories


        let rowHeight = (canvas.height - bufferY * 2) / rows; 
        let rowWidth = canvas.width - bufferY * 2;

        // define max text size so it doesn't go higher  than 26 regardless off the screen size
        let maxTextHeight = 26;
        let textHeight = rowHeight * 0.2;

        if(textHeight > maxTextHeight){
            textHeight = maxTextHeight;
        }



        let boxHeight = rowHeight - textHeight;
        let boxWidth = rowWidth / maxDays;


        for(let i=0; i<rows; i++){
            for (let j = 0; j < daysArray[i]; j++){
                p5.push();
                p5.fill(255);
                p5.noStroke();

                p5.rect(bufferX + boxWidth*j, bufferY + rowHeight * i, boxWidth - bufferX/2, boxHeight - textHeight, 8);

                p5.pop();
            }
            p5.textSize(textHeight);
            // p5.fill(0);
            p5.textAlign(p5.CENTER, p5.BASELINE);
            p5.text(activityText[i],  rowWidth /2, rowHeight * i + boxHeight + textHeight);
        }

    }
    
};




new p5(sketch1);
new p5(sketch2);






