let moodData;
let dateData;

document.addEventListener('DOMContentLoaded', function () {
    // const DATA_COUNT = 7;
    const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
    let ctx = document.getElementById("myChart").getContext('2d');
    let moodChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: generateLastSevenDaysLabels(),
            datasets: [{
                label: 'Logged mood',
                data: [], // Will be replaced with fetched data
                lineTension: 0.3,
                spanGaps: true,
                segment: {
                    borderDash: (ctx) => skipped(ctx, [5, 5]) || [],
                },
                pointStyle: 'circle', 
                pointRadius: 6, 
                pointBackgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        return;
                    }
                    return getGradient(ctx, chartArea);
                },
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true, 
                    }
                },
            },
            scales: {
                y: {
                    min: 1,  
                    max: 3,
                    ticks: {
                        stepSize: 1,
                        precision: 1,
                        callback: function(value, index, values) {
                            switch(value) {
                                case 1:
                                    return '😢'; 
                                case 2:
                                    return '😐'; 
                                case 3:
                                    return '😊'; 
                                default:
                                    return ''; 
                            }
                        },
                    },
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
                    borderWidth: 3
                }
            }
        },
    });

// Define mapMoodsToValues function
function mapMoodsToValues(moodArray) {
    return moodArray.map(entry => entry.averageMood || null);
};

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
    currentDate.setHours(0, 0, 0, 0); 

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

        // Calculate the average mood for the day
        let totalMoodValue = 0; 
        moodsForDay.forEach(moodEntry => {
            totalMoodValue += mapMoodToValue(moodEntry);
        });

        let averageMood;
        if (moodsForDay.length > 0) {
            averageMood = totalMoodValue / moodsForDay.length;
        } else {
            averageMood = null;
        };

        lastSevenDaysMoods.unshift({
            date: targetDateString,
            averageMood: averageMood
        });
    }
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
// Chart.js function for calculation gradient color based on data points
function getGradient(ctx, chartArea) {
    if (!gradient || width !== chartArea.right - chartArea.left || height !== chartArea.bottom - chartArea.top) {
        width = chartArea.right - chartArea.left;
        height = chartArea.bottom - chartArea.top;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, 'red'); 
        gradient.addColorStop(0.5, 'yellow'); 
        gradient.addColorStop(1, 'green'); 
    }
    return gradient;
}

// function that generates the last seven days for X-axis labels
function generateLastSevenDaysLabels() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay(); 
    const labels = [];

    for (let i = 0; i < 7; i++) {
        const dayIndex = (today - i + 7) % 7; 
        labels.unshift(daysOfWeek[dayIndex]); 
    }
    return labels;
}
