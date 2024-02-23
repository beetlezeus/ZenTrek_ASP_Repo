let moodData;

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

    // Fetch mood data from server
    fetch('dailyReflections/moodData')
        .then(response => response.json())
        .then(data => {
            moodData = data.moods;

            // Get the last 7 mood values
        // const lastSevenMoods = moodData.slice(-7);

        // Map mood data to numerical values
        const mappedMoodData = mapMoodsToValues(moodData);

        // Update chart dataset with mapped mood data
        moodChart.data.datasets[0].data = mappedMoodData;
            console.log(moodData);
        // Redraw the chart
        moodChart.update();
            // Log mood data
        })
        .catch(error => {
            console.error('Error fetching mood data:', error);
        });
});



function mapMoodsToValues(moodArray) {
    const moodMap = {
        'sad': 1,
        'neutral': 2,
        'happy': 3
    };

    return moodArray.map(mood => moodMap[mood] || 0); // Default to 0 if mood is not found in moodMap
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
