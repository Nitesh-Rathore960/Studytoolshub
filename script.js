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
   STUDY PLANNER - COMPLETE
   ADD + COMPLETE + DELETE
   FILTERS + OVERDUE + TODAY FOCUS
========================================== */

const studySubject = document.getElementById("studySubject");
const studyTask = document.getElementById("studyTask");
const studyDate = document.getElementById("studyDate");
const studyStartTime = document.getElementById("studyStartTime");
const studyEndTime = document.getElementById("studyEndTime");
const studyPriority = document.getElementById("studyPriority");
const addStudyBtn = document.getElementById("addStudyBtn");
const studyList = document.getElementById("studyList");

const showAllTasks = document.getElementById("showAllTasks");
const showTodayTasks = document.getElementById("showTodayTasks");
const showPendingTasks = document.getElementById("showPendingTasks");
const showCompletedTasks = document.getElementById("showCompletedTasks");

let studyTasks = JSON.parse(
    localStorage.getItem("studyTasks")
) || [];

let currentStudyFilter = "all";


/* ==========================================
   SAVE TASKS
========================================== */

function saveStudyTasks() {

    localStorage.setItem(
        "studyTasks",
        JSON.stringify(studyTasks)
    );

}


/* ==========================================
   TODAY DATE
========================================== */

function getTodayDate() {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


/* ==========================================
   CHECK OVERDUE
========================================== */

function isTaskOverdue(task) {

    if (task.completed) {
        return false;
    }

    const today = getTodayDate();

    if (task.date < today) {
        return true;
    }

    if (
        task.date === today &&
        task.endTime
    ) {

        const now = new Date();

        const currentTime =
            String(now.getHours()).padStart(2, "0") +
            ":" +
            String(now.getMinutes()).padStart(2, "0");

        return task.endTime < currentTime;
    }

    return false;
}


/* ==========================================
   RENDER TASKS
========================================== */

function renderStudyTasks(tasks = studyTasks) {

    if (!studyList) return;

    studyList.innerHTML = "";


    if (tasks.length === 0) {

        studyList.innerHTML =
            "<p>No study tasks found.</p>";

        updateStudyProgress();

        updateTodayFocus();

        return;
    }


    tasks.forEach(function (task) {

        const item =
            document.createElement("div");

        item.className =
            "study-task-item";


        if (task.completed) {
            item.classList.add("completed");
        }


        if (isTaskOverdue(task)) {
            item.classList.add("overdue");
        }


        const overdueText =
            isTaskOverdue(task)
                ? "<strong>⚠️ Overdue</strong>"
                : "";


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

                <br>

                ${overdueText}

            </div>

            <div>

                <button
                    type="button"
                    class="complete-study-task"
                    data-id="${task.id}">
                    ${
                        task.completed
                            ? "Undo"
                            : "Complete"
                    }
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

    updateTodayFocus();
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
                studyPriority.value || "medium";


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

                id: Date.now(),

                subject: subject,

                task: taskText,

                date: date,

                startTime: startTime,

                endTime: endTime,

                priority: priority,

                completed: false

            };


            studyTasks.push(newTask);

            saveStudyTasks();


            currentStudyFilter = "all";

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
   COMPLETE / DELETE
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


            /* COMPLETE / UNDO */

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

                    applyStudyFilter();

                }

                return;
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

                applyStudyFilter();

            }

        }
    );

}


/* ==========================================
   FILTER TASKS
========================================== */

function applyStudyFilter() {

    let filteredTasks = studyTasks;


    if (currentStudyFilter === "today") {

        const today =
            getTodayDate();

        filteredTasks =
            studyTasks.filter(
                function (task) {
                    return task.date === today;
                }
            );

    }


    else if (
        currentStudyFilter === "pending"
    ) {

        filteredTasks =
            studyTasks.filter(
                function (task) {
                    return !task.completed;
                }
            );

    }


    else if (
        currentStudyFilter === "completed"
    ) {

        filteredTasks =
            studyTasks.filter(
                function (task) {
                    return task.completed;
                }
            );

    }


    renderStudyTasks(filteredTasks);

}


/* ==========================================
   ALL TASKS
========================================== */

if (showAllTasks) {

    showAllTasks.addEventListener(
        "click",
        function () {

            currentStudyFilter = "all";

            applyStudyFilter();

        }
    );

}


/* ==========================================
   TODAY TASKS
========================================== */

if (showTodayTasks) {

    showTodayTasks.addEventListener(
        "click",
        function () {

            currentStudyFilter = "today";

            applyStudyFilter();

        }
    );

}


/* ==========================================
   PENDING TASKS
========================================== */

if (showPendingTasks) {

    showPendingTasks.addEventListener(
        "click",
        function () {

            currentStudyFilter = "pending";

            applyStudyFilter();

        }
    );

}


/* ==========================================
   COMPLETED TASKS
========================================== */

if (showCompletedTasks) {

    showCompletedTasks.addEventListener(
        "click",
        function () {

            currentStudyFilter = "completed";

            applyStudyFilter();

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


    const overdue =
        studyTasks.filter(
            function (task) {
                return isTaskOverdue(task);
            }
        ).length;


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

    const overdueCount =
        document.getElementById(
            "overdueTasksCount"
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


    if (overdueCount) {

        overdueCount.innerText =
            overdue;

    }

}


/* ==========================================
   TODAY FOCUS
========================================== */

function updateTodayFocus() {

    const todayFocusText =
        document.getElementById(
            "todayFocusText"
        );

    if (!todayFocusText) return;


    const today =
        getTodayDate();


    const todayTasks =
        studyTasks.filter(
            function (task) {

                return (
                    task.date === today &&
                    !task.completed
                );

            }
        );


    if (todayTasks.length === 0) {

        todayFocusText.innerText =
            "No pending tasks for today. 🎉";

        return;
    }


    const highPriority =
        todayTasks.filter(
            function (task) {
                return task.priority === "high";
            }
        );


    if (highPriority.length > 0) {

        todayFocusText.innerText =
            `Focus on: ${highPriority[0].subject} - ${highPriority[0].task}`;

    }

    else {

        todayFocusText.innerText =
            `Today's focus: ${todayTasks[0].subject} - ${todayTasks[0].task}`;

    }

}


/* ==========================================
   INITIAL LOAD
========================================== */

renderStudyTasks();

/* ==========================================
   UNIT CONVERTER
   LENGTH + WEIGHT + TEMPERATURE + TIME + AREA + DATA
========================================== */

const unitType = document.getElementById("unitType");
const unitValue = document.getElementById("unitValue");
const unitFrom = document.getElementById("unitFrom");
const unitTo = document.getElementById("unitTo");
const convertUnitBtn = document.getElementById("convertUnitBtn");
const unitResult = document.getElementById("unitResult");


const unitOptions = {

    /* LENGTH */
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

    /* WEIGHT */
    weight: {
        kilogram: "Kilogram (kg)",
        gram: "Gram (g)",
        milligram: "Milligram (mg)",
        pound: "Pound (lb)",
        ounce: "Ounce (oz)"
    },

    /* TEMPERATURE */
    temperature: {
        celsius: "Celsius (°C)",
        fahrenheit: "Fahrenheit (°F)",
        kelvin: "Kelvin (K)"
    },

    /* AREA */
    area: {
        squareMeter: "Square Meter (m²)",
        squareKilometer: "Square Kilometer (km²)",
        squareFoot: "Square Foot (ft²)",
        squareInch: "Square Inch (in²)",
        acre: "Acre",
        hectare: "Hectare"
    },

    /* TIME */
    time: {
        second: "Second",
        minute: "Minute",
        hour: "Hour",
        day: "Day",
        week: "Week"
    },

    /* DATA */
    data: {
        byte: "Byte (B)",
        kilobyte: "Kilobyte (KB)",
        megabyte: "Megabyte (MB)",
        gigabyte: "Gigabyte (GB)",
        terabyte: "Terabyte (TB)"
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

    return value *
        meters[from] /
        meters[to];
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
   CONVERT DATA
========================================== */

function convertData(value, from, to) {

    const bytes = {

        byte: 1,
        kilobyte: 1024,
        megabyte: 1024 ** 2,
        gigabyte: 1024 ** 3,
        terabyte: 1024 ** 4
    };

    return value *
        bytes[from] /
        bytes[to];
}


/* ==========================================
   MAIN CONVERTER
========================================== */

if (
    unitType &&
    unitValue &&
    unitFrom &&
    unitTo &&
    convertUnitBtn &&
    unitResult
) {


    /* CHANGE UNIT TYPE */

    unitType.addEventListener(
        "change",
        loadUnitOptions
    );


    /* CONVERT */

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


            /* EMPTY / INVALID VALUE */

            if (
                unitValue.value.trim() === "" ||
                !Number.isFinite(value)
            ) {

                unitResult.innerText =
                    "Please enter a valid number.";

                return;
            }


            let result;


            /* LENGTH */

            if (type === "length") {

                result =
                    convertLength(
                        value,
                        from,
                        to
                    );
            }


            /* WEIGHT */

            else if (type === "weight") {

                result =
                    convertWeight(
                        value,
                        from,
                        to
                    );
            }


            /* TEMPERATURE */

            else if (type === "temperature") {

                result =
                    convertTemperature(
                        value,
                        from,
                        to
                    );
            }


            /* AREA */

            else if (type === "area") {

                result =
                    convertArea(
                        value,
                        from,
                        to
                    );
            }


            /* TIME */

            else if (type === "time") {

                result =
                    convertTime(
                        value,
                        from,
                        to
                    );
            }


            /* DATA */

            else if (type === "data") {

                result =
                    convertData(
                        value,
                        from,
                        to
                    );
            }


            /* ERROR CHECK */

            if (!Number.isFinite(result)) {

                unitResult.innerText =
                    "Conversion error.";

                return;
            }


            /* SHOW RESULT */

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

/* ==========================================
   SCIENTIFIC CALCULATOR - PART 1
   CORE CALCULATOR
========================================== */

(() => {

    const page = document.getElementById("scientificCalculatorPage");

    if (!page) return;

    const expressionBox =
        document.getElementById("scientificExpression");

    const answerBox =
        document.getElementById("scientificAnswer");

    const openBtn =
        document.getElementById("openScientificCalculator");

    const closeBtn =
        document.getElementById("closeScientificCalculator");

    let expression = "";
    let answer = 0;

    /* =========================
       OPEN / CLOSE
    ========================= */

    if (openBtn) {
        openBtn.addEventListener("click", () => {

            document.getElementById("homePage").style.display = "none";

            page.style.display = "block";

            document.body.style.overflow = "hidden";

            window.scrollTo(0, 0);
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {

            page.style.display = "none";

            document.getElementById("homePage").style.display = "block";

            document.body.style.overflow = "";
        });
    }

    /* =========================
       DISPLAY
    ========================= */

    function updateDisplay() {

        expressionBox.innerText =
            expression || "0";

        answerBox.innerText =
            String(answer);
    }

    /* =========================
       FACTORIAL
    ========================= */

    function factorial(n) {

        if (!Number.isFinite(n)) {
            throw new Error("Invalid factorial");
        }

        if (n < 0 || !Number.isInteger(n)) {
            throw new Error("Factorial needs a positive integer");
        }

        if (n > 170) {
            throw new Error("Number too large");
        }

        let result = 1;

        for (let i = 2; i <= n; i++) {
            result *= i;
        }

        return result;
    }

    /* =========================
       TOKENIZER
    ========================= */

    function tokenize(text) {

        const tokens = [];

        let i = 0;

        while (i < text.length) {

            const char = text[i];

            if (/\s/.test(char)) {
                i++;
                continue;
            }

            if (/[0-9.]/.test(char)) {

                let number = "";

                while (
                    i < text.length &&
                    /[0-9.]/.test(text[i])
                ) {
                    number += text[i];
                    i++;
                }

                const value = Number(number);

                if (!Number.isFinite(value)) {
                    throw new Error("Invalid number");
                }

                tokens.push({
                    type: "number",
                    value: value
                });

                continue;
            }

            if (char === "π") {

                tokens.push({
                    type: "number",
                    value: Math.PI
                });

                i++;
                continue;
            }

            if (char === "e") {

                tokens.push({
                    type: "number",
                    value: Math.E
                });

                i++;
                continue;
            }

            if (char === "A" && text.slice(i, i + 3) === "Ans") {

                tokens.push({
                    type: "number",
                    value: answer
                });

                i += 3;
                continue;
            }

            if ("+-*/^()!%".includes(char)) {

                tokens.push({
                    type: char,
                    value: char
                });

                i++;
                continue;
            }

            throw new Error("Invalid character");

        }

        return tokens;
    }

    /* =========================
       PARSER
    ========================= */

    function calculate(text) {

        const tokens = tokenize(text);

        let position = 0;

        function current() {
            return tokens[position];
        }

        function eat(type) {

            if (
                current() &&
                current().type === type
            ) {
                position++;
                return true;
            }

            return false;
        }

        function primary() {

            if (eat("+")) {
                return primary();
            }

            if (eat("-")) {
                return -primary();
            }

            if (eat("(")) {

                const value = addSub();

                if (!eat(")")) {
                    throw new Error("Missing )");
                }

                return value;
            }

            if (
                current() &&
                current().type === "number"
            ) {

                const value = current().value;

                position++;

                return value;
            }

            throw new Error("Invalid expression");
        }

        function postfix() {

            let value = primary();

            while (true) {

                if (eat("!")) {
                    value = factorial(value);
                    continue;
                }

                if (eat("%")) {
                    value = value / 100;
                    continue;
                }

                break;
            }

            return value;
        }

        function power() {

            let value = postfix();

            if (eat("^")) {

                const exponent = power();

                value = Math.pow(value, exponent);
            }

            return value;
        }

        function multiplyDivide() {

            let value = power();

            while (true) {

                if (eat("*")) {

                    value *= power();

                } else if (eat("/")) {

                    const divisor = power();

                    if (divisor === 0) {
                        throw new Error("Cannot divide by zero");
                    }

                    value /= divisor;

                } else {

                    break;
                }
            }

            return value;
        }

        function addSub() {

            let value = multiplyDivide();

            while (true) {

                if (eat("+")) {

                    value += multiplyDivide();

                } else if (eat("-")) {

                    value -= multiplyDivide();

                } else {

                    break;
                }
            }

            return value;
        }

        const result = addSub();

        if (position !== tokens.length) {
            throw new Error("Invalid expression");
        }

        if (!Number.isFinite(result)) {
            throw new Error("Math error");
        }

        return result;
    }

    /* =========================
       BUTTON HANDLER
    ========================= */

    page.addEventListener("click", function (event) {

        const button =
            event.target.closest("button");

        if (!button) return;

        const value =
            button.dataset.value;

        const key =
            button.dataset.key;

        /* ---------- NUMBER / OPERATOR ---------- */

        if (value !== undefined) {

            if (value === "^2") {

                expression += "^2";

            } else if (value === "^3") {

                expression += "^3";

            } else {

                expression += value;
            }

            updateDisplay();

            return;
        }

        /* ---------- CLEAR ---------- */

        if (key === "clear") {

            expression = "";

            answer = 0;

            updateDisplay();

            return;
        }

        /* ---------- DELETE ---------- */

        if (key === "delete") {

            expression =
                expression.slice(0, -1);

            updateDisplay();

            return;
        }

        /* ---------- ANS ---------- */

        if (key === "ans") {

            expression += "Ans";

            updateDisplay();

            return;
        }

        /* ---------- EQUALS ---------- */

        if (key === "equals") {

            if (!expression.trim()) {
                return;
            }

            try {

                const result =
                    calculate(expression);

                answer = result;

                answerBox.innerText =
                    Number.isInteger(result)
                        ? result
                        : Number(result.toFixed(12));

            } catch (error) {

                answerBox.innerText =
                    "Math Error";
            }

            return;
        }

        /* ---------- RECIPROCAL ---------- */

        if (key === "reciprocal") {

            try {

                const result =
                    calculate(expression);

                if (result === 0) {
                    answerBox.innerText =
                        "Math Error";
                    return;
                }

                answer = 1 / result;

                answerBox.innerText =
                    Number(answer.toFixed(12));

            } catch {

                answerBox.innerText =
                    "Math Error";
            }

        }

    });

    /* =========================
       INITIAL DISPLAY
    ========================= */

    updateDisplay();

})();

/* ==========================================
   SCIENTIFIC CALCULATOR - PART 2
   SCIENTIFIC FUNCTIONS + MEMORY + HISTORY
========================================== */

(() => {

    const page =
        document.getElementById("scientificCalculatorPage");

    if (!page) return;

    const expressionBox =
        document.getElementById("scientificExpression");

    const answerBox =
        document.getElementById("scientificAnswer");

    const shiftStatus =
        document.getElementById("shiftStatus");

    const alphaStatus =
        document.getElementById("alphaStatus");

    const angleStatus =
        document.getElementById("angleStatus");

    const historyList =
        document.getElementById("scientificHistoryList");

    let memory = 0;
    let shift = false;
    let alpha = false;
    let angle = "DEG";

    let history = [];

    /* =========================
       ANGLE CONVERSION
    ========================= */

    function toRadians(value) {

        if (angle === "DEG") {
            return value * Math.PI / 180;
        }

        if (angle === "GRAD") {
            return value * Math.PI / 200;
        }

        return value;
    }

    function fromRadians(value) {

        if (angle === "DEG") {
            return value * 180 / Math.PI;
        }

        if (angle === "GRAD") {
            return value * 200 / Math.PI;
        }

        return value;
    }

    /* =========================
       FACTORIAL
    ========================= */

    function fact(n) {

        if (
            n < 0 ||
            !Number.isInteger(n) ||
            n > 170
        ) {
            throw new Error("Invalid factorial");
        }

        let r = 1;

        for (let i = 2; i <= n; i++) {
            r *= i;
        }

        return r;
    }

    /* =========================
       TOKENIZER
    ========================= */

    function tokenize(text) {

        const tokens = [];

        let i = 0;

        while (i < text.length) {

            const c = text[i];

            if (/\s/.test(c)) {
                i++;
                continue;
            }

            if (/[0-9.]/.test(c)) {

                let n = "";

                while (
                    i < text.length &&
                    /[0-9.]/.test(text[i])
                ) {
                    n += text[i++];
                }

                const value = Number(n);

                if (!Number.isFinite(value)) {
                    throw new Error("Invalid number");
                }

                tokens.push({
                    type: "number",
                    value
                });

                continue;
            }

            if (text.startsWith("Ans", i)) {

                tokens.push({
                    type: "number",
                    value: answerValue()
                });

                i += 3;
                continue;
            }

            if (c === "π") {

                tokens.push({
                    type: "number",
                    value: Math.PI
                });

                i++;
                continue;
            }

            if (c === "e") {

                tokens.push({
                    type: "number",
                    value: Math.E
                });

                i++;
                continue;
            }

            if (/[a-zA-Z]/.test(c)) {

                let name = "";

                while (
                    i < text.length &&
                    /[a-zA-Z]/.test(text[i])
                ) {
                    name += text[i++];
                }

                tokens.push({
                    type: "function",
                    value: name
                });

                continue;
            }

            if ("+-*/^()!%".includes(c)) {

                tokens.push({
                    type: c,
                    value: c
                });

                i++;
                continue;
            }

            throw new Error("Invalid character");
        }

        return tokens;
    }

    /* =========================
       ANSWER VALUE
    ========================= */

    function answerValue() {

        const n =
            Number(answerBox.innerText);

        return Number.isFinite(n) ? n : 0;
    }

    /* =========================
       SCIENTIFIC PARSER
    ========================= */

    function solve(text) {

        const tokens = tokenize(text);

        let pos = 0;

        function current() {
            return tokens[pos];
        }

        function eat(type) {

            if (
                current() &&
                current().type === type
            ) {
                pos++;
                return true;
            }

            return false;
        }

        function functionValue(name, value) {

            switch (name) {

                case "sin":
                    return Math.sin(toRadians(value));

                case "cos":
                    return Math.cos(toRadians(value));

                case "tan":
                    return Math.tan(toRadians(value));

                case "asin":
                    return fromRadians(Math.asin(value));

                case "acos":
                    return fromRadians(Math.acos(value));

                case "atan":
                    return fromRadians(Math.atan(value));

                case "log":
                    return Math.log10(value);

                case "ln":
                    return Math.log(value);

                case "sqrt":
                    return Math.sqrt(value);

                case "cbrt":
                    return Math.cbrt(value);

                case "abs":
                    return Math.abs(value);

                case "exp":
                    return Math.exp(value);

                default:
                    throw new Error("Unknown function");
            }
        }

        function primary() {

            if (eat("+")) {
                return primary();
            }

            if (eat("-")) {
                return -primary();
            }

            if (eat("(")) {

                const value = addSub();

                if (!eat(")")) {
                    throw new Error("Missing )");
                }

                return value;
            }

            if (
                current() &&
                current().type === "number"
            ) {

                const value =
                    current().value;

                pos++;

                return value;
            }

            if (
                current() &&
                current().type === "function"
            ) {

                const name =
                    current().value;

                pos++;

                if (!eat("(")) {
                    throw new Error("Missing (");
                }

                const value = addSub();

                if (!eat(")")) {
                    throw new Error("Missing )");
                }

                return functionValue(
                    name,
                    value
                );
            }

            throw new Error("Invalid expression");
        }

        function postfix() {

            let value = primary();

            while (true) {

                if (eat("!")) {

                    value = fact(value);
                    continue;
                }

                if (eat("%")) {

                    value /= 100;
                    continue;
                }

                break;
            }

            return value;
        }

        function power() {

            let value = postfix();

            if (eat("^")) {

                value =
                    Math.pow(
                        value,
                        power()
                    );
            }

            return value;
        }

        function multiplyDivide() {

            let value = power();

            while (true) {

                if (eat("*")) {

                    value *= power();

                } else if (eat("/")) {

                    const divisor = power();

                    if (divisor === 0) {
                        throw new Error(
                            "Cannot divide by zero"
                        );
                    }

                    value /= divisor;

                } else {

                    break;
                }
            }

            return value;
        }

        function addSub() {

            let value =
                multiplyDivide();

            while (true) {

                if (eat("+")) {

                    value += multiplyDivide();

                } else if (eat("-")) {

                    value -= multiplyDivide();

                } else {

                    break;
                }
            }

            return value;
        }

        const result = addSub();

        if (pos !== tokens.length) {
            throw new Error("Invalid expression");
        }

        if (!Number.isFinite(result)) {
            throw new Error("Math Error");
        }

        return result;
    }

    /* =========================
       HISTORY
    ========================= */

    function addHistory(expr, result) {

        history.unshift({
            expression: expr,
            result: result
        });

        if (history.length > 20) {
            history.pop();
        }

        renderHistory();
    }

    function renderHistory() {

        if (!historyList) return;

        historyList.innerHTML = "";

        history.forEach(item => {

            const div =
                document.createElement("div");

            div.className =
                "history-item";

            div.innerText =
                item.expression +
                " = " +
                item.result;

            historyList.appendChild(div);
        });
    }

    /* =========================
       SCIENTIFIC EQUALS
    ========================= */

    page.addEventListener("click", function (event) {

        const button =
            event.target.closest("button");

        if (!button) return;

        const key =
            button.dataset.key;

        /* ---------- EQUALS ---------- */

        if (key === "equals") {

            const expr =
                expressionBox.innerText.trim();

            if (!expr || expr === "0") {
                return;
            }

            try {

                const result =
                    solve(expr);

                answerBox.innerText =
                    Number.isInteger(result)
                        ? result
                        : Number(
                            result.toFixed(12)
                        );

                addHistory(
                    expr,
                    answerBox.innerText
                );

            } catch {

                answerBox.innerText =
                    "Math Error";
            }
        }

    });

    /* =========================
       ANGLE BUTTONS
    ========================= */

    page.addEventListener("click", function (event) {

        const button =
            event.target.closest("[data-angle]");

        if (!button) return;

        angle =
            button.dataset.angle;

        if (angleStatus) {
            angleStatus.innerText =
                angle;
        }
    });

    /* =========================
       MEMORY
    ========================= */

    page.addEventListener("click", function (event) {

        const button =
            event.target.closest("button");

        if (!button) return;

        const key =
            button.dataset.key;

        if (key === "memory") {

            try {

                memory +=
                    solve(
                        expressionBox.innerText
                    );

                answerBox.innerText =
                    memory;

            } catch {

                answerBox.innerText =
                    "Math Error";
            }
        }

        if (key === "memoryRecall") {

            expressionBox.innerText =
                String(memory);
        }

    });

    /* =========================
       SHIFT
    ========================= */

    page.addEventListener("click", function (event) {

        const button =
            event.target.closest(
                '[data-key="shift"]'
            );

        if (!button) return;

        shift = !shift;

        if (shiftStatus) {
            shiftStatus.innerText =
                shift ? "SHIFT" : "";
        }
    });

    /* =========================
       ALPHA
    ========================= */

    page.addEventListener("click", function (event) {

        const button =
            event.target.closest(
                '[data-key="alpha"]'
            );

        if (!button) return;

        alpha = !alpha;

        if (alphaStatus) {
            alphaStatus.innerText =
                alpha ? "ALPHA" : "";
        }
    });

    /* =========================
       CLEAR HISTORY
    ========================= */

    const clearHistory =
        document.getElementById(
            "clearScientificHistory"
        );

    if (clearHistory) {

        clearHistory.addEventListener(
            "click",
            function () {

                history = [];

                renderHistory();
            }
        );
    }

})();

      /* ==========================================
   SCIENTIFIC CALCULATOR - PART 3
   EQN + STAT + MATRIX
========================================== */

(() => {

    const page =
        document.getElementById("scientificCalculatorPage");

    if (!page) return;

    /* =========================
       MODE SWITCHING
    ========================= */

    const panels = {
        calculate: document.getElementById("scientificCalcPanel"),
        equation: document.getElementById("scientificEquationPanel"),
        statistics: document.getElementById("scientificStatisticsPanel"),
        matrix: document.getElementById("scientificMatrixPanel")
    };

    function showMode(mode) {

        Object.keys(panels).forEach(name => {

            if (panels[name]) {
                panels[name].style.display =
                    name === mode ? "block" : "none";
            }
        });

        document
            .querySelectorAll("[data-calc-mode]")
            .forEach(btn => {

                btn.classList.toggle(
                    "active",
                    btn.dataset.calcMode === mode
                );
            });
    }

    document
        .querySelectorAll("[data-calc-mode]")
        .forEach(button => {

            button.addEventListener("click", () => {

                showMode(button.dataset.calcMode);
            });
        });

    showMode("calculate");


    /* =========================
       EQUATION MODE
    ========================= */

    const equationSelect =
        document.getElementById("equationModeSelect");

    const linearInputs =
        document.getElementById("linearInputs");

    const quadraticInputs =
        document.getElementById("quadraticInputs");

    function updateEquationMode() {

        const mode =
            equationSelect.value;

        linearInputs.style.display =
            mode === "linear"
                ? "block"
                : "none";

        quadraticInputs.style.display =
            mode === "quadratic"
                ? "block"
                : "none";
    }

    equationSelect.addEventListener(
        "change",
        updateEquationMode
    );

    updateEquationMode();


    /* =========================
       LINEAR EQUATION
       ax + b = c
    ========================= */

    document
        .getElementById("solveLinearEquation")
        .addEventListener("click", () => {

            const a =
                Number(
                    document.getElementById("linearA").value
                );

            const b =
                Number(
                    document.getElementById("linearB").value
                );

            const c =
                Number(
                    document.getElementById("linearC").value
                );

            const output =
                document.getElementById("equationAnswer");

            if (
                !Number.isFinite(a) ||
                !Number.isFinite(b) ||
                !Number.isFinite(c)
            ) {
                output.innerText =
                    "Please enter all values.";
                return;
            }

            if (a === 0 && b === c) {

                output.innerText =
                    "Infinitely many solutions.";

                return;
            }

            if (a === 0) {

                output.innerText =
                    "No solution.";

                return;
            }

            const x =
                (c - b) / a;

            output.innerText =
                "x = " + formatNumber(x);
        });


    /* =========================
       QUADRATIC EQUATION
       ax² + bx + c = 0
    ========================= */

    document
        .getElementById("solveQuadraticEquation")
        .addEventListener("click", () => {

            const a =
                Number(
                    document.getElementById("quadraticA").value
                );

            const b =
                Number(
                    document.getElementById("quadraticB").value
                );

            const c =
                Number(
                    document.getElementById("quadraticC").value
                );

            const output =
                document.getElementById("equationAnswer");

            if (
                !Number.isFinite(a) ||
                !Number.isFinite(b) ||
                !Number.isFinite(c)
            ) {
                output.innerText =
                    "Please enter all values.";
                return;
            }

            if (a === 0) {

                if (b === 0) {

                    output.innerText =
                        c === 0
                            ? "Infinitely many solutions."
                            : "No solution.";

                } else {

                    output.innerText =
                        "Linear solution: x = " +
                        formatNumber(-c / b);
                }

                return;
            }

            const d =
                b * b - 4 * a * c;

            if (d > 0) {

                const x1 =
                    (-b + Math.sqrt(d)) /
                    (2 * a);

                const x2 =
                    (-b - Math.sqrt(d)) /
                    (2 * a);

                output.innerText =
                    "x₁ = " +
                    formatNumber(x1) +
                    "   x₂ = " +
                    formatNumber(x2);

            } else if (d === 0) {

                const x =
                    -b / (2 * a);

                output.innerText =
                    "x = " +
                    formatNumber(x);

            } else {

                const real =
                    -b / (2 * a);

                const imaginary =
                    Math.sqrt(-d) /
                    Math.abs(2 * a);

                output.innerText =
                    "x₁ = " +
                    formatNumber(real) +
                    " + " +
                    formatNumber(imaginary) +
                    "i\n" +
                    "x₂ = " +
                    formatNumber(real) +
                    " − " +
                    formatNumber(imaginary) +
                    "i";
            }
        });


    /* =========================
       STATISTICS
    ========================= */

    document
        .getElementById("calculateStatisticsAdvanced")
        .addEventListener("click", () => {

            const input =
                document.getElementById(
                    "statisticsNumbers"
                ).value;

            const output =
                document.getElementById(
                    "statisticsAnswer"
                );

            const numbers =
                input
                    .split(/[\s,]+/)
                    .map(Number)
                    .filter(Number.isFinite);

            if (!numbers.length) {

                output.innerText =
                    "Please enter valid numbers.";

                return;
            }

            const sorted =
                [...numbers].sort(
                    (a, b) => a - b
                );

            const n =
                numbers.length;

            const sum =
                numbers.reduce(
                    (a, b) => a + b,
                    0
                );

            const mean =
                sum / n;

            const median =
                n % 2
                    ? sorted[Math.floor(n / 2)]
                    : (
                        sorted[n / 2 - 1] +
                        sorted[n / 2]
                    ) / 2;

            const frequencies = {};

            numbers.forEach(x => {
                frequencies[x] =
                    (frequencies[x] || 0) + 1;
            });

            const maxFrequency =
                Math.max(
                    ...Object.values(frequencies)
                );

            let mode = "No mode";

            if (maxFrequency > 1) {

                mode =
                    Object.keys(frequencies)
                        .filter(
                            x =>
                                frequencies[x] ===
                                maxFrequency
                        )
                        .join(", ");
            }

            const variance =
                numbers.reduce(
                    (total, x) =>
                        total +
                        Math.pow(x - mean, 2),
                    0
                ) / n;

            const standardDeviation =
                Math.sqrt(variance);

            output.innerHTML =
                "Count: " + n +
                "<br>Sum: " + formatNumber(sum) +
                "<br>Mean: " + formatNumber(mean) +
                "<br>Median: " + formatNumber(median) +
                "<br>Mode: " + mode +
                "<br>Variance: " + formatNumber(variance) +
                "<br>Standard Deviation: " +
                formatNumber(standardDeviation);
        });


    /* =========================
       MATRIX INPUTS
    ========================= */

    const matrixSize =
        document.getElementById("matrixSize");

    const matrixInputs =
        document.getElementById("matrixInputs");

    function createMatrix() {

        const size =
            Number(matrixSize.value);

        matrixInputs.innerHTML = "";

        for (let i = 0; i < size * size; i++) {

            const input =
                document.createElement("input");

            input.type = "number";
            input.className = "matrix-cell";
            input.placeholder = "0";

            matrixInputs.appendChild(input);
        }
    }

    matrixSize.addEventListener(
        "change",
        createMatrix
    );

    createMatrix();


    /* =========================
       MATRIX DETERMINANT
    ========================= */

    document
        .getElementById("calculateMatrix")
        .addEventListener("click", () => {

            const size =
                Number(matrixSize.value);

            const cells =
                [...document.querySelectorAll(
                    "#matrixInputs .matrix-cell"
                )];

            const values =
                cells.map(input =>
                    Number(input.value || 0)
                );

            let determinant;

            if (size === 2) {

                determinant =
                    values[0] * values[3] -
                    values[1] * values[2];

            } else {

                const a = values[0];
                const b = values[1];
                const c = values[2];
                const d = values[3];
                const e = values[4];
                const f = values[5];
                const g = values[6];
                const h = values[7];
                const i = values[8];

                determinant =
                    a * (e * i - f * h) -
                    b * (d * i - f * g) +
                    c * (d * h - e * g);
            }

            document
                .getElementById("matrixAnswer")
                .innerText =
                    "Determinant = " +
                    formatNumber(determinant);
        });


    /* =========================
       NUMBER FORMAT
    ========================= */

    function formatNumber(value) {

        if (!Number.isFinite(value)) {
            return "Math Error";
        }

        if (Number.isInteger(value)) {
            return String(value);
        }

        return Number(
            value.toFixed(10)
        ).toString();
    }

})();
    
});

                    
