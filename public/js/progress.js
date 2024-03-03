// Sketch 1; creates a canvas and draws day badges  on it
let sketch1 = function(p5) {
    let canvasDays;
    let timestampData;
    let standardizedTimestamps;
    let unique;
    let lastNumUnique;
    let thisWeekLogins;
    let days;
    const streakDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let currentStreak;
    
    p5.setup = function() {
        let containerDays = document.getElementById("dayContainer");
        // Get the width and height of the container
        let containerWidth = containerDays.offsetWidth;
        let containerHeight = containerDays.offsetHeight;
        // Create a canvas with the same size as the container
        canvasDays = p5.createCanvas(containerWidth, containerHeight); 
        // Move the canvas inside the container
        canvasDays.parent('dayContainer');
    };

    // Sets canvas size and allows responsiveness
    p5.setCanvasSize = function(width, height) {
        // Set canvas size based on container size
        p5.resizeCanvas(width, height);
    };

    // Listens for window resize event
    window.addEventListener('resize', function() {
        let containerDays = document.getElementById("dayContainer");
        p5.setCanvasSize(containerDays.offsetWidth, containerDays.offsetHeight);
    });

    // Function that reformats ISO timestamp into an array that contains day of the week and date
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
    };

    // Function that returns a set of unique dates in an array of login timestamps
    function uniqueDates(array){
        let unique = [];
        let uniqueSet = new Set(); 

        array.forEach(item => {
            // Converts the date string into a Date object
            const date = new Date(item.date);
            // Creates a unique key by connecting  date and day
            const key = date.toISOString() + item.day;

            // Checks if the key is not already in the Set
            if (!uniqueSet.has(key)) {
                // If not, add it to the Set and push the item to the unique array
                uniqueSet.add(key);
                unique.push(item);
            };
        });
    return unique;
    };

    // Function that returns only the last n values
    function  getLastNValues(array, n) {
        const startIndex = Math.max(0, array.length - n); 
        return array.slice(startIndex); 
    };

    // Function that returns how many days since last Sunday
    function daysOfThisWeek(){
        let week = getLastSevenDays();
        let indexCounter = 0;
        for(let i=0; i<7; i++){
            if(week[0].day == 'Sunday'){
                return 7;
            } else {
                if(week[i].day != 'Sunday'){
                    indexCounter++;
                } else 
                 return indexCounter;
            };
        };
    };

    // Function that returns an array of the last seven days
    function getLastSevenDays() {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date();
        const lastSevenDays = [];
        
        // Loop through the last seven days
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const formattedDate = date.toISOString().split('T')[0];
            const dayOfWeek = daysOfWeek[date.getDay()];
            
            lastSevenDays.push({ date: formattedDate, day: dayOfWeek });
        };
        return lastSevenDays;
    };
    //  console.log('Last seven days are: ', getLastSevenDays());

    // Function that ensures that the array of dates is from the last week (since last Sunday). Checks if there are repeated day values and adjusts the array
    function uniqueThisWeek(array) {
        const thisWeek = {};
        const result = [];
        for (let i = array.length - 1; i >= 0; i--) {
            const currentDay = array[i].day;
            if (!thisWeek[currentDay]) {
                result.unshift(array[i]);
                thisWeek[currentDay] = true;
            };
        };
        return result;
    };
    

    // Fetches the timestamps, converts the data into desired format, slices the array to retrieve the relevant timestamps, draws the badges
    function fetchAndDraw(){
    fetch('/users/timestamps')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch timestamps');
            }
            return response.json();
        })
        .then(data => {

            // Values from all the logged login timestamps
            timestampData = data.timestamps;
            // console.log('This is original format: ',timestampData);

            // Standardizes the time stamps
            standardizedTimestamps = timestampData.map(standardFormat);
            // console.log('This is in standardized format: ', standardizedTimestamps);

            // Unique dates (only keeps one of each date)
            unique = uniqueDates(standardizedTimestamps);
            //console.log('This are all unique values: ', unique);
        
            // Number of days since last Sunday
            days = daysOfThisWeek();
            // console.log('This many days since sunday: ', days);

            // Number (of days since last Sunday) of unique values
            lastNumUnique = getLastNValues(unique, days);
            // console.log('These are the last (up to 7) timestamps: ', lastNumUnique);

            // Exclusively this week's logins
            thisWeekLogins = uniqueThisWeek(lastNumUnique);
            // console.log('Unique login timestamps this week: ', thisWeekLogins);
        
            // Current streak
            currentStreak = streakFunc(thisWeekLogins); 
            updateStreakValue();

            // Draw function that draws the badges on the canvas and colors them according to the unique login dates in the last 7 days
            p5.draw = function() {
            dayBadges(canvasDays, thisWeekLogins);
            };

        })
        .catch(error => {
            console.error('Fetch error:', error.message);
        });
    };

    
    // Colors of the badges
    let missedDay = [200, 19, 40, 1.4];
    let loggedDay = [0, 220, 70, 0.8];
    let futureDay = [160, 160, 160, 1];


    // Logic for drawing and creating the day streak badges 
    function dayBadges(canvas, dates) {
        // Buffer is 1% of the canvas, on each side of the badge
        let buffer = canvas.width * 0.1;
    
        // Badge slot is a square that will contain the badge
        let badgeSlot = canvas.width / 7;
    
        // Badge area is the horizontal area the badge will occupy
        let badgeArea = badgeSlot - 2 * buffer;
    
        let badgeRadius = badgeArea / 2;
    
        let yPos = canvas.height / 2;
    
        // Iterate through each day
        for (let i = 0; i < streakDays.length; i++) {
            let xPos = buffer + (badgeSlot * i) + badgeRadius;

            // Get color based on timestamp data
            let badgeColor = colorPick(dates, i);
            p5.push();
            p5.fill(badgeColor[0], badgeColor[1], badgeColor[2], badgeColor[3]);
            p5.strokeWeight(1);
            p5.stroke(108, 70, 250);
            // Draw the badge
            p5.ellipse(xPos, yPos, badgeArea * 2);
            // Draw the streak day letter at the center of the ellipse
            p5.textAlign(p5.CENTER, p5.CENTER); 
            p5.textSize(badgeSlot * 0.4); 
            p5.fill(255); 
            p5.text(streakDays[i][0], xPos, yPos);
            p5.pop();
        };
    };

    
    // Function that colors the badges
    function colorPick(dates, currentBadge) {
        // Last seven calendar days
        let lastSeven = getLastSevenDays();
        let match = false;
        // Only colors the days that have happened this week (since Sunday)
        if (currentBadge < days) {

            let dayName = streakDays[currentBadge];

            // Compares dates
            for (let i = 0; i < dates.length; i++) {
                let found = false;
                for (let j = 0; j < lastSeven.length; j++) {
                    if (dates[i].date === lastSeven[j].date
                    && dayName === dates[i].day) { 
                    found = true;
                    break;
                    };
                };
                if (found) {
                    match = true;
                };
            };
            return match ? loggedDay : missedDay;   
        } else {
            return futureDay;
        };
    };
    
    // Function that calculates the current streak of consecutive login dates
    function streakFunc(dates) {
        let consecutive = 0;

        // Starts iterating through streakDays
        for (let i = streakDays.length - 1; i >= 0; i--) {
            let currentDay = streakDays[i];
            // Checks if the current day from streakDays is present in dates
            if (dates.some(date => date.day === currentDay)) {
                consecutive++; // Increment streak count
                // console.log('MATCHING DAY ', currentDay);
            } else {
                // console.log('NO MATCH: ', currentDay);
                break;
            };
        };
    return consecutive;
    };
    
    // Function to update streak value in the DOM
    function updateStreakValue() {
        let currentStreakSpan = document.getElementById("currentStreak");
        let finish = document.getElementById("finalS");
        let final = (currentStreak === 1) ? '.' : 's.'; // Decides if plural 's' is needed
        currentStreakSpan.textContent = currentStreak; // Update streak value
        finish.textContent = final; // Update 's' or '.' based on streak value
    };

    // Calls fetchAndDraw to initiate the visualization
    document.addEventListener("DOMContentLoaded", function () {
        fetchAndDraw();
    });
};


// Sketch 2; draws the 'Weekly goals' visualizations
let sketch2 = function(p5) {
    // Initializes the canvas and the array
    let canvasStreaks;
    let activityArray = [];

    p5.setup = function() {
        let containerStreaks = document.getElementById("streakContainer");

        // Gets the width and height of the container
        let containerWidth = containerStreaks.offsetWidth;
        let containerHeight = containerStreaks.offsetHeight;

        // Creates a canvas with the same size as the container
        canvasStreaks = p5.createCanvas(containerWidth, containerHeight); 

        // Moves the canvas inside the container
        canvasStreaks.parent('streakContainer');

        // Sets the canvas height to match the container height
        p5.resizeCanvas(containerWidth, containerHeight);

        // Fetches the user data
        fetch('userDetails/activities')
            .then(response => response.json())
            .then(data => {
                // Draws the visualization only if there are some activities that are selected
                if (data && data.length > 0 && data.some(activity => activity.value === true)) {
                    console.log(data);
                    // Updates the activityArray with the fetched data
                    activityArray = data;
                    // Draw the boxes
                    p5.draw = function() {
                        streak(activityArray, canvasStreaks); 
                    }
                // Otherwise draws a clickable div
                } else {
                    noSetGoals();
                };
             })
            .catch(error => console.error('Error fetching activity array:', error));
    }

   
    // Listens for window resize
    window.addEventListener('resize', function() {
        resizeCanvasAndRedraw();
    });

    // Function to resize canvas and redraw elements
    function resizeCanvasAndRedraw() {
        let containerStreaks = document.getElementById("streakContainer");
        let containerWidth = containerStreaks.offsetWidth;
        let containerHeight = containerStreaks.offsetHeight;
        // Resizes canvas
        canvasStreaks.resize(containerWidth, containerHeight);
        // Redraws elements
        p5.redraw();
    };


    // Function that draws the boxes according to the data
    function streak(activities, canvas) {
        let chosenActivities = [];
        let daysArray = [];
        let activityText = [];
        // Populates the array with user defined values
        activities.forEach(item => {
            if (item.value === true) {
                chosenActivities.push(item.name);
                daysArray.push(item.days);
                activityText.push(item.name);
            };
        });

        // Buffer is 1% of the canvas, on each side of the badge
        let bufferX = canvas.width * 0.05;
        let bufferY = canvas.height * 0.05;

        // Number of rows according to the number of activities selected
        let rows = chosenActivities.length;

        // Finds the maximum number of days among all categories
        let maxDays = Math.max(...daysArray); 

        // calculates row height and width
        let rowHeight = (canvas.height - bufferY * 2) / rows; 
        let rowWidth = canvas.width - bufferY * 2;

        // Defines max text size so it doesn't go higher than 26 regardless off the screen size
        let maxTextHeight = 26;
        let textHeight = rowHeight * 0.2;

        if(textHeight > maxTextHeight){
            textHeight = maxTextHeight;
        };

        // Defines box dimensions
        let boxHeight = rowHeight - textHeight;
        let boxWidth = rowWidth / maxDays;

        // Draws the boxes
        for(let i=0; i<rows; i++){
            for (let j = 0; j < daysArray[i]; j++){
                p5.push();
                p5.fill(90, 47, 197, 0.8);
                // p5.noStroke();
                p5.strokeWeight(1);
                p5.stroke(240);
                p5.rect(bufferX + boxWidth*j, bufferY + rowHeight * i, boxWidth - bufferX/2, boxHeight - textHeight, 7);
                p5.pop();
            }
            p5.textSize(textHeight);
            p5.textAlign(p5.CENTER, p5.BASELINE);
            p5.text(activityText[i],  rowWidth /2, rowHeight * i + boxHeight + textHeight);
        };
    };

    // Function that creates a clickable div and attaches it to the parent element
    function noSetGoals(){
        // Defines the container
        const streakContainer = document.getElementById('streakContainer');

        // Changes the path of the parent element
        const parentAnchor = streakContainer.parentElement;
        parentAnchor.href = '/userDetails/edit';

        // Removes the existing canvas element
        const existingCanvas = streakContainer.querySelector('.p5Canvas');
        if (existingCanvas) {
            existingCanvas.remove();
        };

        // Creates the div 
        const messageDiv = document.createElement('div');
        messageDiv.textContent = 'Click here to set your weekly goals';
        messageDiv.style.cursor = 'pointer';
        messageDiv.style.color = 'blue';
        messageDiv.style.color = 'white';
        messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
        messageDiv.style.height = '100%';
        messageDiv.style.position = 'absolute';
        messageDiv.style.top = '0';
        messageDiv.style.left = '0';
        messageDiv.style.right = '0';
        messageDiv.style.bottom = '0';
        messageDiv.style.padding = '20px';

        // Centers the text 
        messageDiv.style.display = 'flex';
        messageDiv.style.alignItems = 'center';
        messageDiv.style.justifyContent = 'center';

        // Adds event listeners for hover
        messageDiv.addEventListener('mouseenter', function() {
            messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; 
        });

        messageDiv.addEventListener('mouseleave', function() {
            messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
        });

        // Appends the messageDiv to the streakContainer
        streakContainer.appendChild(messageDiv);            
    };
};

// initializes the sketches
new p5(sketch1);
new p5(sketch2);




