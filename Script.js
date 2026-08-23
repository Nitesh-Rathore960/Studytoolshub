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

    const cgpaBtn =
        document.getElementById("cgpaBtn");

    cgpaBtn.addEventListener("click", function () {

        const gradePoints =
            Number(document.getElementById("gradePoints").value);

        const subjects =
            Number(document.getElementById("subjects").value);

        const result =
            document.getElementById("cgpaResult");

        if (gradePoints <= 0 || subjects <= 0) {
            result.innerText =
                "Please enter valid values.";
            return;
        }

        const cgpa =
            gradePoints / subjects;

        result.innerText =
            "Your CGPA is: " +
            cgpa.toFixed(2);
    });


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

});
