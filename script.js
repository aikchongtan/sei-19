window.onload = function (){

    // standard list of alphabets for the game
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];

    var geoCategories;         // Array of geographical zones
    var chosenGeoCategory;     // Selected category
    var getHint ;          // countryName
    var countryName ;              // Selected countryName
    var guess ;             // guessAlphabet
    var guessAlphabetes = [ ];      // Empty array to store guessed alphabets
    var lives ;             // Lives remaining b4 completely hung
    var correctHit ;           // Count correct guessed alphabets
    var space;              // Number of spaces in countryName '-'
    var startTime = 0;
    var endTime;
    var timeout;
    var timer_on;

    // Get elements from html
    var showLives = document.getElementById("mylives");
    var myResult = document.getElementById("myResult");
    var getHint = document.getElementById("btnFlagHint");
    var showClue = document.getElementById("clue-flag-icon");

    // create alphabet ul for the on-screen keyboard
    var keyboard = function (){
        mykeyboard = document.getElementById('keyboard'); // Mother
        letters = document.createElement('ul'); // child

        for (var i = 0; i < alphabet.length; i++) {
            letters.className = 'alphabet';
            listItem = document.createElement('li');
            listItem.className = 'letter';
            listItem.innerHTML = alphabet[i]; // display the 26 alphabets
            clickAlphabet();

            mykeyboard.appendChild(letters); // append the html tag element
            letters.appendChild(listItem); // append the alphabet to the tag
        }
    };

    // Select category, here the geographical regions
    var selectGeoCategory = function (){
        if (chosenGeoCategory === geoCategories[0]){
            catagoryName.innerHTML = "The chosen category are for the countries in Asia";
        }
        else if (chosenGeoCategory === geoCategories[1])
        {
            catagoryName.innerHTML = "The chosen category are for the countries in Europe";
        }
    };

    // Create guessAlphabetes ul
    var fillIntheBlank = function () {
        countryNameHolder = document.getElementById('hold');
        correct = document.createElement('ul');

        for (var i = 0; i < countryName.length; i++) {
            correct.setAttribute('id', 'my-countryName');  // assign country name to html Id
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');

            if (countryName[i] === "-") { // if the country name include a dash-character
                guess.innerHTML = "-";  // substitute blank-char with dash-char
                space = 1;
            } else { // default, set blank-char for every letter in country name
                guess.innerHTML = "_";
            };

            guessAlphabetes.push(guess); // blank-char, dash-char
            countryNameHolder.appendChild(correct);
            correct.appendChild(guess);
        }
    };

    // Show lives count and result message
    var result = function () {
        showLives.innerHTML = lives + " more try";
        if (lives < 1) {
            myResult.innerHTML = "Game Over";
            showLives.innerHTML = "No more try";
            endGameTime();
        }

        for (var i = 0; i < guessAlphabetes.length; i++) {
            if (correctHit === guessAlphabetes.length) {
                myResult.innerHTML = "You Win!";
            }
        }
    }

    var startGameTime = function() {
        if (timer_on)
        {
            startTime++; //increase one second
            var m = Math.floor(startTime / 60);
            var s = startTime % 60;
            m = checkTime(m);
            s = checkTime(s);
            document.getElementById("timer").innerHTML = m + ":" + s;
            var timeout = setTimeout(startGameTime, 1000);
        }
    }

    function checkTime(i) {
        if (i < 10) // add zero in front of numbers < 10
        {
            i = "0" + i
        };
        return i;
    }

    var endGameTime = function() {
        startTime = 0;
        timer_on = 0;
        clearTimeout(timeout);
    }
    // hangman man
    var hangman = function () {
        var drawHangman = lives ;
        hangmanParts[drawHangman]();
    }

    // Draw Hangman
    var canvas =  function(){
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    };

    draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    }

    head = function(){
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI*2, true);
        context.stroke();
    }
    frame1 = function() {
        draw (0, 150, 150, 150);
    };

    frame2 = function() {
        draw (10, 0, 10, 600);
    };

    frame3 = function() {
        draw (0, 5, 70, 5);
    };

    frame4 = function() {
        draw (60, 5, 60, 15);
    };

    torso = function() {
        draw (60, 36, 60, 70);
    };

    rightArm = function() {
        draw (60, 46, 100, 50);
    };

    leftArm = function() {
        draw (60, 46, 20, 50);
    };

    rightLeg = function() {
        draw (60, 70, 100, 100);
    };

    leftLeg = function() {
        draw (60, 70, 20, 100);
    };

    hangmanParts = [rightLeg, leftLeg, rightArm, leftArm, torso,  head, frame4, frame3, frame2, frame1];

    // OnClick Function
    clickAlphabet = function () {

        //Add onClick event
        listItem.onclick = function () {
            if (myResult.innerHTML != "Game Over")
            {
                var guessAlphabet = (this.innerHTML);
                this.setAttribute("class", "active");  // change class value to active on-click
                this.onclick = null;

                for (var i = 0; i < countryName.length; i++)
                {
                    if (countryName[i] === guessAlphabet)
                    {
                        guessAlphabetes[i].innerHTML = guessAlphabet;
                        correctHit += 1;
                    }
                }

                //Comparison with country name with guess alphabet
                var j = (countryName.indexOf(guessAlphabet));
                if (j === -1)
                { //Not found
                    lives -= 1;
                    result();
                    hangman();
                } else {
                    result();
                }
            }
        }
    };

    // Play
    play = function () {
        geoCategories = [
            ['afghanistan', 'singapore', 'china', 'japan', 'australia', 'indonesia', 'malaysia', 'taiwan', 'thailand', 'south Korea', 'india', 'myanmar'],
            ['germany', 'france',   'italy',   'slovakia', 'slovenia', 'spain','sweden',
            'switzerland',  'turkey',   'ukraine',  'united kingdom','vatican city']
        ];

        chosenGeoCategory = geoCategories[Math.floor(Math.random() * geoCategories.length)];
        countryName = chosenGeoCategory[Math.floor(Math.random() * chosenGeoCategory.length)];

        keyboard();

        guessAlphabetes = [ ];
        lives = 10;
        correctHit = 0;
        space = 0;
        timer_on = 1;
        fillIntheBlank();
        result();
        selectGeoCategory();
        canvas();
        startGameTime();
    }

    play();


    // Button btnFlagHint
    document.getElementById('btnFlagHint').onclick = function() {

        var catagoryIndex = geoCategories.indexOf(chosenGeoCategory);
        var hintIndex = chosenGeoCategory.indexOf(countryName);

        showClue.innerHTML = "<img class='flag' src='Images/" + geoCategories[catagoryIndex][hintIndex] + ".png' />";

        document.getElementById("clue-flag-icon").style.display = "block";
        document.getElementById("btnFlagHint").style.display = "none";
    };

    // Reset
    document.getElementById('reset').onclick = function() {
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        showClue.innerHTML = "";
        context.clearRect(0, 0, 400, 400);

        play();

        document.getElementById("timer").innerHTML = "00:00";
        document.getElementById("clue-flag-icon").style.display = "none";
        document.getElementById("btnFlagHint").style.display = "block";
        myResult.innerHTML = "";
    }
};