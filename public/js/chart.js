let moodData;
let dateData;

document.addEventListener('DOMContentLoaded', function () {
    const DATA_COUNT = 7;

    let ctx = document.getElementById("myChart").getContext('2d');
    let moodChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',  
            ],
            datasets: [{
                label: 'Logged mood',
                data: [], // Replace this with actual data from the database
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
                    max: 3,   // Set the maximum value of the y-axis
                    ticks: {
                        stepSize: 0.05,
                        precision: 2,
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

    // Define mapMoodsToValues function
function mapMoodsToValues(moodArray) {
    return moodArray.map(entry => entry.averageMood || 0);
}

    // Fetch mood data from server
    fetch('dailyReflections/moodData')
    .then(response => response.json())
    .then(data => {
        moodData = data.moods;
        dateData = data.dates;

        // Calculate the average mood for each day over the last 7 days
        const lastSevenDaysMoods = getLastSevenDaysMoods(moodData, dateData);

        // Map mood data to numerical values
        const mappedMoodData = mapMoodsToValues(lastSevenDaysMoods);

        // Update chart dataset with mapped mood data
        moodChart.data.datasets[0].data = mappedMoodData;
        console.log(mappedMoodData);

        // Redraw the chart
        moodChart.update();
    })
    .catch(error => {
        console.error('Error fetching mood data:', error);
    });
});

// Function to calculate the average mood for each day over the last 7 days
function getLastSevenDaysMoods(moodData, dateData) {
    const lastSevenDaysMoods = [];
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset hours to 0 for accurate comparison
    


    // Iterate through the last 7 days
    for (let i = 0; i < 7; i++) {
        const targetDate = new Date(currentDate);
        targetDate.setDate(currentDate.getDate() - i); 
        const targetDateString = targetDate.toISOString().slice(0, 10);


         // Filter mood data for the current day
         const moodsForDay = [];
         for (let j = 0; j < dateData.length; j++) {
             let date = dateData[j].slice(0, 10);
             if (date === targetDateString) {
                 moodsForDay.push(moodData[j]);
             }
            }

         console.log(targetDateString, moodsForDay);

        // Calculate the average mood for the day
        let totalMoodValue = 0; // We'll sum up the mood values for all entries
        moodsForDay.forEach(moodEntry => {
            totalMoodValue += mapMoodToValue(moodEntry); // Convert mood strings to numerical values and add them up
        });

        let averageMood;
        if (moodsForDay.length > 0) {
            averageMood = totalMoodValue / moodsForDay.length;
        } else {
            averageMood = 0;
        }

        lastSevenDaysMoods.unshift({
            date: targetDateString,
            averageMood: averageMood
        });
    }

    // console.log(lastSevenDaysMoods);
    return lastSevenDaysMoods;
}

// Function to map mood to numerical value
function mapMoodToValue(mood) {
    const moodMap = {
        'sad': 1,
        'neutral': 2,
        'happy': 3
    };

    return moodMap[mood] || 0; // Default to 0 if mood is not found in moodMap
}



let width, height, gradient;

function getGradient(ctx, chartArea) {
    if (!gradient || width !== chartArea.right - chartArea.left || height !== chartArea.bottom - chartArea.top) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartArea.right - chartArea.left;
        height = chartArea.bottom - chartArea.top;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, 'red'); // Replace with actual color or use Utils.CHART_COLORS.red
        gradient.addColorStop(0.5, 'yellow'); // Replace with actual color or use Utils.CHART_COLORS.yellow
        gradient.addColorStop(1, 'green'); // Replace with actual color or use Utils.CHART_COLORS.green
    }
    return gradient;
}
