
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