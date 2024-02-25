
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
        dayBadges(canvasDays, timestampData);

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



    // function that reformats ISO timestamp into an array that contains day of the week and date
    function standardFormat(isoTimestamp) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(isoTimestamp);
        const dayIndex = date.getDay();
        const dayOfWeek = daysOfWeek[dayIndex];
        const formattedDate = date.toISOString().split('T')[0];
        return {
            date: formattedDate,
            day: dayOfWeek
        };
    }
    
    let today = new Date();
    // console.log(today);

    let formattedToday = standardFormat(today);
    // console.log(formattedToday);


    // Function that formats todays's date and day and returns an array 
    function todayFunc(){
        const today = new Date();
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayIndex = today.getDay();
        const dayOfWeek = daysOfWeek[dayIndex];
        const formattedDate = today.toISOString().split('T')[0];
        
        const result = {
            date: formattedDate,
            day: dayOfWeek
        };

        console.log(result); 
    }
    todayFunc();

    // Function to get the last seven unique days from timestamps
    function getUniqueSeven(timestamps) {
    // Sort timestamps by date in descending order
    timestamps.sort((a, b) => new Date(b.date) - new Date(a.date));
    // Get unique dates
    const uniqueDates = [];
    timestamps.forEach(timestamp => {
        const { day } = timestamp;
        if (!uniqueDates.includes(day)) {
            uniqueDates.push(day);
        }
    });

    // Get the last seven unique dates
    const uniqueSeven = uniqueDates.slice(0, 7);
    return uniqueSeven;
}

    // fetching the timestamps
    let timestampData;
    fetch('/users/timestamps')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch timestamps');
        }
        return response.json();
    })
    .then(data => {
       timestampData = data.timestamps;

       // filters all timestamps made in the last seven days
       const lastSeven = filterLastSevenDays(timestampData);
       console.log('Made in the alst seven days: ', lastSeven);

       // standardizes timestamps
       let standardTimestamps = lastSeven.map(standardFormat);
       console.log('Standardized data :', standardTimestamps);
     
        //Get all unique days in the last seven days
        const uniqueSeven = getUniqueSeven(standardTimestamps);
        console.log('Unique days in the last seven days:', uniqueSeven);
    })
    .catch(error => {
        console.error('Fetch error:', error.message);
    });

    // returns only the timestamps created in the last seven days
    function filterLastSevenDays(timestamps) {
        const today = new Date();
        const lastSevenDays = [];
        
        // Iterate through each timestamp
        timestamps.forEach(timestamp => {
            // Convert the timestamp date string into a Date object
            const timestampDate = new Date(timestamp);
            
            // Calculate the difference in milliseconds between today and the timestamp date
            const differenceInTime = today.getTime() - timestampDate.getTime();
            
            // Calculate the difference in days
            const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
            
            // If the difference is less than 7 days, add it to the lastSevenDays array
            if (differenceInDays < 7) {
                lastSevenDays.push(timestamp);
            }
        });
        
        return lastSevenDays;
    }


    function getLastSevenDays() {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date();
        const lastSevenDays = [];
    
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
    
            const formattedDate = date.toISOString().split('T')[0];
            const dayOfWeek = daysOfWeek[date.getDay()];
    
            lastSevenDays.push({ date: formattedDate, day: dayOfWeek });
        }
    
        return lastSevenDays;
    }
    
    // Example usage:
    const lastSevenDaysList = getLastSevenDays();
    console.log(lastSevenDaysList);
    
    
    
    let missedDay = [200, 19, 40, 1.4];
    let loggedDay = [0, 220, 70, 0.8];
    let futureDay = [160, 160, 160, 1];


    function colorPick(timestamps) {
        const today = new Date();
        const todayIndex = today.getDay(); 
    
        for (let i = 0; i < 7; i++) {
            if (i < todayIndex) {
                // Check if the day has passed
                const dayTimestamp = timestamps.find(timestamp => {
                    const timestampDate = new Date(timestamp.date);
                    return timestampDate.getDay() === i;
                });
    
                if (dayTimestamp) {
                    // Day logged in, paint badge green
                    return loggedDay;
                } else {
                    // Day missed, paint badge red
                    return missedDay;
                }
            } else if (i > todayIndex) {
                // Future day, paint badge grey
                return futureDay;
            } else {
                // Current day, paint badge green if logged, otherwise paint red
                const todayTimestamp = timestamps.find(timestamp => {
                    const timestampDate = new Date(timestamp.date);
                    return timestampDate.getDay() === todayIndex;
                });
    
                if (todayTimestamp) {
                    return loggedDay;
                } else {
                    return missedDay;
                }
            }
        }
    }





    // Logic for drawing and creating the day streak badges 
    function dayBadges(canvas, timestamps) {
        let streakDays = ['S','M', 'T', 'W', 'T', 'F', 'S'];
    
        // buffer is 1% of the canvas, on each side of the badge
        let buffer = canvas.width * 0.1;
    
        // badge slot is a square that will contain the badge
        let badgeSlot = canvas.width / 7;
    
        // badge area is the horizontal area the badge will occupy
        let badgeArea = badgeSlot - 2 * buffer;
    
        let badgeRadius = badgeArea / 2;
    
        let yPos = canvas.height / 2;
    
        // Iterate through each day
        for (let i = 0; i < streakDays.length; i++) {
            let xPos = buffer + (badgeSlot * i) + badgeRadius; // Calculate the x-position of the ellipse center
            
            // Get color based on timestamp data
            let badgeColor = colorPick(timestamps, i);
    
            p5.push();
            p5.fill(badgeColor[0], badgeColor[1], badgeColor[2], badgeColor[3]);
            p5.strokeWeight(1);
            p5.stroke(108, 70, 250);
    
            // Draw the badge
            p5.ellipse(xPos, yPos, badgeArea * 2);
    
            // Draw the streak day letter at the center of the ellipse
            p5.textAlign(p5.CENTER, p5.CENTER); // Align text to the center of the ellipse
            p5.textSize(badgeSlot * 0.4); // Adjust text size
            p5.fill(255); // Set text color to white
            p5.text(streakDays[i], xPos, yPos);
            p5.pop();
        }
    }
    
    // Function to determine badge color based on timestamp data and current day index
    function colorPick(timestamps, dayIndex) {
        const today = new Date();
        const todayIndex = today.getDay(); // Get the index of today's day (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
        
    
        // Check if the day is in the past, future, or today
        if (dayIndex < todayIndex) {
            const dayTimestamp = timestamps.find(timestamp => {
                const timestampDate = new Date(timestamp.date);
                return timestampDate.getDay() === dayIndex;
            });
    
            if (dayTimestamp) {
                // Day logged in, paint badge green
                return loggedDay;
            } else {
                // Day missed, paint badge red
                return missedDay;
            }
        } else if (dayIndex > todayIndex) {
          
            return futureDay;

        } else {
            // Current day, paint badge green if logged, otherwise paint red
           
                return loggedDay;
         
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

                // console.log(data);
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






