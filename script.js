document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       PERCENTAGE CALCULATOR
    ========================= */

    const calculateBtn =
        document.getElementById("calculateBtn");

    calculateBtn.addEventListener("click", function () {

        const obtained =
            Number(document.getElementById("number").value);

        const total =
            Number(document.getElementById("total").value);

        const result =
            document.getElementById("result");

        if (obtained < 0 || total <= 0) {
            result.innerText =
                "Please enter valid values.";
            return;
        }

        if (obtained > total) {
            result.innerText =
                "Obtained marks cannot be greater than total marks.";
            return;
        }

        const percentage =
            (obtained / total) * 100;

        result.innerText =
            "Your Percentage is: " +
            percentage.toFixed(2) +
            "%";
    });

    /* =========================
   CGPA CALCULATOR
========================= */

const addSubjectBtn = document.getElementById("addSubjectBtn");
const cgpaBtn = document.getElementById("cgpaBtn");

addSubjectBtn.onclick = function () {

    const row = document.createElement("div");

    row.className = "cgpa-row";

    row.innerHTML = `
        <input type="text" placeholder="Subject" class="cgpa-subject">

        <input type="number"
               placeholder="Credits"
               class="cgpa-credit"
               min="1">

        <input type="number"
               placeholder="Grade Point"
               class="cgpa-grade"
               min="0"
               max="10"
               step="0.1">
    `;

    document.getElementById("cgpaSubjects").appendChild(row);
};


cgpaBtn.onclick = function () {

    const credits =
        document.querySelectorAll(".cgpa-credit");

    const grades =
        document.querySelectorAll(".cgpa-grade");

    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 0; i < credits.length; i++) {

        const credit = Number(credits[i].value);
        const grade = Number(grades[i].value);

        if (credit <= 0 || grade < 0 || grade > 10) {
            document.getElementById("cgpaResult").innerText =
                "Please enter valid values.";
            return;
        }

        totalCredits += credit;
        totalPoints += credit * grade;
    }

    if (totalCredits === 0) {
        document.getElementById("cgpaResult").innerText =
            "Please enter credits and grade points.";
        return;
    }

    const cgpa = totalPoints / totalCredits;

    document.getElementById("cgpaResult").innerText =
        "Your CGPA is: " + cgpa.toFixed(2);
};
     

    /* =========================
       AGE CALCULATOR
    ========================= */

    const ageBtn =
        document.getElementById("ageBtn");

    ageBtn.addEventListener("click", function () {

        const birthDate =
            document.getElementById("birthDate").value;

        const result =
            document.getElementById("ageResult");

        if (birthDate === "") {
            result.innerText =
                "Please select your date of birth.";
            return;
        }

        const birth =
            new Date(birthDate);

        const today =
            new Date();

        if (birth > today) {
            result.innerText =
                "Birth date cannot be in the future.";
            return;
        }

        let years =
            today.getFullYear() -
            birth.getFullYear();

        let months =
            today.getMonth() -
            birth.getMonth();

        let days =
            today.getDate() -
            birth.getDate();

        if (days < 0) {

            months--;

            const previousMonth =
                new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    0
                );

            days += previousMonth.getDate();
        }

        if (months < 0) {

            years--;

            months += 12;
        }

        result.innerText =
            "Your Age is " +
            years +
            " years, " +
            months +
            " months, " +
            days +
            " days.";
    });


    /* =========================
       STUDY TIMER
    ========================= */

    let timeLeft = 25 * 60;

    let timerInterval = null;

    const timerDisplay =
        document.getElementById("timer");

    const startButton =
        document.getElementById("startTimer");

    const pauseButton =
        document.getElementById("pauseTimer");

    const resetButton =
        document.getElementById("resetTimer");


    function updateTimer() {

        let minutes =
            Math.floor(timeLeft / 60);

        let seconds =
            timeLeft % 60;

        minutes =
            String(minutes).padStart(2, "0");

        seconds =
            String(seconds).padStart(2, "0");

        timerDisplay.innerText =
            minutes + ":" + seconds;
    }


    startButton.addEventListener("click", function () {

        if (timerInterval !== null) {
            return;
        }

        timerInterval =
            setInterval(function () {

                if (timeLeft > 0) {

                    timeLeft--;

                    updateTimer();

                } else {

                    clearInterval(timerInterval);

                    timerInterval = null;

                    alert(
                        "Study session completed! 🎉"
                    );
                }

            }, 1000);
    });


    pauseButton.addEventListener("click", function () {

        clearInterval(timerInterval);

        timerInterval = null;
    });


    resetButton.addEventListener("click", function () {

        clearInterval(timerInterval);

        timerInterval = null;

        timeLeft = 25 * 60;

        updateTimer();
    });


    updateTimer();


    /* =========================
       SEARCH
    ========================= */

    const searchButton =
        document.getElementById("searchButton");

    const searchInput =
        document.getElementById("searchInput");


    searchButton.addEventListener("click", function () {

        const searchText =
            searchInput.value
            .toLowerCase()
            .trim();

        if (searchText === "") {

            alert(
                "Please enter a tool name."
            );

            return;
        }

        const cards =
            document.querySelectorAll(".tool-card");

        let found = false;

        cards.forEach(function (card) {

            const text =
                card.innerText.toLowerCase();

            if (
                text.includes(searchText) &&
                !found
            ) {

                card.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                found = true;
            }
        });


        if (!found) {

            alert(
                "Sorry, this tool is not available yet."
            );
        }
    });


    /* =========================
       OPEN EDITOR
    ========================= */

    const openEditor =
        document.getElementById("openEditor");

    const homePage =
        document.getElementById("homePage");

    const editorPage =
        document.getElementById("editorPage");

    const closeEditor =
        document.getElementById("closeEditor");


    openEditor.addEventListener("click", function () {

        homePage.style.display = "none";

        editorPage.style.display = "block";

        document.body.style.overflow = "hidden";

        window.scrollTo(0, 0);
    });


    /* =========================
       CLOSE EDITOR
    ========================= */

    closeEditor.addEventListener("click", function () {

        editorPage.style.display = "none";

        homePage.style.display = "block";

        document.body.style.overflow = "";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    /* =========================
       RUN CODE
    ========================= */

    const runCode =
        document.getElementById("runCode");

    const preview =
        document.getElementById("preview");


    runCode.addEventListener("click", function () {

        const html =
            document.getElementById("htmlCode").value;

        const css =
            document.getElementById("cssCode").value;

        const javascript =
            document.getElementById("jsCode").value;


        const output = `
<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">

<style>

${css}

</style>

</head>

<body>

${html}

<script>

${javascript}

<\/script>

</body>

</html>
`;


        preview.srcdoc = output;
    });

      /* ==========================================
       STUDY PLANNER - PART 1
       ADD + SAVE + COMPLETE + DELETE
    ========================================== */

    const studySubject =
        document.getElementById("studySubject");

    const studyTask =
        document.getElementById("studyTask");

    const studyDate =
        document.getElementById("studyDate");

    const studyStartTime =
        document.getElementById("studyStartTime");

    const studyEndTime =
        document.getElementById("studyEndTime");

    const studyPriority =
        document.getElementById("studyPriority");

    const addStudyBtn =
        document.getElementById("addStudyBtn");

    const studyList =
        document.getElementById("studyList");


    let studyTasks =
        JSON.parse(
            localStorage.getItem("studyTasks")
        ) || [];


    function saveStudyTasks() {

        localStorage.setItem(
            "studyTasks",
            JSON.stringify(studyTasks)
        );

    }


    function renderStudyTasks(tasks = studyTasks) {

        if (!studyList) return;

        studyList.innerHTML = "";


        if (tasks.length === 0) {

            studyList.innerHTML =
                "<p>No study tasks found.</p>";

            updateStudyProgress();

            return;
        }


        tasks.forEach(function (task) {

            const item =
                document.createElement("div");

            item.className =
                "study-task-item";


            item.innerHTML = `
                <div>
                    <strong>
                        ${task.subject}
                    </strong>

                    <p>
                        ${task.task}
                    </p>

                    <small>
                        Date: ${task.date}
                    </small>

                    <br>

                    <small>
                        Time:
                        ${task.startTime || "--"}
                        -
                        ${task.endTime || "--"}
                    </small>

                    <br>

                    <small>
                        Priority:
                        ${task.priority || "Medium"}
                    </small>
                </div>

                <div>

                    <button
                        type="button"
                        class="complete-study-task"
                        data-id="${task.id}">
                        ${task.completed
                            ? "Completed"
                            : "Complete"}
                    </button>

                    <button
                        type="button"
                        class="delete-study-task"
                        data-id="${task.id}">
                        Delete
                    </button>

                </div>
            `;


            studyList.appendChild(item);

        });


        updateStudyProgress();

    }


    /* ==========================================
       ADD STUDY TASK
    ========================================== */

    if (addStudyBtn) {

        addStudyBtn.addEventListener(
            "click",
            function () {

                const subject =
                    studySubject.value.trim();

                const taskText =
                    studyTask.value.trim();

                const date =
                    studyDate.value;

                const startTime =
                    studyStartTime.value;

                const endTime =
                    studyEndTime.value;

                const priority =
                    studyPriority.value || "Medium";


                if (
                    subject === "" ||
                    taskText === "" ||
                    date === ""
                ) {

                    alert(
                        "Please fill Subject, Task and Date."
                    );

                    return;
                }


                if (
                    startTime &&
                    endTime &&
                    startTime >= endTime
                ) {

                    alert(
                        "End time must be after start time."
                    );

                    return;
                }


                const newTask = {

                    id:
                        Date.now(),

                    subject:
                        subject,

                    task:
                        taskText,

                    date:
                        date,

                    startTime:
                        startTime,

                    endTime:
                        endTime,

                    priority:
                        priority,

                    completed:
                        false

                };


                studyTasks.push(newTask);


                saveStudyTasks();

                renderStudyTasks();


                studySubject.value = "";

                studyTask.value = "";

                studyDate.value = "";

                studyStartTime.value = "";

                studyEndTime.value = "";

            }
        );

    }


    /* ==========================================
       COMPLETE / DELETE TASK
    ========================================== */

    if (studyList) {

        studyList.addEventListener(
            "click",
            function (event) {

                const completeButton =
                    event.target.closest(
                        ".complete-study-task"
                    );

                const deleteButton =
                    event.target.closest(
                        ".delete-study-task"
                    );


                /* COMPLETE */

                if (completeButton) {

                    const id =
                        Number(
                            completeButton.dataset.id
                        );


                    const task =
                        studyTasks.find(
                            function (item) {
                                return item.id === id;
                            }
                        );


                    if (task) {

                        task.completed =
                            !task.completed;

                        saveStudyTasks();

                        renderStudyTasks();

                    }

                }


                /* DELETE */

                if (deleteButton) {

                    const id =
                        Number(
                            deleteButton.dataset.id
                        );


                    studyTasks =
                        studyTasks.filter(
                            function (item) {
                                return item.id !== id;
                            }
                        );


                    saveStudyTasks();

                    renderStudyTasks();

                }

            }
        );

    }


    /* ==========================================
       STUDY PROGRESS
    ========================================== */

    function updateStudyProgress() {

        const total =
            studyTasks.length;


        const completed =
            studyTasks.filter(
                function (task) {
                    return task.completed;
                }
            ).length;


        const pending =
            total - completed;


        const progress =
            total === 0
                ? 0
                : Math.round(
                    (completed / total) * 100
                );


        const progressText =
            document.getElementById(
                "studyProgressText"
            );

        const progressBar =
            document.getElementById(
                "studyProgress"
            );

        const totalCount =
            document.getElementById(
                "totalTasksCount"
            );

        const completedCount =
            document.getElementById(
                "completedTasksCount"
            );

        const pendingCount =
            document.getElementById(
                "pendingTasksCount"
            );


        if (progressText) {

            progressText.innerText =
                progress + "%";

        }


        if (progressBar) {

            progressBar.value =
                progress;

        }


        if (totalCount) {

            totalCount.innerText =
                total;

        }


        if (completedCount) {

            completedCount.innerText =
                completed;

        }


        if (pendingCount) {

            pendingCount.innerText =
                pending;

        }

    }


    /* ==========================================
       INITIAL LOAD
    ========================================== */

    renderStudyTasks();

/* ==========================================
   UNIT CONVERTER
   LENGTH + WEIGHT + TEMPERATURE + TIME + AREA
========================================== */

const unitType = document.getElementById("unitType");
const unitValue = document.getElementById("unitValue");
const unitFrom = document.getElementById("unitFrom");
const unitTo = document.getElementById("unitTo");
const convertUnitBtn = document.getElementById("convertUnitBtn");
const unitResult = document.getElementById("unitResult");


const unitOptions = {

    length: {
        meter: "Meter (m)",
        kilometer: "Kilometer (km)",
        centimeter: "Centimeter (cm)",
        millimeter: "Millimeter (mm)",
        mile: "Mile (mi)",
        yard: "Yard (yd)",
        foot: "Foot (ft)",
        inch: "Inch (in)"
    },

    weight: {
        kilogram: "Kilogram (kg)",
        gram: "Gram (g)",
        milligram: "Milligram (mg)",
        pound: "Pound (lb)",
        ounce: "Ounce (oz)"
    },

    temperature: {
        celsius: "Celsius (°C)",
        fahrenheit: "Fahrenheit (°F)",
        kelvin: "Kelvin (K)"
    },

    area: {
        squareMeter: "Square Meter (m²)",
        squareKilometer: "Square Kilometer (km²)",
        squareFoot: "Square Foot (ft²)",
        squareInch: "Square Inch (in²)",
        acre: "Acre",
        hectare: "Hectare"
    },

    time: {
        second: "Second",
        minute: "Minute",
        hour: "Hour",
        day: "Day",
        week: "Week"
    }
};


/* ==========================================
   LOAD UNIT OPTIONS
========================================== */

function loadUnitOptions() {

    const type = unitType.value;

    unitFrom.innerHTML = "";
    unitTo.innerHTML = "";

    const options = unitOptions[type];

    for (const key in options) {

        const option1 =
            document.createElement("option");

        option1.value = key;
        option1.textContent = options[key];

        unitFrom.appendChild(option1);


        const option2 =
            document.createElement("option");

        option2.value = key;
        option2.textContent = options[key];

        unitTo.appendChild(option2);
    }

    if (unitTo.options.length > 1) {
        unitTo.selectedIndex = 1;
    }
}


/* ==========================================
   CONVERT LENGTH
========================================== */

function convertLength(value, from, to) {

    const meters = {

        meter: 1,
        kilometer: 1000,
        centimeter: 0.01,
        millimeter: 0.001,
        mile: 1609.344,
        yard: 0.9144,
        foot: 0.3048,
        inch: 0.0254
    };

    return value * meters[from] / meters[to];
}


/* ==========================================
   CONVERT WEIGHT
========================================== */

function convertWeight(value, from, to) {

    const kilograms = {

        kilogram: 1,
        gram: 0.001,
        milligram: 0.000001,
        pound: 0.45359237,
        ounce: 0.028349523125
    };

    return value *
        kilograms[from] /
        kilograms[to];
}


/* ==========================================
   CONVERT TEMPERATURE
========================================== */

function convertTemperature(value, from, to) {

    let celsius;


    if (from === "celsius") {
        celsius = value;
    }

    else if (from === "fahrenheit") {
        celsius = (value - 32) * 5 / 9;
    }

    else if (from === "kelvin") {
        celsius = value - 273.15;
    }


    if (to === "celsius") {
        return celsius;
    }

    if (to === "fahrenheit") {
        return (celsius * 9 / 5) + 32;
    }

    if (to === "kelvin") {
        return celsius + 273.15;
    }
}


/* ==========================================
   CONVERT AREA
========================================== */

function convertArea(value, from, to) {

    const squareMeters = {

        squareMeter: 1,
        squareKilometer: 1000000,
        squareFoot: 0.09290304,
        squareInch: 0.00064516,
        acre: 4046.8564224,
        hectare: 10000
    };

    return value *
        squareMeters[from] /
        squareMeters[to];
}


/* ==========================================
   CONVERT TIME
========================================== */

function convertTime(value, from, to) {

    const seconds = {

        second: 1,
        minute: 60,
        hour: 3600,
        day: 86400,
        week: 604800
    };

    return value *
        seconds[from] /
        seconds[to];
}


/* ==========================================
   MAIN CONVERTER
========================================== */

if (unitType && unitValue && unitFrom &&
    unitTo && convertUnitBtn && unitResult) {


    unitType.addEventListener(
        "change",
        loadUnitOptions
    );


    convertUnitBtn.addEventListener(
        "click",
        function () {

            const value =
                Number(unitValue.value);

            const type =
                unitType.value;

            const from =
                unitFrom.value;

            const to =
                unitTo.value;


            if (!Number.isFinite(value)) {

                unitResult.innerText =
                    "Please enter a valid number.";

                return;
            }


            let result;


            if (type === "length") {

                result =
                    convertLength(
                        value,
                        from,
                        to
                    );
            }


            else if (type === "weight") {

                result =
                    convertWeight(
                        value,
                        from,
                        to
                    );
            }


            else if (type === "temperature") {

                result =
                    convertTemperature(
                        value,
                        from,
                        to
                    );
            }


            else if (type === "area") {

                result =
                    convertArea(
                        value,
                        from,
                        to
                    );
            }


            else if (type === "time") {

                result =
                    convertTime(
                        value,
                        from,
                        to
                    );
            }


            if (!Number.isFinite(result)) {

                unitResult.innerText =
                    "Conversion error.";

                return;
            }


            unitResult.innerText =
                `${value} ${unitFrom.options[unitFrom.selectedIndex].text}
                = ${Number(result.toFixed(8))}
                ${unitTo.options[unitTo.selectedIndex].text}`;
        }
    );


    /* INITIAL OPTIONS */

    loadUnitOptions();
}

  /* ==========================================
   WORD COUNTER
   WORDS + CHARACTERS + SENTENCES + READING TIME
========================================== */

const wordCounter =
    document.getElementById("wordCounter");

const wordText =
    document.getElementById("wordText");

const wordCount =
    document.getElementById("wordCount");

const charCount =
    document.getElementById("charCount");

const charNoSpaceCount =
    document.getElementById("charNoSpaceCount");

const sentenceCount =
    document.getElementById("sentenceCount");

const readingTime =
    document.getElementById("readingTime");

    
const clearWordText =
    document.getElementById("clearWordText");


function updateWordCounter() {

    if (!wordText) return;

    const text =
        wordText.value;


    /* WORD COUNT */

    const words =
        text.trim() === ""
            ? []
            : text.trim().split(/\s+/);


    /* CHARACTER COUNT */

    const characters =
        text.length;


    /* CHARACTERS WITHOUT SPACES */

    const charactersNoSpace =
        text.replace(/\s/g, "").length;


    /* SENTENCE COUNT */

    const sentences =
        text.trim() === ""
            ? 0
            : text
                .split(/[.!?]+/)
                .filter(function (sentence) {
                    return sentence.trim() !== "";
                })
                .length;


    /* READING TIME */

    const minutes =
        words.length === 0
            ? 0
            : Math.ceil(words.length / 200);


    if (wordCount) {
        wordCount.innerText =
            words.length;
    }


    if (charCount) {
        charCount.innerText =
            characters;
    }


    if (charNoSpaceCount) {
        charNoSpaceCount.innerText =
            charactersNoSpace;
    }


    if (sentenceCount) {
        sentenceCount.innerText =
            sentences;
    }


    if (readingTime) {

        readingTime.innerText =
            minutes === 0
                ? "0 min"
                : minutes + " min";
    }
}


/* ==========================================
   LIVE WORD COUNT
========================================== */

if (wordText) {

    wordText.addEventListener(
        "input",
        updateWordCounter
    );
}


/* ==========================================
   CLEAR TEXT
========================================== */

if (clearWordText) {

    clearWordText.addEventListener(
        "click",
        function () {

            if (wordText) {
                wordText.value = "";
            }

            updateWordCounter();
        }
    );
}


/* ==========================================
   INITIAL COUNT
========================================== */

updateWordCounter();


});

   
