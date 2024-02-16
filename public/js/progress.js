function setup() {
    let containerDays = document.getElementById("dayContainer");

    // Get the width and height of the container
    let containerWidth = containerDays.offsetWidth;
    let containerHeight = containerDays.offsetHeight;

    // Create a canvas with the same size as the container
    canvasDays = createCanvas(containerWidth, containerHeight); // Remove 'var' here
    console.log(canvasDays.height);

    // Move the canvas inside the container
    canvasDays.parent('dayContainer');
}


function draw(){
    dayBadges(canvasDays);
}


function setCanvasSize(width, height) {
    // Set canvas size based on container size
    resizeCanvas(width, height);
}

// Listen for window resize event
window.addEventListener('resize', function() {
    let containerDays = document.getElementById("dayContainer");
    setCanvasSize(containerDays.offsetWidth, containerDays.offsetHeight);
});


// Chart.js code
document.addEventListener('DOMContentLoaded', function () {
    const DATA_COUNT = 7;

    let ctx = document.getElementById("myChart").getContext('2d');
    let moodChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ],
            datasets: [{
                label: 'Logged mood',
                data: [3, 1, 5, 2, 3, 5, 4], // Replace this with actual data from the database
                lineTension: 0.3,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            scales: {
                y: {
                    min: 1,   // Set the minimum value of the y-axis
                    max: 5,   // Set the maximum value of the y-axis
                    ticks: {
                        stepSize: 1,
                        precision: 0,
                    }
                }
            },
            elements: {
                line: {
                    borderColor: function (context) {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;

                        if (!chartArea) {
                            // This case happens on initial chart load
                            return;
                        }
                        return getGradient(ctx, chartArea);
                    },
                    borderWidth: 2
                }
            }
        },
    });
});

let width, height, gradient;
function getGradient(ctx, chartArea) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, 'red'); // Replace with actual color or use Utils.CHART_COLORS.red
        gradient.addColorStop(0.5, 'yellow'); // Replace with actual color or use Utils.CHART_COLORS.yellow
        gradient.addColorStop(1, 'green'); // Replace with actual color or use Utils.CHART_COLORS.green
    }
    return gradient;
}



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
    fill(0, 220, 70);
    // fill(200, 19, 40);
    // fill(180, 200, 190);
    strokeWeight(1);
    stroke(108, 70, 250);

    for (let i = 0; i < streakDays.length; i++) {
        push();
        let xPos = buffer + (badgeSlot * i) + badgeRadius; // Calculate the x-position of the ellipse center
        ellipse(xPos, yPos, badgeArea * 2);

        textAlign(CENTER, CENTER); // Align text to the center of the ellipse
        textSize(badgeSlot * 0.4); // Adjust text size

        // Draw the streak day letter at the center of the ellipse
        fill(255); // Set text color to white
        text(streakDays[i], xPos, yPos);
        pop();
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

    if(currentStreakValue == 1){
        oneDay = true;
        final = '.'
    }
    // Update the content of the span element with the current streak value
    currentStreakSpan.textContent = currentStreakValue;
    finish.textContent = final;

});



///




