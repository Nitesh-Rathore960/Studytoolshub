/* =========================================
   STUDYTOOLSHUB
   JAVASCRIPT — PART 1
   Core Setup + Header + Theme + Loader
   ========================================= */

"use strict";

/* ---------- Global Helpers ---------- */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

const get = (id) =>
    document.getElementById(id);

const show = (element) => {
    if (element) element.style.display = "";
};

const hide = (element) => {
    if (element) element.style.display = "none";
};


/* ---------- DOM Ready ---------- */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initHeader();
    initTheme();
    initMobileMenu();
    initBackToTop();

});


/* =========================================
   PAGE LOADER
   ========================================= */

function initLoader() {

    const loader = get("pageLoader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hidden");

            setTimeout(() => {
                loader.remove();
            }, 400);

        }, 300);

    });

}


/* =========================================
   HEADER
   ========================================= */

function initHeader() {

    const header = $(".site-header");

    if (!header) return;

    const updateHeader = () => {

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

}


/* =========================================
   MOBILE MENU
   ========================================= */

function initMobileMenu() {

    const menuToggle = get("menuToggle");
    const mainNav = $(".main-nav");

    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("active");
        menuToggle.classList.toggle("active");

        const expanded =
            menuToggle.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            expanded
        );

    });


    /* Close menu after clicking a link */

    $$(".main-nav a").forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================
   THEME SYSTEM
   ========================================= */

function initTheme() {

    const savedTheme =
        localStorage.getItem("studytools-theme");

    const systemDark =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

    const theme =
        savedTheme ||
        (systemDark ? "dark" : "light");

    applyTheme(theme);


    /* Theme buttons */

    const themeButtons = $$(
        "[data-theme-toggle], #themeToggle, .theme-toggle"
    );

    themeButtons.forEach(button => {

        button.addEventListener("click", toggleTheme);

    });

}


/* ---------- Apply Theme ---------- */

function applyTheme(theme) {

    document.documentElement.setAttribute(
        "data-theme",
        theme
    );

    localStorage.setItem(
        "studytools-theme",
        theme
    );

    updateThemeIcons(theme);

}


/* ---------- Toggle Theme ---------- */

function toggleTheme() {

    const current =
        document.documentElement.getAttribute(
            "data-theme"
        ) || "light";

    const next =
        current === "dark"
            ? "light"
            : "dark";

    applyTheme(next);

    showToast(
        next === "dark"
            ? "🌙 Dark mode enabled"
            : "☀️ Light mode enabled"
    );

}


/* ---------- Theme Icons ---------- */

function updateThemeIcons(theme) {

    $$("[data-theme-icon]").forEach(icon => {

        icon.textContent =
            theme === "dark"
                ? "☀️"
                : "🌙";

    });

}


/* =========================================
   BACK TO TOP
   ========================================= */

function initBackToTop() {

    const button = get("backToTop");

    if (!button) return;


    const update = () => {

        if (window.scrollY > 500) {

            button.classList.add("visible");

        } else {

            button.classList.remove("visible");

        }

    };


    update();

    window.addEventListener("scroll", update, {
        passive: true
    });


    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================
   GLOBAL TOAST
   ========================================= */

function showToast(message, type = "info") {

    let toast = get("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.remove(
        "success",
        "error",
        "warning",
        "info"
    );

    toast.classList.add(type);
    toast.classList.add("show");

    clearTimeout(window.studyToastTimer);

    window.studyToastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* Make Toast available to other JS parts */

window.showToast = showToast;


/* =========================================
   SMOOTH ANCHOR SCROLL
   ========================================= */

document.addEventListener("click", event => {

    const link =
        event.target.closest('a[href^="#"]');

    if (!link) return;

    const targetId =
        link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target =
        document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


/* =========================================
   KEYBOARD SHORTCUTS
   ========================================= */

document.addEventListener("keydown", event => {

    /* Ctrl + K / Cmd + K → Search */

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
    ) {

        event.preventDefault();

        const search =
            get("searchInput");

        if (search) {

            search.focus();
            search.select();

        }

    }


    /* Escape → close menus/modals */

    if (event.key === "Escape") {

        const mainNav = $(".main-nav");
        const menuToggle = get("menuToggle");

        if (mainNav) {
            mainNav.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");
            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    }

});


/* =========================================
   ONLINE / OFFLINE STATUS
   ========================================= */

window.addEventListener("offline", () => {

    showToast(
        "📡 You are offline. Some features may be unavailable.",
        "warning"
    );

});

window.addEventListener("online", () => {

    showToast(
        "🌐 Internet connection restored.",
        "success"
    );


 /* =========================================
   JS PART 2
   SEARCH + BASIC CALCULATORS
   ========================================= */


/* =========================================
   GLOBAL CALCULATOR HELPERS
   ========================================= */

function getNumber(id) {
    const element = document.getElementById(id);
    if (!element) return NaN;

    return parseFloat(element.value);
}


function setResult(id, message, type = "success") {

    const element = document.getElementById(id);

    if (!element) return;

    element.textContent = message;

    element.classList.remove(
        "success",
        "error"
    );

    element.classList.add(type);
}


/* =========================================
   SEARCH SYSTEM
   ========================================= */

function initSearch() {

    const input = get("searchInput");
    const button = get("searchButton");

    if (!input) return;

    const searchableItems = $$(
        ".tool-card, .resource-card, .feature-card"
    );


    function performSearch() {

        const query =
            input.value.trim().toLowerCase();

        input.classList.toggle(
            "search-active",
            query.length > 0
        );

        let found = 0;

        searchableItems.forEach(item => {

            const text =
                item.textContent.toLowerCase();

            const match =
                !query || text.includes(query);

            item.style.display =
                match ? "" : "none";

            if (match) found++;

        });


        if (query && found === 0) {

            showToast(
                "🔍 No matching tool found.",
                "warning"
            );

        }

    }


    input.addEventListener(
        "input",
        performSearch
    );


    if (button) {

        button.addEventListener(
            "click",
            performSearch
        );

    }


    input.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            performSearch();
        }

        if (
            event.key === "Escape" &&
            input.value
        ) {

            input.value = "";
            performSearch();

        }

    });

}


document.addEventListener(
    "DOMContentLoaded",
    initSearch
);


/* =========================================
   PERCENTAGE CALCULATOR
   ========================================= */

function initPercentageCalculator() {

    const obtained = get("obtainedMarks");
    const total = get("totalMarks");
    const button = get("calculatePercentage");
    const result = get("percentageResult");

    if (!button) return;


    function calculate() {

        const obtainedValue =
            parseFloat(obtained?.value);

        const totalValue =
            parseFloat(total?.value);


        if (
            isNaN(obtainedValue) ||
            isNaN(totalValue)
        ) {

            setResult(
                "percentageResult",
                "Please enter valid marks.",
                "error"
            );

            return;
        }


        if (totalValue <= 0) {

            setResult(
                "percentageResult",
                "Total marks must be greater than 0.",
                "error"
            );

            return;
        }


        if (
            obtainedValue < 0 ||
            obtainedValue > totalValue
        ) {

            setResult(
                "percentageResult",
                "Obtained marks must be between 0 and total marks.",
                "error"
            );

            return;
        }


        const percentage =
            (obtainedValue / totalValue) * 100;


        setResult(
            "percentageResult",
            `${percentage.toFixed(2)}%`,
            "success"
        );

    }


    button.addEventListener(
        "click",
        calculate
    );

}


document.addEventListener(
    "DOMContentLoaded",
    initPercentageCalculator
);


/* =========================================
   CGPA CALCULATOR
   ========================================= */

function initCGPACalculator() {

    const gradePoints =
        get("gradePoints");

    const subjects =
        get("subjects");

    const button =
        get("calculateCGPA");

    if (!button) return;


    button.addEventListener("click", () => {

        const points =
            gradePoints?.value
                .split(",")
                .map(value => parseFloat(value.trim()))
                .filter(value => !isNaN(value));

        const subjectCount =
            parseInt(subjects?.value);


        if (
            !points ||
            points.length === 0
        ) {

            setResult(
                "cgpaResult",
                "Enter grade points separated by commas.",
                "error"
            );

            return;
        }


        if (
            isNaN(subjectCount) ||
            subjectCount <= 0
        ) {

            setResult(
                "cgpaResult",
                "Enter a valid number of subjects.",
                "error"
            );

            return;
        }


        if (points.length !== subjectCount) {

            setResult(
                "cgpaResult",
                `Enter exactly ${subjectCount} grade points.`,
                "error"
            );

            return;
        }


        if (
            points.some(
                point => point < 0 || point > 10
            )
        ) {

            setResult(
                "cgpaResult",
                "Grade points must be between 0 and 10.",
                "error"
            );

            return;
        }


        const total =
            points.reduce(
                (sum, point) => sum + point,
                0
            );


        const cgpa =
            total / subjectCount;


        setResult(
            "cgpaResult",
            `CGPA: ${cgpa.toFixed(2)}`,
            "success"
        );

    });

}


document.addEventListener(
    "DOMContentLoaded",
    initCGPACalculator
);


/* =========================================
   AGE CALCULATOR
   ========================================= */

function initAgeCalculator() {

    const birthDate =
        get("birthDate");

    const button =
        get("calculateAge");

    if (!button) return;


    button.addEventListener("click", () => {

        if (!birthDate?.value) {

            setResult(
                "ageResult",
                "Please select your birth date.",
                "error"
            );

            return;
        }


        const birth =
            new Date(birthDate.value);

        const today =
            new Date();


        if (birth > today) {

            setResult(
                "ageResult",
                "Birth date cannot be in the future.",
                "error"
            );

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

            days +=
                previousMonth.getDate();

        }


        if (months < 0) {

            years--;
            months += 12;

        }


        setResult(
            "ageResult",
            `${years} Years, ${months} Months, ${days} Days`,
            "success"
        );

    });

}


document.addEventListener(
    "DOMContentLoaded",
    initAgeCalculator
);


/* =========================================
   AVERAGE CALCULATOR
   ========================================= */

function initAverageCalculator() {

    const input =
        get("averageNumbers");

    const button =
        get("calculateAverage");

    if (!button) return;


    button.addEventListener("click", () => {

        const numbers =
            input?.value
                .split(",")
                .map(value => parseFloat(value.trim()))
                .filter(value => !isNaN(value));


        if (!numbers.length) {

            setResult(
                "averageResult",
                "Enter numbers separated by commas.",
                "error"
            );

            return;
        }


        const sum =
            numbers.reduce(
                (total, number) =>
                    total + number,
                0
            );


        const average =
            sum / numbers.length;


        setResult(
            "averageResult",
            `Average: ${average.toFixed(2)}`,
            "success"
        );

    });

}


document.addEventListener(
    "DOMContentLoaded",
    initAverageCalculator
);


/* =========================================
   MARKS & GRADE
   ========================================= */

function initMarksGradeCalculator() {

    const marks =
        get("marksInput");

    const button =
        get("calculateGrade");

    if (!button) return;


    button.addEventListener("click", () => {

        const value =
            parseFloat(marks?.value);


        if (
            isNaN(value) ||
            value < 0 ||
            value > 100
        ) {

            setResult(
                "gradeResult",
                "Enter marks between 0 and 100.",
                "error"
            );

            return;
        }


        let grade;
        let message;


        if (value >= 90) {
            grade = "A+";
            message = "Excellent";
        } else if (value >= 80) {
            grade = "A";
            message = "Very Good";
        } else if (value >= 70) {
            grade = "B";
            message = "Good";
        } else if (value >= 60) {
            grade = "C";
            message = "Average";
        } else if (value >= 50) {
            grade = "D";
            message = "Pass";
        } else {
            grade = "F";
            message = "Needs Improvement";
        }


        setResult(
            "gradeResult",
            `Grade: ${grade} — ${message}`,
            value >= 50 ? "success" : "error"
        );

    });

}


document.addEventListener(
    "DOMContentLoaded",
    initMarksGradeCalculator
);

  /* =========================================
   JS PART 3
   ADVANCED CALCULATORS
   Scientific + Unit + Discount + Interest + BMI
   ========================================= */


/* =========================================
   SCIENTIFIC CALCULATOR
   ========================================= */

function initScientificCalculator() {

    const display = get("scientificDisplay");
    const keys = $$(".scientific-key");

    if (!display || !keys.length) return;

    let expression = "";

    function updateDisplay() {
        display.value = expression || "0";
    }

    function calculateExpression() {

        try {

            let exp = expression
                .replace(/π/g, "Math.PI")
                .replace(/e/g, "Math.E")
                .replace(/√/g, "Math.sqrt")
                .replace(/\^/g, "**")
                .replace(/sin\(/g, "Math.sin(")
                .replace(/cos\(/g, "Math.cos(")
                .replace(/tan\(/g, "Math.tan(")
                .replace(/log\(/g, "Math.log10(")
                .replace(/ln\(/g, "Math.log(");

            const result = Function(
                `"use strict"; return (${exp})`
            )();

            if (!Number.isFinite(result)) {
                throw new Error();
            }

            expression =
                Number(result.toFixed(10)).toString();

            updateDisplay();

        } catch {
            display.value = "Error";
            expression = "";
        }
    }

    keys.forEach(key => {

        key.addEventListener("click", () => {

            const value =
                key.dataset.value ||
                key.textContent.trim();

            if (
                value === "=" ||
                value === "Calculate"
            ) {
                calculateExpression();
                return;
            }

            if (
                value === "C" ||
                value === "AC"
            ) {
                expression = "";
                updateDisplay();
                return;
            }

            if (
                value === "⌫" ||
                value === "DEL"
            ) {
                expression =
                    expression.slice(0, -1);

                updateDisplay();
                return;
            }

            if (value === "x²") {
                expression += "^2";
            } else {
                expression += value;
            }

            updateDisplay();

        });

    });

    updateDisplay();
}


document.addEventListener(
    "DOMContentLoaded",
    initScientificCalculator
);


/* =========================================
   UNIT CONVERTER
   ========================================= */

function initUnitConverter() {

    const category =
        get("unitCategory");

    const from =
        get("fromUnit");

    const to =
        get("toUnit");

    const input =
        get("unitValue");

    const button =
        get("convertUnit");

    if (!category || !from || !to || !button) return;


    const units = {

        length: {
            meter: 1,
            kilometer: 1000,
            centimeter: 0.01,
            millimeter: 0.001,
            mile: 1609.344,
            yard: 0.9144,
            foot: 0.3048,
            inch: 0.0254
        },

        weight: {
            kilogram: 1,
            gram: 0.001,
            milligram: 0.000001,
            pound: 0.45359237,
            ounce: 0.0283495
        },

        time: {
            second: 1,
            minute: 60,
            hour: 3600,
            day: 86400
        },

        data: {
            bit: 1,
            byte: 8,
            kilobyte: 8192,
            megabyte: 8388608,
            gigabyte: 8589934592
        }

    };


    function loadUnits() {

        const type =
            category.value;

        const list =
            units[type];

        if (!list) return;

        from.innerHTML = "";
        to.innerHTML = "";

        Object.keys(list).forEach(unit => {

            const option1 =
                document.createElement("option");

            const option2 =
                document.createElement("option");

            option1.value = unit;
            option2.value = unit;

            option1.textContent = unit;
            option2.textContent = unit;

            from.appendChild(option1);
            to.appendChild(option2);

        });

        if (Object.keys(list).length > 1) {
            to.selectedIndex = 1;
        }

    }


    category.addEventListener(
        "change",
        loadUnits
    );


    button.addEventListener("click", () => {

        const value =
            parseFloat(input?.value);

        if (isNaN(value)) {

            setResult(
                "unitResult",
                "Enter a valid number.",
                "error"
            );

            return;
        }

        const list =
            units[category.value];

        const base =
            value * list[from.value];

        const result =
            base / list[to.value];

        setResult(
            "unitResult",
            `${value} ${from.value} = ${Number(result.toFixed(8))} ${to.value}`,
            "success"
        );

    });


    loadUnits();

}


document.addEventListener(
    "DOMContentLoaded",
    initUnitConverter
);


/* =========================================
   DISCOUNT CALCULATOR
   ========================================= */

function initDiscountCalculator() {

    const price =
        get("originalPrice");

    const discount =
        get("discountPercent");

    const button =
        get("calculateDiscount");

    if (!button) return;


    button.addEventListener("click", () => {

        const original =
            parseFloat(price?.value);

        const percent =
            parseFloat(discount?.value);


        if (
            isNaN(original) ||
            isNaN(percent) ||
            original < 0 ||
            percent < 0 ||
            percent > 100
        ) {

            setResult(
                "discountResult",
                "Enter valid price and discount.",
                "error"
            );

            return;
        }


        const saved =
            original * percent / 100;

        const finalPrice =
            original - saved;


        setResult(
            "discountResult",
            `You save ₹${saved.toFixed(2)} | Final Price: ₹${finalPrice.toFixed(2)}`,
            "success"
        );

    });

}


document.addEventListener(
    "DOMContentLoaded",
    initDiscountCalculator
);


/* =========================================
   SIMPLE INTEREST
   ========================================= */

function initInterestCalculator() {

    const principal =
        get("principalAmount");

    const rate =
        get("interestRate");

    const time =
        get("interestTime");

    const button =
        get("calculateInterest");

    if (!button) return;


    button.addEventListener("click", () => {

        const p =
            parseFloat(principal?.value);

        const r =
            parseFloat(rate?.value);

        const t =
            parseFloat(time?.value);


        if (
            isNaN(p) ||
            isNaN(r) ||
            isNaN(t) ||
            p < 0 ||
            r < 0 ||
            t < 0
        ) {

            setResult(
                "interestResult",
                "Enter valid values.",
                "error"
            );

            return;
        }


        const interest =
            (p * r * t) / 100;

        const total =
            p + interest;


        setResult(
            "interestResult",
            `Interest: ₹${interest.toFixed(2)} | Total: ₹${total.toFixed(2)}`,
            "success"
        );

    });

}


document.addEventListener(
    "DOMContentLoaded",
    initInterestCalculator
);


/* =========================================
   BMI CALCULATOR
   ========================================= */

function initBMICalculator() {

    const weight =
        get("bmiWeight");

    const height =
        get("bmiHeight");

    const button =
        get("calculateBMI");

    if (!button) return;


    button.addEventListener("click", () => {

        const kg =
            parseFloat(weight?.value);

        const cm =
            parseFloat(height?.value);


        if (
            isNaN(kg) ||
            isNaN(cm) ||
            kg <= 0 ||
            cm <= 0
        ) {

            setResult(
                "bmiResult",
                "Enter valid height and weight.",
                "error"
            );

            return;
        }


        const meters =
            cm / 100;

        const bmi =
            kg / (meters * meters);


        let category;


        if (bmi < 18.5) {
            category = "Underweight";
        } else if (bmi < 25) {
            category = "Normal range";
        } else if (bmi < 30) {
            category = "Overweight";
        } else {
            category = "Obesity range";
        }


        setResult(
            "bmiResult",
            `BMI: ${bmi.toFixed(1)} — ${category}`,
            "success"
        );

    });

}


document.addEventListener(
    "DOMContentLoaded",
    initBMICalculator
);

  /* =========================================
   JS PART 4
   STUDY TOOLS
   Timer + Todo + Word Counter + Notes
   ========================================= */


/* =========================================
   POMODORO / STUDY TIMER
   ========================================= */

function initStudyTimer() {

    const display =
        get("timerDisplay");

    const start =
        get("startTimer");

    const pause =
        get("pauseTimer");

    const reset =
        get("resetTimer");

    if (!display || !start) return;


    let totalSeconds = 25 * 60;
    let timer = null;


    function updateTimer() {

        const minutes =
            Math.floor(totalSeconds / 60);

        const seconds =
            totalSeconds % 60;

        display.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    }


    function startTimer() {

        if (timer) return;

        timer = setInterval(() => {

            if (totalSeconds <= 0) {

                clearInterval(timer);
                timer = null;

                showToast(
                    "🎉 Study session completed!",
                    "success"
                );

                return;
            }

            totalSeconds--;
            updateTimer();

        }, 1000);

        showToast(
            "⏱️ Study timer started",
            "success"
        );

    }


    function pauseTimer() {

        if (!timer) return;

        clearInterval(timer);
        timer = null;

        showToast(
            "⏸️ Timer paused"
        );

    }


    function resetTimer() {

        clearInterval(timer);
        timer = null;

        totalSeconds = 25 * 60;

        updateTimer();

        showToast(
            "🔄 Timer reset"
        );

    }


    start.addEventListener(
        "click",
        startTimer
    );

    pause?.addEventListener(
        "click",
        pauseTimer
    );

    reset?.addEventListener(
        "click",
        resetTimer
    );


    updateTimer();

}


document.addEventListener(
    "DOMContentLoaded",
    initStudyTimer
);


/* =========================================
   TODO LIST
   ========================================= */

function initTodoList() {

    const input =
        get("todoInput");

    const addButton =
        get("addTodo");

    const list =
        get("todoList");

    if (!input || !addButton || !list) return;


    let todos =
        JSON.parse(
            localStorage.getItem("studyTodos") || "[]"
        );


    function saveTodos() {

        localStorage.setItem(
            "studyTodos",
            JSON.stringify(todos)
        );

    }


    function renderTodos() {

        list.innerHTML = "";


        if (!todos.length) {

            list.innerHTML = `
                <div class="empty-state">
                    📝 No tasks yet. Add your first task!
                </div>
            `;

            return;
        }


        todos.forEach((todo, index) => {

            const item =
                document.createElement("div");

            item.className =
                `todo-item ${todo.done ? "completed" : ""}`;


            item.innerHTML = `
                <input
                    type="checkbox"
                    ${todo.done ? "checked" : ""}
                    data-index="${index}"
                    class="todo-check"
                >

                <span class="todo-text">
                    ${escapeHTML(todo.text)}
                </span>

                <button
                    type="button"
                    class="delete-todo"
                    data-index="${index}"
                    aria-label="Delete task"
                >
                    🗑️
                </button>
            `;


            list.appendChild(item);

        });

    }


    function addTodo() {

        const text =
            input.value.trim();

        if (!text) {

            showToast(
                "✍️ Enter a task first.",
                "warning"
            );

            return;
        }


        todos.push({
            text,
            done: false,
            createdAt: Date.now()
        });


        input.value = "";

        saveTodos();
        renderTodos();

    }


    addButton.addEventListener(
        "click",
        addTodo
    );


    input.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            addTodo();
        }

    });


    list.addEventListener("click", event => {

        const checkbox =
            event.target.closest(".todo-check");

        const deleteButton =
            event.target.closest(".delete-todo");


        if (checkbox) {

            const index =
                Number(checkbox.dataset.index);

            todos[index].done =
                checkbox.checked;

            saveTodos();
            renderTodos();

        }


        if (deleteButton) {

            const index =
                Number(deleteButton.dataset.index);

            todos.splice(index, 1);

            saveTodos();
            renderTodos();

        }

    });


    renderTodos();

}


document.addEventListener(
    "DOMContentLoaded",
    initTodoList
);


/* =========================================
   WORD COUNTER
   ========================================= */

function initWordCounter() {

    const input =
        get("wordCounterInput");

    if (!input) return;


    const words =
        get("wordCount");

    const characters =
        get("characterCount");

    const sentences =
        get("sentenceCount");

    const paragraphs =
        get("paragraphCount");


    function updateCounter() {

        const text =
            input.value;


        const trimmed =
            text.trim();


        const wordCount =
            trimmed
                ? trimmed.split(/\s+/).length
                : 0;


        const characterCount =
            text.length;


        const sentenceCount =
            trimmed
                ? (trimmed.match(/[.!?]+/g) || []).length
                : 0;


        const paragraphCount =
            trimmed
                ? trimmed.split(/\n\s*\n/).length
                : 0;


        if (words) {
            words.textContent = wordCount;
        }

        if (characters) {
            characters.textContent = characterCount;
        }

        if (sentences) {
            sentences.textContent = sentenceCount;
        }

        if (paragraphs) {
            paragraphs.textContent = paragraphCount;
        }

    }


    input.addEventListener(
        "input",
        updateCounter
    );


    updateCounter();

}


document.addEventListener(
    "DOMContentLoaded",
    initWordCounter
);


/* =========================================
   QUICK NOTES
   ========================================= */

function initQuickNotes() {

    const notes =
        get("quickNotes");

    if (!notes) return;


    const saved =
        localStorage.getItem(
            "studyQuickNotes"
        );


    if (saved !== null) {
        notes.value = saved;
    }


    notes.addEventListener(
        "input",
        () => {

            localStorage.setItem(
                "studyQuickNotes",
                notes.value
            );

        }
    );


    const clearButton =
        get("clearNotes");


    clearButton?.addEventListener(
        "click",
        () => {

            notes.value = "";

            localStorage.removeItem(
                "studyQuickNotes"
            );

            showToast(
                "🗑️ Notes cleared"
            );

        }
    );

}


/* =========================================
   HTML SAFE TEXT
   ========================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


document.addEventListener(
    "DOMContentLoaded",
    initQuickNotes
);

    /* =========================================
   JS PART 5
   QUIZ + FLASHCARDS + STUDY PROGRESS
   ========================================= */


/* =========================================
   QUIZ SYSTEM
   ========================================= */

function initQuiz() {

    const question =
        get("quizQuestion");

    const options =
        get("quizOptions");

    const nextButton =
        get("nextQuiz");

    const scoreElement =
        get("quizScore");

    if (!question || !options) return;


    const questions = [
        {
            q: "Which language is mainly used to structure a web page?",
            options: ["CSS", "HTML", "JavaScript", "C++"],
            answer: 1
        },
        {
            q: "Which language is used for styling web pages?",
            options: ["HTML", "CSS", "C", "Python"],
            answer: 1
        },
        {
            q: "Which symbol is used for a single-line comment in JavaScript?",
            options: ["//", "##", "<!--", "**"],
            answer: 0
        },
        {
            q: "What does CPU stand for?",
            options: [
                "Central Processing Unit",
                "Computer Personal Unit",
                "Central Program Utility",
                "Control Processing User"
            ],
            answer: 0
        },
        {
            q: "Which data structure follows FIFO?",
            options: [
                "Stack",
                "Queue",
                "Tree",
                "Graph"
            ],
            answer: 1
        }
    ];


    let current = 0;
    let score = 0;
    let answered = false;


    function renderQuestion() {

        const item =
            questions[current];

        answered = false;

        question.textContent =
            `${current + 1}. ${item.q}`;

        options.innerHTML = "";


        item.options.forEach((option, index) => {

            const button =
                document.createElement("button");

            button.type = "button";
            button.className = "quiz-option";
            button.textContent = option;

            button.addEventListener(
                "click",
                () => checkAnswer(
                    button,
                    index
                )
            );

            options.appendChild(button);

        });


        if (scoreElement) {

            scoreElement.textContent =
                `Score: ${score}/${questions.length}`;

        }

    }


    function checkAnswer(button, index) {

        if (answered) return;

        answered = true;

        const correct =
            questions[current].answer;


        const allOptions =
            $$(".quiz-option", options);


        allOptions.forEach((item, i) => {

            item.disabled = true;

            if (i === correct) {
                item.classList.add("correct");
            }

        });


        if (index === correct) {

            score++;

            button.classList.add("correct");

            showToast(
                "✅ Correct answer!",
                "success"
            );

        } else {

            button.classList.add("wrong");

            showToast(
                "❌ Wrong answer",
                "error"
            );

        }


        if (scoreElement) {

            scoreElement.textContent =
                `Score: ${score}/${questions.length}`;

        }

    }


    nextButton?.addEventListener(
        "click",
        () => {

            current++;

            if (current >= questions.length) {

                question.textContent =
                    `🎉 Quiz Complete! Final Score: ${score}/${questions.length}`;

                options.innerHTML = "";

                nextButton.textContent =
                    "Restart Quiz";

                current = -1;

                return;

            }

            nextButton.textContent =
                "Next Question";

            renderQuestion();

        }
    );


    renderQuestion();

}


document.addEventListener(
    "DOMContentLoaded",
    initQuiz
);


/* =========================================
   FLASHCARDS
   ========================================= */

function initFlashcards() {

    const container =
        get("flashcardsContainer");

    if (!container) return;


    const cards = [
        {
            front: "What is HTML?",
            back: "HTML is used to structure web pages."
        },
        {
            front: "What is CSS?",
            back: "CSS is used to style and design web pages."
        },
        {
            front: "What is JavaScript?",
            back: "JavaScript adds logic and interactivity to web pages."
        },
        {
            front: "What is an Algorithm?",
            back: "A step-by-step procedure for solving a problem."
        }
    ];


    container.innerHTML = "";


    cards.forEach(card => {

        const element =
            document.createElement("div");

        element.className =
            "flashcard";


        element.innerHTML = `
            <div class="flashcard-inner">

                <div class="flashcard-front">
                    <strong>${escapeHTML(card.front)}</strong>
                    <small>Tap to reveal</small>
                </div>

                <div class="flashcard-back">
                    <span>${escapeHTML(card.back)}</span>
                </div>

            </div>
        `;


        element.addEventListener(
            "click",
            () => {

                element.classList.toggle(
                    "flipped"
                );

            }
        );


        container.appendChild(element);

    });

}


document.addEventListener(
    "DOMContentLoaded",
    initFlashcards
);


/* =========================================
   STUDY PROGRESS
   ========================================= */

function initStudyProgress() {

    const input =
        get("studyProgressInput");

    const updateButton =
        get("updateProgress");

    const progressBar =
        get("studyProgressBar");

    const progressText =
        get("studyProgressText");


    if (!input || !updateButton) return;


    const saved =
        localStorage.getItem(
            "studyProgress"
        );


    if (saved !== null) {

        input.value = saved;

        updateProgress(
            Number(saved)
        );

    }


    updateButton.addEventListener(
        "click",
        () => {

            let value =
                parseFloat(input.value);


            if (
                isNaN(value) ||
                value < 0 ||
                value > 100
            ) {

                showToast(
                    "Enter progress between 0 and 100.",
                    "warning"
                );

                return;
            }


            value =
                Math.round(value);


            localStorage.setItem(
                "studyProgress",
                value
            );


            updateProgress(value);

            showToast(
                `📈 Progress updated to ${value}%`,
                "success"
            );

        }
    );


    function updateProgress(value) {

        if (progressBar) {

            progressBar.style.width =
                `${value}%`;

        }

        if (progressText) {

            progressText.textContent =
                `${value}%`;

        }

    }

}


document.addEventListener(
    "DOMContentLoaded",
    initStudyProgress
);


/* =========================================
   STUDY SESSION COUNTER
   ========================================= */

function initStudySessionCounter() {

    const counter =
        get("studySessionCount");

    const button =
        get("completeStudySession");

    if (!counter || !button) return;


    let sessions =
        Number(
            localStorage.getItem(
                "studySessions"
            ) || 0
        );


    counter.textContent =
        sessions;


    button.addEventListener(
        "click",
        () => {

            sessions++;

            localStorage.setItem(
                "studySessions",
                sessions
            );

            counter.textContent =
                sessions;

            showToast(
                "🔥 Study session completed!",
                "success"
            );

        }
    );

}


document.addEventListener(
    "DOMContentLoaded",
    initStudySessionCounter
);

   /* =========================================
   JS PART 6
   HTML / CSS / JS EDITOR
   ========================================= */

function initCodeEditor() {

    const editorPage = get("editorPage");

    const htmlCode = get("htmlCode");
    const cssCode = get("cssCode");
    const jsCode = get("jsCode");

    const preview = get("codePreview");

    const runButton = get("runCode");
    const clearButton = get("clearCode");
    const copyButton = get("copyCode");
    const downloadButton = get("downloadCode");

    if (
        !editorPage ||
        !htmlCode ||
        !cssCode ||
        !jsCode ||
        !preview
    ) return;


    /* ---------- Open Editor ---------- */

    const openEditor = get("openEditor");

    openEditor?.addEventListener("click", () => {

        editorPage.style.display = "block";

        document.body.classList.add(
            "tool-page-open"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        runCode();

    });


    /* ---------- Close Editor ---------- */

    const closeEditor =
        get("closeEditor");

    closeEditor?.addEventListener(
        "click",
        () => {

            editorPage.style.display = "none";

            document.body.classList.remove(
                "tool-page-open"
            );

        }
    );


    /* ---------- Run Code ---------- */

    function runCode() {

        const html =
            htmlCode.value;

        const css =
            cssCode.value;

        const js =
            jsCode.value;


        const fullCode = `
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
try {
${js}
} catch(error) {
    document.body.insertAdjacentHTML(
        "beforeend",
        "<pre style='color:red;padding:15px;'>" +
        error.message +
        "</pre>"
    );
}
<\/script>

</body>
</html>
`;


        preview.srcdoc =
            fullCode;

    }


    runButton?.addEventListener(
        "click",
        runCode
    );


    /* ---------- Clear Editor ---------- */

    clearButton?.addEventListener(
        "click",
        () => {

            if (
                !confirm(
                    "Clear all editor code?"
                )
            ) return;


            htmlCode.value = "";
            cssCode.value = "";
            jsCode.value = "";

            preview.srcdoc = "";

            showToast(
                "🗑️ Editor cleared"
            );

        }
    );


    /* ---------- Copy Code ---------- */

    copyButton?.addEventListener(
        "click",
        async () => {

            const combined =
                `${htmlCode.value}\n\n${cssCode.value}\n\n${jsCode.value}`;


            try {

                await navigator.clipboard.writeText(
                    combined
                );

                showToast(
                    "📋 Code copied!",
                    "success"
                );

            } catch {

                showToast(
                    "Unable to copy code.",
                    "error"
                );

            }

        }
    );


    /* ---------- Download Code ---------- */

    downloadButton?.addEventListener(
        "click",
        () => {

            const html =
                htmlCode.value;

            const css =
                cssCode.value;

            const js =
                jsCode.value;


            const finalHTML = `
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width, initial-scale=1.0"
>

<title>My StudyToolsHub Project</title>

<style>
${css}
</style>

</head>

<body>

${html}

<script>
${js}
<\/script>

</body>

</html>
`;


            const blob =
                new Blob(
                    [finalHTML],
                    {
                        type: "text/html"
                    }
                );


            const url =
                URL.createObjectURL(blob);


            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                "studytoolshub-project.html";

            document.body.appendChild(link);

            link.click();

            link.remove();

            URL.revokeObjectURL(url);


            showToast(
                "⬇️ HTML file downloaded!",
                "success"
            );

        }
    );


    /* ---------- Auto Save ---------- */

    const editorData =
        JSON.parse(
            localStorage.getItem(
                "studyEditorData"
            ) || "{}"
        );


    if (editorData.html !== undefined) {
        htmlCode.value = editorData.html;
    }

    if (editorData.css !== undefined) {
        cssCode.value = editorData.css;
    }

    if (editorData.js !== undefined) {
        jsCode.value = editorData.js;
    }


    function saveEditor() {

        localStorage.setItem(
            "studyEditorData",
            JSON.stringify({
                html: htmlCode.value,
                css: cssCode.value,
                js: jsCode.value
            })
        );

    }


    [htmlCode, cssCode, jsCode]
        .forEach(textarea => {

            textarea.addEventListener(
                "input",
                saveEditor
            );

        });


    /* ---------- Tab Key Support ---------- */

    [htmlCode, cssCode, jsCode]
        .forEach(textarea => {

            textarea.addEventListener(
                "keydown",
                event => {

                    if (event.key !== "Tab") return;

                    event.preventDefault();

                    const start =
                        textarea.selectionStart;

                    const end =
                        textarea.selectionEnd;


                    textarea.value =
                        textarea.value.substring(
                            0,
                            start
                        ) +
                        "    " +
                        textarea.value.substring(
                            end
                        );


                    textarea.selectionStart =
                        textarea.selectionEnd =
                        start + 4;

                    saveEditor();

                }
            );

        });

}


document.addEventListener(
    "DOMContentLoaded",
    initCodeEditor
);

    /* =========================================
   JS PART 7
   C / C++ COMPILER
   ========================================= */

function initCompiler() {

    const compilerPage =
        get("compilerPage");

    const compilerCode =
        get("compilerCode");

    const compilerOutput =
        get("compilerOutput");

    const language =
        get("compilerLanguage");

    const runButton =
        get("runCompiler");

    const clearButton =
        get("clearCompiler");

    const downloadButton =
        get("downloadCompilerCode");

    const lineCount =
        get("compilerLineCount");

    const clearOutput =
        get("clearCompilerOutput");


    if (
        !compilerPage ||
        !compilerCode ||
        !compilerOutput
    ) return;


    /* ---------- Open Compiler ---------- */

    const openCompiler =
        get("openCompiler");

    openCompiler?.addEventListener(
        "click",
        () => {

            compilerPage.style.display =
                "block";

            document.body.classList.add(
                "tool-page-open"
            );

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            updateLineCount();

        }
    );


    /* ---------- Close Compiler ---------- */

    const closeCompiler =
        get("closeCompiler");

    closeCompiler?.addEventListener(
        "click",
        () => {

            compilerPage.style.display =
                "none";

            document.body.classList.remove(
                "tool-page-open"
            );

        }
    );


    /* ---------- Line Counter ---------- */

    function updateLineCount() {

        if (!lineCount) return;

        const lines =
            compilerCode.value.split("\n").length;

        lineCount.textContent =
            `${lines} line${lines === 1 ? "" : "s"}`;

    }


    compilerCode.addEventListener(
        "input",
        updateLineCount
    );


    /* ---------- Tab Support ---------- */

    compilerCode.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Tab") return;

            event.preventDefault();

            const start =
                compilerCode.selectionStart;

            const end =
                compilerCode.selectionEnd;


            compilerCode.value =
                compilerCode.value.substring(
                    0,
                    start
                ) +
                "    " +
                compilerCode.value.substring(
                    end
                );


            compilerCode.selectionStart =
                compilerCode.selectionEnd =
                start + 4;


            updateLineCount();

        }
    );


    /* ---------- Auto Save ---------- */

    const savedCode =
        localStorage.getItem(
            "studyCompilerCode"
        );


    if (
        savedCode &&
        compilerCode.value.trim() === ""
    ) {

        compilerCode.value =
            savedCode;

    }


    compilerCode.addEventListener(
        "input",
        () => {

            localStorage.setItem(
                "studyCompilerCode",
                compilerCode.value
            );

        }
    );


    /* ---------- Run ---------- */

    runButton?.addEventListener(
        "click",
        () => {

            const code =
                compilerCode.value.trim();

            if (!code) {

                compilerOutput.textContent =
                    "⚠️ Write some C/C++ code first.";

                return;
            }


            /*
             * Browser cannot directly compile
             * C/C++ source code.
             */

            compilerOutput.textContent =
                "▶ Code submitted.\n\n" +
                "Language: " +
                (
                    language?.value === "cpp"
                        ? "C++"
                        : "C"
                ) +
                "\n\n" +
                "⚠️ Online execution backend is required " +
                "for real compilation.\n\n" +
                "Your code is ready to be connected " +
                "to a secure compiler API.";

            showToast(
                "⚡ Compiler request prepared",
                "success"
            );

        }
    );


    /* ---------- Clear Code ---------- */

    clearButton?.addEventListener(
        "click",
        () => {

            compilerCode.value = "";

            localStorage.removeItem(
                "studyCompilerCode"
            );

            updateLineCount();

            showToast(
                "🗑️ Compiler code cleared"
            );

        }
    );


    /* ---------- Clear Output ---------- */

    clearOutput?.addEventListener(
        "click",
        () => {

            compilerOutput.textContent =
                "Output will appear here...";

        }
    );


    /* ---------- Download Code ---------- */

    downloadButton?.addEventListener(
        "click",
        () => {

            const code =
                compilerCode.value;

            if (!code.trim()) {

                showToast(
                    "⚠️ No code to download.",
                    "warning"
                );

                return;
            }


            const extension =
                language?.value === "cpp"
                    ? "cpp"
                    : "c";


            const blob =
                new Blob(
                    [code],
                    {
                        type: "text/plain"
                    }
                );


            const url =
                URL.createObjectURL(blob);


            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                `study-code.${extension}`;


            document.body.appendChild(link);

            link.click();

            link.remove();

            URL.revokeObjectURL(url);


            showToast(
                "⬇️ Code downloaded!",
                "success"
            );

        }
    );


    updateLineCount();

}


document.addEventListener(
    "DOMContentLoaded",
    initCompiler
);

    /* =========================================
   JS PART 8
   RESOURCES + MODALS + QUICK ACCESS
   ========================================= */


/* =========================================
   GENERIC TOOL MODAL
   ========================================= */

function initToolModal() {

    const modal =
        get("toolModal");

    const overlay =
        get("toolModalOverlay");

    const content =
        get("toolModalContent");

    const close =
        get("closeToolModal");

    if (!modal || !content) return;


    function openTool(title, text) {

        content.innerHTML = `
            <div class="modal-tool-content">

                <h2>${escapeHTML(title)}</h2>

                <p>${escapeHTML(text)}</p>

                <div class="modal-actions">

                    <button
                        type="button"
                        class="primary-btn"
                        id="modalGotIt"
                    >
                        Got it
                    </button>

                </div>

            </div>
        `;

        modal.classList.add("active");

        if (overlay) {
            overlay.classList.add("active");
        }


        get("modalGotIt")?.addEventListener(
            "click",
            closeTool
        );

    }


    function closeTool() {

        modal.classList.remove("active");

        overlay?.classList.remove("active");

    }


    close?.addEventListener(
        "click",
        closeTool
    );

    overlay?.addEventListener(
        "click",
        event => {

            if (
                event.target === overlay
            ) {
                closeTool();
            }

        }
    );


    /* Resource buttons */

    get("resourceNotes")?.addEventListener(
        "click",
        () => openTool(
            "📚 Notes",
            "Organize your subject notes and revision material here."
        )
    );


    get("importantQuestions")?.addEventListener(
        "click",
        () => openTool(
            "❓ Important Questions",
            "Keep important exam questions organized subject-wise."
        )
    );


    get("previousQuestions")?.addEventListener(
        "click",
        () => openTool(
            "📝 Previous Year Questions",
            "Use previous year papers for focused exam preparation."
        )
    );


    get("studyMaterial")?.addEventListener(
        "click",
        () => openTool(
            "📖 Study Material",
            "Your study material hub can be organized here."
        )
    );

}


document.addEventListener(
    "DOMContentLoaded",
    initToolModal
);


/* =========================================
   ACCOUNT MODAL
   ========================================= */

function initAccountModal() {

    const modal =
        get("accountModal");

    const overlay =
        get("accountModalOverlay");

    const close =
        get("closeAccountModal");

    const accountButton =
        get("accountButton");

    const loginButton =
        get("loginButton");

    if (!modal) return;


    function openAccount() {

        modal.classList.add("active");

        overlay?.classList.add(
            "active"
        );

    }


    function closeAccount() {

        modal.classList.remove(
            "active"
        );

        overlay?.classList.remove(
            "active"
        );

    }


    accountButton?.addEventListener(
        "click",
        openAccount
    );


    loginButton?.addEventListener(
        "click",
        openAccount
    );


    close?.addEventListener(
        "click",
        closeAccount
    );


    overlay?.addEventListener(
        "click",
        event => {

            if (
                event.target === overlay
            ) {
                closeAccount();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("active")
            ) {
                closeAccount();
            }

        }
    );

}


document.addEventListener(
    "DOMContentLoaded",
    initAccountModal
);


/* =========================================
   QUICK ACCESS BUTTONS
   ========================================= */

function initQuickAccess() {

    $$(".quick-access-card, .quick-card")
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    const target =
                        card.dataset.target;

                    if (!target) return;

                    const element =
                        document.getElementById(
                            target
                        );

                    element?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });

}


document.addEventListener(
    "DOMContentLoaded",
    initQuickAccess
);


/* =========================================
   FAVORITES
   ========================================= */

function initFavorites() {

    const cards =
        $$(".tool-card");

    if (!cards.length) return;


    let favorites =
        JSON.parse(
            localStorage.getItem(
                "studyFavorites"
            ) || "[]"
        );


    cards.forEach((card, index) => {

        const title =
            card.querySelector("h3")
                ?.textContent
                .trim() ||
            `tool-${index}`;


        const button =
            card.querySelector(
                ".favorite-btn"
            );


        if (!button) return;


        if (
            favorites.includes(title)
        ) {
            button.classList.add(
                "active"
            );
        }


        button.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();


                if (
                    favorites.includes(title)
                ) {

                    favorites =
                        favorites.filter(
                            item =>
                                item !== title
                        );

                    button.classList.remove(
                        "active"
                    );

                    showToast(
                        "☆ Removed from favorites"
                    );

                } else {

                    favorites.push(title);

                    button.classList.add(
                        "active"
                    );

                    showToast(
                        "⭐ Added to favorites",
                        "success"
                    );

                }


                localStorage.setItem(
                    "studyFavorites",
                    JSON.stringify(favorites)
                );

            }
        );

    });

}


document.addEventListener(
    "DOMContentLoaded",
    initFavorites
);


/* =========================================
   COPY BUTTONS
   ========================================= */

document.addEventListener(
    "click",
    async event => {

        const button =
            event.target.closest(
                "[data-copy]"
            );

        if (!button) return;


        const text =
            button.dataset.copy;


        if (!text) return;


        try {

            await navigator.clipboard.writeText(
                text
            );

            showToast(
                "📋 Copied!",
                "success"
            );

        } catch {

            showToast(
                "Copy failed.",
                "error"
            );

        }

    }
);


/* =========================================
   GENERIC TOOL OPENING
   ========================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-tool]"
            );

        if (!button) return;


        const target =
            button.dataset.tool;


        const section =
            document.getElementById(
                target
            );


        if (!section) return;


        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);

    /* =========================================================
   STUDYTOOLSHUB - JS PART 9
   Code Snippets + Programming Notes + Recent Tools
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Recent Tools ---------- */

    const recentToolsKey = "studyRecentTools";

    function saveRecentTool(name) {
        let recent = JSON.parse(localStorage.getItem(recentToolsKey) || "[]");

        recent = recent.filter(item => item !== name);
        recent.unshift(name);

        if (recent.length > 6) {
            recent = recent.slice(0, 6);
        }

        localStorage.setItem(recentToolsKey, JSON.stringify(recent));
    }

    document.querySelectorAll(".tool-card").forEach(card => {
        card.addEventListener("click", () => {
            const title = card.querySelector("h3");

            if (title) {
                saveRecentTool(title.textContent.trim());
            }
        });
    });


    /* ---------- Code Snippets ---------- */

    const snippetData = {

        "html-basic": {
            title: "HTML Basic Structure",
            code:
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
</head>
<body>

    <h1>Hello World!</h1>

</body>
</html>`
        },

        "css-card": {
            title: "CSS Card",
            code:
`.card {
    width: 300px;
    padding: 20px;
    border-radius: 15px;
    background: white;
    box-shadow: 0 8px 25px rgba(0,0,0,0.12);
}

.card h2 {
    margin-bottom: 10px;
}`
        },

        "js-button": {
            title: "JavaScript Button",
            code:
`const button = document.querySelector("#myButton");

button.addEventListener("click", () => {
    alert("Button clicked!");
});`
        },

        "cpp-input": {
            title: "C++ User Input",
            code:
`#include <iostream>
using namespace std;

int main() {

    int number;

    cout << "Enter number: ";
    cin >> number;

    cout << "You entered: "
         << number;

    return 0;
}`
        },

        "cpp-loop": {
            title: "C++ For Loop",
            code:
`#include <iostream>
using namespace std;

int main() {

    for(int i = 1; i <= 10; i++) {
        cout << i << endl;
    }

    return 0;
}`
        }
    };


    function openSnippet(key) {

        const snippet = snippetData[key];

        if (!snippet) return;

        const modal = document.getElementById("toolModal");
        const overlay = document.getElementById("toolModalOverlay");
        const content = document.getElementById("toolModalContent");

        if (!modal || !overlay || !content) return;

        content.innerHTML = `
            <div class="snippet-view">
                <h2>${escapeHTML(snippet.title)}</h2>

                <pre class="snippet-code"><code>${escapeHTML(
                    snippet.code
                )}</code></pre>

                <div class="modal-actions">
                    <button class="primary-btn" id="copySnippet">
                        📋 Copy Code
                    </button>

                    <button class="secondary-btn" id="closeSnippet">
                        Close
                    </button>
                </div>
            </div>
        `;

        modal.classList.add("active");
        overlay.classList.add("active");

        document.getElementById("copySnippet")
            ?.addEventListener("click", async () => {

                try {
                    await navigator.clipboard.writeText(snippet.code);
                    showToast("Code copied successfully!");
                } catch {
                    showToast("Copy failed");
                }

            });

        document.getElementById("closeSnippet")
            ?.addEventListener("click", closeToolModal);
    }


    /* ---------- Snippet Buttons ---------- */

    document.querySelectorAll("[data-snippet]").forEach(button => {

        button.addEventListener("click", () => {

            const key = button.dataset.snippet;

            openSnippet(key);

            saveRecentTool(
                button.textContent.trim() || "Code Snippet"
            );
        });

    });


    /* ---------- Programming Notes ---------- */

    const programmingNotes = {

        cpp: `
            <h2>💻 C++ Programming Notes</h2>

            <h3>Variables</h3>
            <p>
                Variables store data that can be used by a program.
            </p>

            <pre><code>int age = 20;
float marks = 85.5;
char grade = 'A';</code></pre>

            <h3>Conditions</h3>

            <pre><code>if(age >= 18) {
    cout << "Adult";
} else {
    cout << "Minor";
}</code></pre>

            <h3>Loops</h3>

            <pre><code>for(int i = 1; i <= 5; i++) {
    cout << i << endl;
}</code></pre>

            <h3>Functions</h3>

            <pre><code>int add(int a, int b) {
    return a + b;
}</code></pre>
        `,

        html: `
            <h2>🌐 HTML Notes</h2>

            <h3>HTML Basics</h3>

            <p>
                HTML is used to create the structure of a webpage.
            </p>

            <pre><code>&lt;h1&gt;Heading&lt;/h1&gt;
&lt;p&gt;Paragraph&lt;/p&gt;
&lt;button&gt;Click Me&lt;/button&gt;</code></pre>

            <h3>Links</h3>

            <pre><code>&lt;a href="https://example.com"&gt;
    Visit Website
&lt;/a&gt;</code></pre>
        `,

        css: `
            <h2>🎨 CSS Notes</h2>

            <h3>Selectors</h3>

            <pre><code>p {
    color: red;
}

.card {
    padding: 20px;
}

#title {
    font-size: 30px;
}</code></pre>

            <h3>Flexbox</h3>

            <pre><code>.container {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
}</code></pre>
        `,

        javascript: `
            <h2>⚡ JavaScript Notes</h2>

            <h3>Variables</h3>

            <pre><code>let name = "Nitesh";
const age = 20;</code></pre>

            <h3>Function</h3>

            <pre><code>function greet() {
    console.log("Hello!");
}

greet();</code></pre>

            <h3>Event</h3>

            <pre><code>button.addEventListener("click", () => {
    alert("Hello!");
});</code></pre>
        `
    };


    function openProgrammingNotes(type) {

        const content = document.getElementById("toolModalContent");
        const modal = document.getElementById("toolModal");
        const overlay = document.getElementById("toolModalOverlay");

        if (!content || !modal || !overlay) return;

        const note = programmingNotes[type];

        if (!note) return;

        content.innerHTML = `
            <div class="programming-notes">
                ${note}

                <div class="modal-actions">
                    <button class="secondary-btn" id="closeNotes">
                        Close
                    </button>
                </div>
            </div>
        `;

        modal.classList.add("active");
        overlay.classList.add("active");

        document.getElementById("closeNotes")
            ?.addEventListener("click", closeToolModal);

        saveRecentTool(type.toUpperCase() + " Notes");
    }


    /* ---------- Note Buttons ---------- */

    document.querySelectorAll("[data-notes]").forEach(button => {

        button.addEventListener("click", () => {

            openProgrammingNotes(button.dataset.notes);

        });

    });


    /* ---------- Global Data Tool Support ---------- */

    document.querySelectorAll("[data-open-notes]").forEach(button => {

        button.addEventListener("click", () => {

            openProgrammingNotes(
                button.dataset.openNotes
            );

        });

    });


    /* ---------- Resource Buttons ---------- */

    const resourceContent = {

        notes: `
            <h2>📚 Study Notes</h2>
            <p>
                Subject-wise notes can be added here for students.
            </p>
            <ul>
                <li>Computer Science</li>
                <li>Programming</li>
                <li>Data Structures</li>
                <li>Database</li>
                <li>Operating System</li>
            </ul>
        `,

        important: `
            <h2>⭐ Important Questions</h2>
            <p>
                Important exam questions can be organized
                subject-wise here.
            </p>
        `,

        previous: `
            <h2>📝 Previous Year Questions</h2>
            <p>
                Previous year question papers can be organized
                by semester and subject.
            </p>
        `,

        material: `
            <h2>📖 Study Material</h2>
            <p>
                Study material, references and learning resources
                can be added here.
            </p>
        `
    };


    function openResource(type) {

        const content = document.getElementById("toolModalContent");
        const modal = document.getElementById("toolModal");
        const overlay = document.getElementById("toolModalOverlay");

        if (!content || !modal || !overlay) return;

        content.innerHTML = `
            <div class="resource-view">
                ${resourceContent[type] || `
                    <h2>Resource</h2>
                    <p>Content coming soon.</p>
                `}

                <div class="modal-actions">
                    <button class="secondary-btn" id="closeResource">
                        Close
                    </button>
                </div>
            </div>
        `;

        modal.classList.add("active");
        overlay.classList.add("active");

        document.getElementById("closeResource")
            ?.addEventListener("click", closeToolModal);
    }


    document.getElementById("resourceNotes")
        ?.addEventListener("click", () => openResource("notes"));

    document.getElementById("importantQuestions")
        ?.addEventListener("click", () => openResource("important"));

    document.getElementById("previousQuestions")
        ?.addEventListener("click", () => openResource("previous"));

    document.getElementById("studyMaterial")
        ?.addEventListener("click", () => openResource("material"));


    /* ---------- Escape Key ---------- */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            const modal = document.getElementById("toolModal");

            if (modal?.classList.contains("active")) {
                closeToolModal();
            }

        }

    });

       /* =========================================================
   STUDYTOOLSHUB - JS PART 10
   Advanced Integration + Settings + Smart UI
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Safe Error Protection ---------- */

    window.addEventListener("error", event => {
        console.warn("StudyToolsHub:", event.message);
    });


    /* ---------- Smart Tool Counter ---------- */

    const toolCount = document.querySelectorAll(
        ".tool-card"
    ).length;

    const toolCountElements = document.querySelectorAll(
        "[data-tool-count]"
    );

    toolCountElements.forEach(element => {
        element.textContent = toolCount;
    });


    /* ---------- Recently Used Tools ---------- */

    function showRecentTools() {

        const container = document.querySelector(
            "[data-recent-tools]"
        );

        if (!container) return;

        const recent = JSON.parse(
            localStorage.getItem("studyRecentTools") || "[]"
        );

        if (!recent.length) {
            container.innerHTML = `
                <p class="empty-state">
                    No recently used tools.
                </p>
            `;
            return;
        }

        container.innerHTML = recent.map(tool => `
            <div class="recent-tool-item">
                <span>🕘 ${escapeHTML(tool)}</span>
            </div>
        `).join("");
    }

    showRecentTools();


    /* ---------- Favorite Count ---------- */

    function updateFavoriteCount() {

        const favorites = JSON.parse(
            localStorage.getItem("studyFavorites") || "[]"
        );

        document
            .querySelectorAll("[data-favorite-count]")
            .forEach(element => {
                element.textContent = favorites.length;
            });
    }

    updateFavoriteCount();


    /* ---------- Online Status ---------- */

    function updateOnlineStatus() {

        const status = document.querySelector(
            "[data-online-status]"
        );

        if (!status) return;

        if (navigator.onLine) {
            status.textContent = "🟢 Online";
            status.classList.remove("offline");
        } else {
            status.textContent = "🔴 Offline";
            status.classList.add("offline");
        }
    }

    updateOnlineStatus();

    window.addEventListener(
        "online",
        updateOnlineStatus
    );

    window.addEventListener(
        "offline",
        updateOnlineStatus
    );


    /* ---------- Auto Save Indicator ---------- */

    function showSaved() {

        const indicator = document.querySelector(
            "[data-save-status]"
        );

        if (!indicator) return;

        indicator.textContent = "✓ Saved";

        clearTimeout(
            indicator.saveTimer
        );

        indicator.saveTimer = setTimeout(() => {
            indicator.textContent = "";
        }, 2000);
    }

    window.showSaved = showSaved;


    /* ---------- Keyboard Shortcuts ---------- */

    document.addEventListener("keydown", event => {

        /* Ctrl + S */
        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "s"
        ) {
            event.preventDefault();

            showSaved();
            showToast("Changes saved locally");
        }


        /* Ctrl + Shift + F */
        if (
            (event.ctrlKey || event.metaKey) &&
            event.shiftKey &&
            event.key.toLowerCase() === "f"
        ) {
            event.preventDefault();

            const search = document.getElementById(
                "searchInput"
            );

            search?.focus();
        }

    });


    /* ---------- Lazy Image Loading ---------- */

    document.querySelectorAll("img").forEach(image => {

        if (!image.hasAttribute("loading")) {
            image.setAttribute(
                "loading",
                "lazy"
            );
        }

    });


    /* ---------- External Links Safety ---------- */

    document.querySelectorAll(
        'a[target="_blank"]'
    ).forEach(link => {

        const current =
            link.getAttribute("rel") || "";

        if (!current.includes("noopener")) {
            link.setAttribute(
                "rel",
                `${current} noopener noreferrer`.trim()
            );
        }

    });


    /* ---------- Prevent Empty Form Submission ---------- */

    document.querySelectorAll("form").forEach(form => {

        form.addEventListener("submit", event => {

            const requiredFields =
                form.querySelectorAll("[required]");

            let valid = true;

            requiredFields.forEach(field => {

                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add(
                        "input-error"
                    );
                } else {
                    field.classList.remove(
                        "input-error"
                    );
                }

            });

            if (!valid) {
                event.preventDefault();
                showToast(
                    "Please fill all required fields"
                );
            }

        });

    });


    /* ---------- Clear Input Error ---------- */

    document.addEventListener("input", event => {

        if (
            event.target.classList.contains(
                "input-error"
            )
        ) {
            event.target.classList.remove(
                "input-error"
            );
        }

    });


    /* ---------- Scroll Progress ---------- */

    const progressBar =
        document.createElement("div");

    progressBar.className =
        "page-scroll-progress";

    document.body.appendChild(progressBar);

    function updateScrollProgress() {

        const scrollTop =
            window.scrollY;

        const height =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            height > 0
                ? (scrollTop / height) * 100
                : 0;

        progressBar.style.width =
            `${progress}%`;
    }

    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    updateScrollProgress();


    /* ---------- Page Visibility ---------- */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState === "visible"
            ) {
                document.title =
                    "StudyToolsHub - Smart Tools for Students";
            } else {
                document.title =
                    "Come back to StudyToolsHub";
            }

        }
    );


    /* ---------- Final Initialization ---------- */

    setTimeout(() => {

        document.body.classList.add(
            "app-ready"
        );

    }, 100);

}); 
