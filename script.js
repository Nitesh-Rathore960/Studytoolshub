/* =========================================================
   STUDYTOOLSHUB
   JAVASCRIPT — PART 1
   Core + Loader + Header + Theme + Mobile + Toast
   ========================================================= */

"use strict";

/* ---------- Global Helpers ---------- */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

const get = (id) =>
    document.getElementById(id);


/* ---------- Result Helper ---------- */

function setResult(id, message, type = "success") {

    const element = get(id);

    if (!element) return;

    element.textContent = message;

    element.classList.remove(
        "success",
        "error",
        "warning"
    );

    element.classList.add(type);
}


/* ---------- Toast ---------- */

function showToast(message, type = "info") {

    let toast = get("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.remove(
        "show",
        "success",
        "error",
        "warning",
        "info"
    );

    toast.classList.add(type);

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    clearTimeout(window.studyToastTimer);

    window.studyToastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}

window.showToast = showToast;


/* =========================================================
   PAGE LOADER
   ========================================================= */

function initLoader() {

    const loader = get("pageLoader");

    if (!loader) return;

    const hideLoader = () => {

        loader.classList.add("hidden");

        setTimeout(() => {

            if (loader.parentNode) {
                loader.remove();
            }

        }, 500);
    };

    if (document.readyState === "complete") {

        setTimeout(hideLoader, 300);

    } else {

        window.addEventListener(
            "load",
            () => setTimeout(hideLoader, 300),
            { once: true }
        );

    }
}


/* =========================================================
   HEADER
   ========================================================= */

function initHeader() {

    const header = $(".site-header");

    if (!header) return;

    const updateHeader = () => {

        header.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );

    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const menuToggle = get("menuToggle");
    const mainNav = $(".main-nav");

    if (!menuToggle || !mainNav) return;

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.addEventListener("click", () => {

        const active =
            mainNav.classList.toggle("active");

        menuToggle.classList.toggle(
            "active",
            active
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(active)
        );

    });


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


/* =========================================================
   THEME
   ========================================================= */

function initTheme() {

    const savedTheme =
        localStorage.getItem("studytools-theme");

    let theme = savedTheme;

    if (!theme) {

        theme =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
                ? "dark"
                : "light";
    }

    applyTheme(theme);


    const buttons = $$(
        "[data-theme-toggle], #themeToggle, .theme-toggle"
    );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            toggleTheme
        );

    });
}


function applyTheme(theme) {

    const validTheme =
        theme === "dark"
            ? "dark"
            : "light";

    document.documentElement.setAttribute(
        "data-theme",
        validTheme
    );

    localStorage.setItem(
        "studytools-theme",
        validTheme
    );

    updateThemeIcons(validTheme);
}


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
            : "☀️ Light mode enabled",
        "success"
    );
}


function updateThemeIcons(theme) {

    $$("[data-theme-icon]").forEach(icon => {

        icon.textContent =
            theme === "dark"
                ? "☀️"
                : "🌙";

    });
}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function initBackToTop() {

    const button = get("backToTop");

    if (!button) return;

    const update = () => {

        button.classList.toggle(
            "visible",
            window.scrollY > 500
        );

    };

    update();

    window.addEventListener(
        "scroll",
        update,
        { passive: true }
    );

    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });
}


/* =========================================================
   SMOOTH ANCHOR SCROLL
   ========================================================= */

function initSmoothScroll() {

    document.addEventListener(
        "click",
        event => {

            const link =
                event.target.closest(
                    'a[href^="#"]'
                );

            if (!link) return;

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            history.replaceState(
                null,
                "",
                targetId
            );
        }
    );
}


/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

function initKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        event => {

            /* Ctrl + K / Cmd + K */

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


            /* Escape */

            if (event.key === "Escape") {

                const nav = $(".main-nav");
                const menu = get("menuToggle");

                nav?.classList.remove("active");
                menu?.classList.remove("active");

                menu?.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        }
    );
}


/* =========================================================
   ONLINE / OFFLINE
   ========================================================= */

function initConnectionStatus() {

    window.addEventListener(
        "offline",
        () => {

            showToast(
                "📡 You are offline.",
                "warning"
            );

        }
    );


    window.addEventListener(
        "online",
        () => {

            showToast(
                "🌐 Internet connection restored.",
                "success"
            );

        }
    );
}


/* =========================================================
   DOM INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initLoader();
        initHeader();
        initMobileMenu();
        initTheme();
        initBackToTop();
        initSmoothScroll();
        initKeyboardShortcuts();
        initConnectionStatus();

    }
);

 /* =========================================================
   JAVASCRIPT — PART 2
   Search + Basic Calculators
   ========================================================= */


/* =========================================================
   NUMBER HELPER
   ========================================================= */

function getNumber(id) {

    const element = get(id);

    if (!element) return NaN;

    return parseFloat(element.value);
}


/* =========================================================
   SEARCH SYSTEM
   ========================================================= */

function initSearch() {

    const input = get("searchInput");
    const button = get("searchButton");

    if (!input) return;

    const items = $$(
        ".tool-card, .resource-card, .feature-card"
    );

    const performSearch = () => {

        const query =
            input.value.trim().toLowerCase();

        let found = 0;

        items.forEach(item => {

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
    };


    input.addEventListener(
        "input",
        performSearch
    );


    button?.addEventListener(
        "click",
        performSearch
    );


    input.addEventListener(
        "keydown",
        event => {

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

        }
    );
}


/* =========================================================
   PERCENTAGE CALCULATOR
   ========================================================= */

function initPercentageCalculator() {

    const button =
        get("calculatePercentage");

    if (!button) return;

    button.addEventListener(
        "click",
        () => {

            const obtained =
                getNumber("obtainedMarks");

            const total =
                getNumber("totalMarks");


            if (
                !Number.isFinite(obtained) ||
                !Number.isFinite(total)
            ) {

                setResult(
                    "percentageResult",
                    "Please enter valid marks.",
                    "error"
                );

                return;
            }


            if (total <= 0) {

                setResult(
                    "percentageResult",
                    "Total marks must be greater than 0.",
                    "error"
                );

                return;
            }


            if (
                obtained < 0 ||
                obtained > total
            ) {

                setResult(
                    "percentageResult",
                    "Obtained marks must be between 0 and total marks.",
                    "error"
                );

                return;
            }


            const percentage =
                (obtained / total) * 100;


            setResult(
                "percentageResult",
                `Percentage: ${percentage.toFixed(2)}%`,
                "success"
            );

        }
    );
}


/* =========================================================
   CGPA CALCULATOR
   ========================================================= */

function initCGPACalculator() {

    const button =
        get("calculateCGPA");

    if (!button) return;

    button.addEventListener(
        "click",
        () => {

            const input =
                get("gradePoints");

            const subjects =
                parseInt(
                    get("subjects")?.value,
                    10
                );


            const points =
                input?.value
                    .split(",")
                    .map(value =>
                        parseFloat(value.trim())
                    )
                    .filter(value =>
                        Number.isFinite(value)
                    );


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
                !Number.isInteger(subjects) ||
                subjects <= 0
            ) {

                setResult(
                    "cgpaResult",
                    "Enter a valid number of subjects.",
                    "error"
                );

                return;
            }


            if (points.length !== subjects) {

                setResult(
                    "cgpaResult",
                    `Enter exactly ${subjects} grade points.`,
                    "error"
                );

                return;
            }


            if (
                points.some(
                    point =>
                        point < 0 ||
                        point > 10
                )
            ) {

                setResult(
                    "cgpaResult",
                    "Each grade point must be between 0 and 10.",
                    "error"
                );

                return;
            }


            const total =
                points.reduce(
                    (sum, point) =>
                        sum + point,
                    0
                );


            const cgpa =
                total / subjects;


            setResult(
                "cgpaResult",
                `CGPA: ${cgpa.toFixed(2)}`,
                "success"
            );

        }
    );
}


/* =========================================================
   AGE CALCULATOR
   ========================================================= */

function initAgeCalculator() {

    const button =
        get("calculateAge");

    if (!button) return;

    button.addEventListener(
        "click",
        () => {

            const value =
                get("birthDate")?.value;

            if (!value) {

                setResult(
                    "ageResult",
                    "Please select your birth date.",
                    "error"
                );

                return;
            }


            const birth =
                new Date(`${value}T00:00:00`);

            const today =
                new Date();


            if (
                Number.isNaN(birth.getTime()) ||
                birth > today
            ) {

                setResult(
                    "ageResult",
                    "Please enter a valid past date.",
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

        }
    );
}


/* =========================================================
   AVERAGE CALCULATOR
   ========================================================= */

function initAverageCalculator() {

    const button =
        get("calculateAverage");

    if (!button) return;

    button.addEventListener(
        "click",
        () => {

            const numbers =
                get("averageNumbers")
                    ?.value
                    .split(",")
                    .map(value =>
                        parseFloat(value.trim())
                    )
                    .filter(value =>
                        Number.isFinite(value)
                    );


            if (!numbers?.length) {

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

        }
    );
}


/* =========================================================
   MARKS & GRADE
   ========================================================= */

function initMarksGradeCalculator() {

    const button =
        get("calculateGrade");

    if (!button) return;

    button.addEventListener(
        "click",
        () => {

            const marks =
                getNumber("marksInput");


            if (
                !Number.isFinite(marks) ||
                marks < 0 ||
                marks > 100
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


            if (marks >= 90) {

                grade = "A+";
                message = "Excellent";

            } else if (marks >= 80) {

                grade = "A";
                message = "Very Good";

            } else if (marks >= 70) {

                grade = "B";
                message = "Good";

            } else if (marks >= 60) {

                grade = "C";
                message = "Average";

            } else if (marks >= 50) {

                grade = "D";
                message = "Pass";

            } else {

                grade = "F";
                message = "Needs Improvement";

            }


            setResult(
                "gradeResult",
                `Grade: ${grade} — ${message}`,
                marks >= 50
                    ? "success"
                    : "error"
            );

        }
    );
}


/* =========================================================
   INITIALIZE PART 2
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initSearch();
        initPercentageCalculator();
        initCGPACalculator();
        initAgeCalculator();
        initAverageCalculator();
        initMarksGradeCalculator();

    }
);

 /* =========================================================
   JAVASCRIPT — PART 3
   Advanced Calculators
   ========================================================= */


/* =========================================================
   SCIENTIFIC CALCULATOR
   ========================================================= */

function initScientificCalculator() {

    const display = get("scientificDisplay");
    const keys = $$(".scientific-key");

    if (!display || !keys.length) return;

    let expression = "";

    const updateDisplay = () => {
        display.value = expression || "0";
    };


    const calculate = () => {

        try {

            let exp = expression
                .replace(/π/g, "Math.PI")
                .replace(/\be\b/g, "Math.E")
                .replace(/√/g, "Math.sqrt")
                .replace(/\^/g, "**")
                .replace(/sin\(/g, "Math.sin(")
                .replace(/cos\(/g, "Math.cos(")
                .replace(/tan\(/g, "Math.tan(")
                .replace(/log\(/g, "Math.log10(")
                .replace(/ln\(/g, "Math.log(");


            if (!exp.trim()) return;

            /*
             * Only calculator-generated expressions are evaluated.
             * Basic character validation prevents unexpected input.
             */

            if (!/^[0-9+\-*/().,\sA-Za-z_]+$/.test(exp)) {
                throw new Error("Invalid expression");
            }


            const result =
                Function(
                    `"use strict"; return (${exp})`
                )();


            if (!Number.isFinite(result)) {
                throw new Error("Invalid result");
            }


            expression =
                Number(
                    result.toFixed(10)
                ).toString();

            updateDisplay();


        } catch {

            display.value = "Error";
            expression = "";

        }
    };


    keys.forEach(key => {

        key.addEventListener(
            "click",
            () => {

                const value =
                    key.dataset.value ??
                    key.textContent.trim();


                if (
                    value === "=" ||
                    value === "Calculate"
                ) {

                    calculate();
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

            }
        );

    });


    display.addEventListener(
        "input",
        () => {

            expression =
                display.value
                    .replace(/[^0-9+\-*/().^]/g, "");

            updateDisplay();

        }
    );


    updateDisplay();
}


/* =========================================================
   UNIT CONVERTER
   ========================================================= */

function initUnitConverter() {

    const category = get("unitCategory");
    const from = get("fromUnit");
    const to = get("toUnit");
    const value = get("unitValue");
    const button = get("convertUnit");

    if (
        !category ||
        !from ||
        !to ||
        !value ||
        !button
    ) return;


    const units = {

        length: {
            meter: 1,
            kilometer: 1000,
            centimeter: 0.01,
            millimeter: 0.001,
            mile: 1609.344,
            foot: 0.3048,
            inch: 0.0254
        },

        weight: {
            kilogram: 1,
            gram: 0.001,
            milligram: 0.000001,
            pound: 0.45359237
        },

        temperature: {
            celsius: "celsius",
            fahrenheit: "fahrenheit",
            kelvin: "kelvin"
        },

        time: {
            second: 1,
            minute: 60,
            hour: 3600,
            day: 86400
        }
    };


    const labels = {
        length: {
            meter: "Meter",
            kilometer: "Kilometer",
            centimeter: "Centimeter",
            millimeter: "Millimeter",
            mile: "Mile",
            foot: "Foot",
            inch: "Inch"
        },

        weight: {
            kilogram: "Kilogram",
            gram: "Gram",
            milligram: "Milligram",
            pound: "Pound"
        },

        temperature: {
            celsius: "Celsius",
            fahrenheit: "Fahrenheit",
            kelvin: "Kelvin"
        },

        time: {
            second: "Second",
            minute: "Minute",
            hour: "Hour",
            day: "Day"
        }
    };


    const loadUnits = () => {

        const selected =
            category.value;

        const data =
            units[selected];

        if (!data) return;

        from.innerHTML = "";
        to.innerHTML = "";

        Object.keys(data).forEach(unit => {

            const label =
                labels[selected]?.[unit] || unit;

            const option1 =
                new Option(label, unit);

            const option2 =
                new Option(label, unit);

            from.add(option1);
            to.add(option2);

        });

        if (to.options.length > 1) {
            to.selectedIndex = 1;
        }

    };


    const convertTemperature =
        (amount, source, target) => {

            let celsius;

            if (source === "celsius") {
                celsius = amount;
            }

            if (source === "fahrenheit") {
                celsius =
                    (amount - 32) * 5 / 9;
            }

            if (source === "kelvin") {
                celsius =
                    amount - 273.15;
            }


            if (target === "celsius") {
                return celsius;
            }

            if (target === "fahrenheit") {
                return celsius * 9 / 5 + 32;
            }

            return celsius + 273.15;
        };


    const convert = () => {

        const amount =
            parseFloat(value.value);

        if (!Number.isFinite(amount)) {

            setResult(
                "unitResult",
                "Enter a valid value.",
                "error"
            );

            return;
        }


        const selected =
            category.value;

        let result;


        if (selected === "temperature") {

            result =
                convertTemperature(
                    amount,
                    from.value,
                    to.value
                );

        } else {

            const data =
                units[selected];

            result =
                amount *
                data[from.value] /
                data[to.value];

        }


        setResult(
            "unitResult",
            `${amount} ${from.options[from.selectedIndex].text} = ${result.toFixed(6).replace(/\.?0+$/, "")} ${to.options[to.selectedIndex].text}`,
            "success"
        );

    };


    category.addEventListener(
        "change",
        loadUnits
    );

    button.addEventListener(
        "click",
        convert
    );

    loadUnits();
}


/* =========================================================
   DISCOUNT CALCULATOR
   ========================================================= */

function initDiscountCalculator() {

    const button =
        get("calculateDiscount");

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            const price =
                getNumber("originalPrice");

            const discount =
                getNumber("discountPercent");


            if (
                !Number.isFinite(price) ||
                !Number.isFinite(discount) ||
                price < 0 ||
                discount < 0 ||
                discount > 100
            ) {

                setResult(
                    "discountResult",
                    "Enter valid price and discount.",
                    "error"
                );

                return;
            }


            const saved =
                price * discount / 100;

            const finalPrice =
                price - saved;


            setResult(
                "discountResult",
                `You save ₹${saved.toFixed(2)} | Final Price: ₹${finalPrice.toFixed(2)}`,
                "success"
            );

        }
    );
}


/* =========================================================
   SIMPLE INTEREST
   ========================================================= */

function initInterestCalculator() {

    const button =
        get("calculateInterest");

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            const principal =
                getNumber("principalAmount");

            const rate =
                getNumber("interestRate");

            const time =
                getNumber("interestTime");


            if (
                !Number.isFinite(principal) ||
                !Number.isFinite(rate) ||
                !Number.isFinite(time) ||
                principal < 0 ||
                rate < 0 ||
                time < 0
            ) {

                setResult(
                    "interestResult",
                    "Enter valid values.",
                    "error"
                );

                return;
            }


            const interest =
                principal * rate * time / 100;

            const total =
                principal + interest;


            setResult(
                "interestResult",
                `Interest: ₹${interest.toFixed(2)} | Total: ₹${total.toFixed(2)}`,
                "success"
            );

        }
    );
}


/* =========================================================
   BMI CALCULATOR
   ========================================================= */

function initBMICalculator() {

    const button =
        get("calculateBMI");

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            const weight =
                getNumber("bmiWeight");

            const heightCm =
                getNumber("bmiHeight");


            if (
                !Number.isFinite(weight) ||
                !Number.isFinite(heightCm) ||
                weight <= 0 ||
                heightCm <= 0
            ) {

                setResult(
                    "bmiResult",
                    "Enter valid weight and height.",
                    "error"
                );

                return;
            }


            const height =
                heightCm / 100;

            const bmi =
                weight / (height * height);


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
                `BMI: ${bmi.toFixed(2)} — ${category}`,
                "success"
            );

        }
    );
}


/* =========================================================
   INITIALIZE PART 3
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initScientificCalculator();
        initUnitConverter();
        initDiscountCalculator();
        initInterestCalculator();
        initBMICalculator();

    }
);

// ===============================
// PART 4 — STUDY TOOLS
// ===============================

function initStudyTimer() {
    const display = get("timerDisplay");
    const startBtn = get("startTimer");
    const pauseBtn = get("pauseTimer");
    const resetBtn = get("resetTimer");

    if (!display) return;

    let totalSeconds = 25 * 60;
    let timer = null;

    function updateDisplay() {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        display.textContent =
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");
    }

    function start() {
        if (timer) return;

        timer = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateDisplay();
            } else {
                clearInterval(timer);
                timer = null;
                showToast("🎉 Study session complete!");
            }
        }, 1000);

        showToast("▶ Timer started");
    }

    function pause() {
        clearInterval(timer);
        timer = null;
        showToast("⏸ Timer paused");
    }

    function reset() {
        clearInterval(timer);
        timer = null;
        totalSeconds = 25 * 60;
        updateDisplay();
        showToast("↻ Timer reset");
    }

    startBtn?.addEventListener("click", start);
    pauseBtn?.addEventListener("click", pause);
    resetBtn?.addEventListener("click", reset);

    updateDisplay();
}


function initTodoList() {
    const input = get("todoInput");
    const addBtn = get("addTodo");
    const list = get("todoList");

    if (!input || !addBtn || !list) return;

    let todos = JSON.parse(localStorage.getItem("studytools-todos") || "[]");

    function save() {
        localStorage.setItem("studytools-todos", JSON.stringify(todos));
    }

    function render() {
        list.innerHTML = "";

        if (!todos.length) {
            list.innerHTML = "<li>No tasks yet 📚</li>";
            return;
        }

        todos.forEach((todo, index) => {
            const li = document.createElement("li");

            li.innerHTML = `
                <span class="${todo.done ? "done" : ""}">
                    ${escapeHTML(todo.text)}
                </span>

                <div>
                    <button type="button" data-complete="${index}">
                        ${todo.done ? "↩" : "✓"}
                    </button>

                    <button type="button" data-delete="${index}">
                        🗑
                    </button>
                </div>
            `;

            list.appendChild(li);
        });
    }

    function addTodo() {
        const text = input.value.trim();

        if (!text) {
            showToast("Enter a task first");
            return;
        }

        todos.push({
            text,
            done: false
        });

        input.value = "";
        save();
        render();
    }

    addBtn.addEventListener("click", addTodo);

    input.addEventListener("keydown", e => {
        if (e.key === "Enter") addTodo();
    });

    list.addEventListener("click", e => {
        const complete = e.target.closest("[data-complete]");
        const del = e.target.closest("[data-delete]");

        if (complete) {
            const index = Number(complete.dataset.complete);
            todos[index].done = !todos[index].done;
            save();
            render();
        }

        if (del) {
            const index = Number(del.dataset.delete);
            todos.splice(index, 1);
            save();
            render();
        }
    });

    render();
}


function initWordCounter() {
    const input = get("wordCounterInput");

    if (!input) return;

    const word = get("wordCount");
    const character = get("characterCount");
    const sentence = get("sentenceCount");
    const paragraph = get("paragraphCount");

    function update() {
        const text = input.value;

        const words = text.trim()
            ? text.trim().split(/\s+/).length
            : 0;

        const sentences = text.trim()
            ? text.split(/[.!?]+/).filter(x => x.trim()).length
            : 0;

        const paragraphs = text.trim()
            ? text.split(/\n\s*\n/).filter(x => x.trim()).length
            : 0;

        if (word) word.textContent = words;
        if (character) character.textContent = text.length;
        if (sentence) sentence.textContent = sentences;
        if (paragraph) paragraph.textContent = paragraphs;
    }

    input.addEventListener("input", update);
    update();
}


function initQuickNotes() {
    const notes = get("quickNotes");
    const clearBtn = get("clearNotes");

    if (!notes) return;

    const savedNotes =
        localStorage.getItem("studytools-notes");

    if (savedNotes !== null) {
        notes.value = savedNotes;
    }

    notes.addEventListener("input", () => {
        localStorage.setItem(
            "studytools-notes",
            notes.value
        );
    });

    clearBtn?.addEventListener("click", () => {
        if (!notes.value) return;

        notes.value = "";
        localStorage.removeItem("studytools-notes");

        showToast("🗑 Notes cleared");
    });
}


function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
}


document.addEventListener("DOMContentLoaded", () => {
    initStudyTimer();
    initTodoList();
    initWordCounter();
    initQuickNotes();
});

// ===============================
// PART 5 — QUIZ + FLASHCARDS + PROGRESS
// ===============================

function initQuiz() {
    const question = get("quizQuestion");
    const options = get("quizOptions");
    const nextBtn = get("nextQuiz");
    const scoreBox = get("quizScore");

    if (!question || !options) return;

    const quizData = [
        {
            q: "HTML ka full form kya hai?",
            options: [
                "Hyper Text Markup Language",
                "High Text Machine Language",
                "Hyper Tool Multi Language",
                "Home Text Markup Language"
            ],
            answer: 0
        },
        {
            q: "CSS ka use kisliye hota hai?",
            options: [
                "Database ke liye",
                "Website styling ke liye",
                "Server banane ke liye",
                "File download ke liye"
            ],
            answer: 1
        },
        {
            q: "JavaScript kis type ki language hai?",
            options: [
                "Programming language",
                "Markup language",
                "Style sheet",
                "Database"
            ],
            answer: 0
        },
        {
            q: "C++ me output ke liye commonly kya use hota hai?",
            options: [
                "print()",
                "cout",
                "echo",
                "output()"
            ],
            answer: 1
        }
    ];

    let current = 0;
    let score = 0;
    let answered = false;

    function renderQuiz() {
        const quiz = quizData[current];

        question.textContent = quiz.q;
        options.innerHTML = "";
        answered = false;

        quiz.options.forEach((option, index) => {
            const button = document.createElement("button");

            button.type = "button";
            button.textContent = option;

            button.addEventListener("click", () => {
                if (answered) return;

                answered = true;

                if (index === quiz.answer) {
                    button.classList.add("correct");
                    score++;
                    showToast("✅ Correct!");
                } else {
                    button.classList.add("wrong");

                    const correctBtn =
                        options.children[quiz.answer];

                    correctBtn?.classList.add("correct");

                    showToast("❌ Wrong answer");
                }

                if (scoreBox) {
                    scoreBox.textContent =
                        `Score: ${score}/${current + 1}`;
                }
            });

            options.appendChild(button);
        });

        if (nextBtn) {
            nextBtn.textContent =
                current === quizData.length - 1
                    ? "Restart Quiz"
                    : "Next Question";
        }
    }

    nextBtn?.addEventListener("click", () => {
        if (current === quizData.length - 1) {
            current = 0;
            score = 0;
        } else {
            current++;
        }

        renderQuiz();
    });

    renderQuiz();
}


function initFlashcards() {
    const container = get("flashcardsContainer");

    if (!container) return;

    const cards = [
        {
            question: "What is HTML?",
            answer: "HTML is used to create the structure of web pages."
        },
        {
            question: "What is CSS?",
            answer: "CSS is used to style and design web pages."
        },
        {
            question: "What is JavaScript?",
            answer: "JavaScript adds logic and interactivity to websites."
        },
        {
            question: "What is C++?",
            answer: "C++ is a general-purpose programming language."
        }
    ];

    container.innerHTML = "";

    cards.forEach(card => {
        const element = document.createElement("div");

        element.className = "flashcard";

        element.innerHTML = `
            <div class="flashcard-front">
                ${escapeHTML(card.question)}
            </div>

            <div class="flashcard-back">
                ${escapeHTML(card.answer)}
            </div>
        `;

        element.addEventListener("click", () => {
            element.classList.toggle("flipped");
        });

        container.appendChild(element);
    });
}


function initStudyProgress() {
    const input = get("studyProgressInput");
    const updateBtn = get("updateProgress");
    const bar = get("studyProgressBar");
    const text = get("studyProgressText");

    if (!input || !updateBtn) return;

    let saved =
        Number(localStorage.getItem("studytools-progress"));

    if (Number.isNaN(saved)) saved = 0;

    function update(value) {
        value = Math.max(0, Math.min(100, Number(value)));

        input.value = value;

        if (bar) {
            bar.style.width = value + "%";
        }

        if (text) {
            text.textContent = value + "% Complete";
        }

        localStorage.setItem(
            "studytools-progress",
            value
        );
    }

    updateBtn.addEventListener("click", () => {
        const value = Number(input.value);

        if (Number.isNaN(value)) {
            showToast("Enter progress percentage");
            return;
        }

        update(value);
        showToast("📈 Progress updated");
    });

    update(saved);
}


function initStudySessionCounter() {
    const countBox = get("studySessionCount");
    const completeBtn = get("completeStudySession");

    if (!countBox || !completeBtn) return;

    let count =
        Number(localStorage.getItem("studytools-sessions"));

    if (Number.isNaN(count)) count = 0;

    function render() {
        countBox.textContent = count;
    }

    completeBtn.addEventListener("click", () => {
        count++;

        localStorage.setItem(
            "studytools-sessions",
            count
        );

        render();

        showToast("🎉 Study session completed!");
    });

    render();
}


document.addEventListener("DOMContentLoaded", () => {
    initQuiz();
    initFlashcards();
    initStudyProgress();
    initStudySessionCounter();
});

       // ===============================
// PART 6 — ADVANCED CODE EDITOR
// ===============================

function initCodeEditor() {
    const editorPage = get("editorPage");
    const openBtn = get("openEditor");
    const closeBtn = get("closeEditor");

    const htmlInput = get("htmlCode");
    const cssInput = get("cssCode");
    const jsInput = get("jsCode");

    const preview = get("codePreview");
    const runBtn = get("runCode");
    const clearBtn = get("clearCode");
    const downloadBtn = get("downloadCode");
    const copyBtn = get("copyCode");

    if (!editorPage) return;

    function openEditor() {
        editorPage.style.display = "block";
        document.body.classList.add("editor-open");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function closeEditor() {
        editorPage.style.display = "none";
        document.body.classList.remove("editor-open");
    }

    function runCode() {
        if (!preview) return;

        const html = htmlInput?.value || "";
        const css = cssInput?.value || "";
        const js = jsInput?.value || "";

        preview.srcdoc = `
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
    document.body.innerHTML +=
    '<pre style="color:red;padding:15px;">' +
    error.message +
    '</pre>';
}
<\/script>

</body>
</html>
        `;

        saveEditorData();
        showToast("▶ Code executed");
    }

    function clearEditor() {
        if (htmlInput) htmlInput.value = "";
        if (cssInput) cssInput.value = "";
        if (jsInput) jsInput.value = "";

        if (preview) {
            preview.srcdoc = "";
        }

        localStorage.removeItem("studytools-editor-html");
        localStorage.removeItem("studytools-editor-css");
        localStorage.removeItem("studytools-editor-js");

        showToast("🗑 Editor cleared");
    }

    function saveEditorData() {
        localStorage.setItem(
            "studytools-editor-html",
            htmlInput?.value || ""
        );

        localStorage.setItem(
            "studytools-editor-css",
            cssInput?.value || ""
        );

        localStorage.setItem(
            "studytools-editor-js",
            jsInput?.value || ""
        );
    }

    function loadEditorData() {
        if (htmlInput) {
            htmlInput.value =
                localStorage.getItem(
                    "studytools-editor-html"
                ) || htmlInput.value;
        }

        if (cssInput) {
            cssInput.value =
                localStorage.getItem(
                    "studytools-editor-css"
                ) || cssInput.value;
        }

        if (jsInput) {
            jsInput.value =
                localStorage.getItem(
                    "studytools-editor-js"
                ) || jsInput.value;
        }
    }

    async function copyCode() {
        const html = htmlInput?.value || "";
        const css = cssInput?.value || "";
        const js = jsInput?.value || "";

        const combined = `
HTML:
${html}

CSS:
${css}

JavaScript:
${js}
        `.trim();

        try {
            await navigator.clipboard.writeText(combined);
            showToast("📋 Code copied");
        } catch {
            showToast("Copy not supported");
        }
    }

    function downloadCode() {
        const html = htmlInput?.value || "";
        const css = cssInput?.value || "";
        const js = jsInput?.value || "";

        const completeHTML = `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport"
content="width=device-width, initial-scale=1.0">

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
        `.trim();

        const blob = new Blob(
            [completeHTML],
            { type: "text/html" }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "studytoolshub-project.html";

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);

        showToast("💾 HTML file downloaded");
    }

    openBtn?.addEventListener("click", openEditor);
    closeBtn?.addEventListener("click", closeEditor);

    runBtn?.addEventListener("click", runCode);
    clearBtn?.addEventListener("click", clearEditor);

    downloadBtn?.addEventListener(
        "click",
        downloadCode
    );

    copyBtn?.addEventListener(
        "click",
        copyCode
    );

    [htmlInput, cssInput, jsInput].forEach(input => {
        input?.addEventListener(
            "input",
            saveEditorData
        );
    });

    loadEditorData();
}


// Start Editor
document.addEventListener("DOMContentLoaded", () => {
    initCodeEditor();
});

// ===============================
// PART 7 — C / C++ COMPILER
// ===============================

function initCompiler() {
    const page = get("compilerPage");
    const openBtn = get("openCompiler");
    const closeBtn = get("closeCompiler");

    const language = get("compilerLanguage");
    const code = get("compilerCode");
    const runBtn = get("runCompiler");
    const clearBtn = get("clearCompiler");

    const output = get("compilerOutput");
    const lineCount = get("compilerLineCount");
    const clearOutputBtn = get("clearCompilerOutput");
    const downloadBtn = get("downloadCompilerCode");

    if (!page) return;

    const defaultCode = {
        c: `#include <stdio.h>

int main() {
    printf("Hello, StudyToolsHub!");
    return 0;
}`,
        cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, StudyToolsHub!";
    return 0;
}`
    };

    function openCompiler() {
        page.style.display = "block";
        document.body.classList.add("compiler-open");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function closeCompiler() {
        page.style.display = "none";
        document.body.classList.remove("compiler-open");
    }

    function updateLineCount() {
        if (!code || !lineCount) return;

        const lines = code.value.split("\n").length;

        lineCount.textContent =
            `${lines} line${lines !== 1 ? "s" : ""}`;
    }

    function saveCode() {
        if (!code || !language) return;

        localStorage.setItem(
            `studytools-compiler-${language.value}`,
            code.value
        );
    }

    function loadCode() {
        if (!code || !language) return;

        const saved = localStorage.getItem(
            `studytools-compiler-${language.value}`
        );

        code.value =
            saved !== null
                ? saved
                : defaultCode[language.value];

        updateLineCount();
    }

    function changeLanguage() {
        saveCode();
        loadCode();

        if (output) {
            output.textContent =
                "Ready to run " +
                language.value.toUpperCase() +
                " code.";
        }
    }

    function runCompilerCode() {
        if (!code || !output) return;

        const source = code.value.trim();

        if (!source) {
            output.textContent =
                "⚠️ Please write some code first.";
            return;
        }

        saveCode();

        output.textContent =
`C/C++ compiler backend is not connected yet.

Your ${language.value.toUpperCase()} code is ready.

Lines: ${source.split("\n").length}

Next step:
Connect a secure server-side compiler API to execute this code.`;

        showToast("▶ Code sent to compiler panel");
    }

    function clearCode() {
        if (!code) return;

        code.value = "";
        localStorage.removeItem(
            `studytools-compiler-${language.value}`
        );

        updateLineCount();

        showToast("🗑 Compiler code cleared");
    }

    function clearOutput() {
        if (!output) return;

        output.textContent =
            "Output will appear here...";

        showToast("Output cleared");
    }

    function downloadCode() {
        if (!code || !language) return;

        const extension =
            language.value === "c"
                ? "c"
                : "cpp";

        const blob = new Blob(
            [code.value],
            { type: "text/plain" }
        );

        const url = URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;
        link.download =
            `studytoolshub-code.${extension}`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);

        showToast("💾 Code downloaded");
    }

    openBtn?.addEventListener(
        "click",
        openCompiler
    );

    closeBtn?.addEventListener(
        "click",
        closeCompiler
    );

    language?.addEventListener(
        "change",
        changeLanguage
    );

    runBtn?.addEventListener(
        "click",
        runCompilerCode
    );

    clearBtn?.addEventListener(
        "click",
        clearCode
    );

    clearOutputBtn?.addEventListener(
        "click",
        clearOutput
    );

    downloadBtn?.addEventListener(
        "click",
        downloadCode
    );

    code?.addEventListener("input", () => {
        updateLineCount();
        saveCode();
    });

    loadCode();
}


// Start Compiler
document.addEventListener("DOMContentLoaded", () => {
    initCompiler();
});


// ===============================
// PART 8 — MODALS + RESOURCES
// ===============================

function initToolModal() {
    const modal = get("toolModal");
    const overlay = get("toolModalOverlay");
    const closeBtn = get("closeToolModal");

    if (!modal) return;

    function closeModal() {
        modal.style.display = "none";

        if (overlay) {
            overlay.style.display = "none";
        }
    }

    closeBtn?.addEventListener("click", closeModal);
    overlay?.addEventListener("click", closeModal);
}


// ===============================
// ACCOUNT MODAL
// ===============================

function initAccountModal() {
    const modal = get("accountModal");
    const overlay = get("accountModalOverlay");
    const closeBtn = get("closeAccountModal");

    const loginBtn = get("loginButton");
    const accountBtn = get("accountButton");

    if (!modal) return;

    function openAccount() {
        modal.style.display = "flex";

        if (overlay) {
            overlay.style.display = "block";
        }
    }

    function closeAccount() {
        modal.style.display = "none";

        if (overlay) {
            overlay.style.display = "none";
        }
    }

    loginBtn?.addEventListener(
        "click",
        openAccount
    );

    accountBtn?.addEventListener(
        "click",
        openAccount
    );

    closeBtn?.addEventListener(
        "click",
        closeAccount
    );

    overlay?.addEventListener(
        "click",
        closeAccount
    );
}


// ===============================
// RESOURCES
// ===============================

function initResources() {

    const resources = {
        resourceNotes: {
            title: "📚 Study Notes",
            text: "Study notes and useful learning material will be available here."
        },

        importantQuestions: {
            title: "⭐ Important Questions",
            text: "Important exam questions and practice questions will be available here."
        },

        previousQuestions: {
            title: "📝 Previous Questions",
            text: "Previous year question papers can be added here."
        },

        studyMaterial: {
            title: "📖 Study Material",
            text: "Useful study material and educational resources can be added here."
        }
    };

    Object.entries(resources).forEach(
        ([id, data]) => {

            const button = get(id);

            if (!button) return;

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();

                    showResourceModal(
                        data.title,
                        data.text
                    );
                }
            );
        }
    );
}


// ===============================
// RESOURCE POPUP
// ===============================

function showResourceModal(title, text) {

    let modal = get("resourcePopup");

    if (!modal) {

        modal = document.createElement("div");

        modal.id = "resourcePopup";

        modal.innerHTML = `
            <div class="resource-popup-box">

                <button
                    type="button"
                    id="resourcePopupClose"
                    class="resource-popup-close"
                >
                    ×
                </button>

                <h2 id="resourcePopupTitle"></h2>

                <p id="resourcePopupText"></p>

            </div>
        `;

        document.body.appendChild(modal);

        modal.addEventListener(
            "click",
            event => {

                if (event.target === modal) {
                    modal.style.display = "none";
                }

            }
        );
    }

    const titleBox =
        get("resourcePopupTitle");

    const textBox =
        get("resourcePopupText");

    if (titleBox) {
        titleBox.textContent = title;
    }

    if (textBox) {
        textBox.textContent = text;
    }

    modal.style.display = "flex";

    get("resourcePopupClose")?.addEventListener(
        "click",
        () => {
            modal.style.display = "none";
        }
    );
}


// ===============================
// QUICK ACCESS
// ===============================

function initQuickAccess() {

    document.querySelectorAll(
        ".feature-card, .resource-card"
    ).forEach(card => {

        card.addEventListener(
            "mousedown",
            () => {
                card.classList.add(
                    "tool-active"
                );
            }
        );

        card.addEventListener(
            "mouseup",
            () => {
                card.classList.remove(
                    "tool-active"
                );
            }
        );

    });
}


// ===============================
// ESC KEY
// ===============================

function initEscapeClose() {

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            const toolModal =
                get("toolModal");

            const accountModal =
                get("accountModal");

            const resourcePopup =
                get("resourcePopup");

            if (toolModal) {
                toolModal.style.display = "none";
            }

            if (accountModal) {
                accountModal.style.display = "none";
            }

            if (resourcePopup) {
                resourcePopup.style.display = "none";
            }

        }
    );
}


// ===============================
// START PART 8
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initToolModal();
        initAccountModal();
        initResources();
        initQuickAccess();
        initEscapeClose();

    }
);


// ===============================
// PART 9 — FAVORITES + RECENT TOOLS
// ===============================

function initFavorites() {
    const buttons = document.querySelectorAll(
        "[data-favorite]"
    );

    let favorites = JSON.parse(
        localStorage.getItem(
            "studytools-favorites"
        ) || "[]"
    );

    function save() {
        localStorage.setItem(
            "studytools-favorites",
            JSON.stringify(favorites)
        );

        updateFavoriteCount();
    }

    buttons.forEach(button => {
        const id =
            button.dataset.favorite;

        if (favorites.includes(id)) {
            button.classList.add("favorite-active");
            button.textContent = "★";
        }

        button.addEventListener("click", event => {
            event.stopPropagation();

            if (favorites.includes(id)) {
                favorites =
                    favorites.filter(
                        item => item !== id
                    );

                button.classList.remove(
                    "favorite-active"
                );

                button.textContent = "☆";

                showToast("☆ Removed from favorites");
            } else {
                favorites.push(id);

                button.classList.add(
                    "favorite-active"
                );

                button.textContent = "★";

                showToast("★ Added to favorites");
            }

            save();
        });
    });

    updateFavoriteCount();
}


function updateFavoriteCount() {
    const countBox =
        get("favoriteCount");

    if (!countBox) return;

    const favorites = JSON.parse(
        localStorage.getItem(
            "studytools-favorites"
        ) || "[]"
    );

    countBox.textContent =
        favorites.length;
}


function initRecentTools() {
    const toolButtons =
        document.querySelectorAll(
            "[data-tool], .tool-card"
        );

    let recent = JSON.parse(
        localStorage.getItem(
            "studytools-recent"
        ) || "[]"
    );

    function save() {
        localStorage.setItem(
            "studytools-recent",
            JSON.stringify(recent)
        );
    }

    toolButtons.forEach(button => {
        button.addEventListener("click", () => {
            const name =
                button.dataset.tool ||
                button.querySelector("h3")
                    ?.textContent ||
                button.textContent.trim();

            if (!name) return;

            recent = recent.filter(
                item => item !== name
            );

            recent.unshift(name);

            recent = recent.slice(0, 6);

            save();
        });
    });

    showRecentTools();
}


function showRecentTools() {
    const box =
        get("recentTools");

    if (!box) return;

    const recent = JSON.parse(
        localStorage.getItem(
            "studytools-recent"
        ) || "[]"
    );

    if (!recent.length) {
        box.innerHTML =
            "<p>No recently used tools.</p>";
        return;
    }

    box.innerHTML = `
        <h3>🕘 Recent Tools</h3>
        <div class="recent-tools-list">
            ${recent.map(item => `
                <span>
                    ${escapeHTML(item)}
                </span>
            `).join("")}
        </div>
    `;
}


function initSaveShortcut() {
    document.addEventListener(
        "keydown",
        event => {
            if (
                (event.ctrlKey ||
                    event.metaKey) &&
                event.key.toLowerCase() === "s"
            ) {
                event.preventDefault();

                const editor =
                    get("editorPage");

                const compiler =
                    get("compilerPage");

                if (
                    editor &&
                    editor.style.display !== "none"
                ) {
                    showToast("💾 Editor auto-saved");
                    return;
                }

                if (
                    compiler &&
                    compiler.style.display !== "none"
                ) {
                    showToast("💾 Compiler code saved");
                    return;
                }

                showToast("✓ Saved");
            }
        }
    );
}


function initLazyImages() {
    const images =
        document.querySelectorAll(
            "img[data-src]"
        );

    if (!images.length) return;

    if ("IntersectionObserver" in window) {
        const observer =
            new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (!entry.isIntersecting)
                            return;

                        const img =
                            entry.target;

                        img.src =
                            img.dataset.src;

                        img.removeAttribute(
                            "data-src"
                        );

                        observer.unobserve(img);
                    });
                }
            );

        images.forEach(img =>
            observer.observe(img)
        );
    } else {
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}


function initScrollProgress() {
    const bar =
        get("scrollProgress");

    if (!bar) return;

    function update() {
        const scrollTop =
            window.scrollY;

        const height =
            document.documentElement
                .scrollHeight -
            window.innerHeight;

        const progress =
            height > 0
                ? (scrollTop / height) * 100
                : 0;

        bar.style.width =
            progress + "%";
    }

    window.addEventListener(
        "scroll",
        update,
        { passive: true }
    );

    update();
}


function initPageVisibility() {
    const originalTitle =
        document.title;

    document.addEventListener(
        "visibilitychange",
        () => {
            if (document.hidden) {
                document.title =
                    "Come back 👋 | StudyToolsHub";
            } else {
                document.title =
                    originalTitle;
            }
        }
    );
}


function initAppReady() {
    setTimeout(() => {
        document.body.classList.add(
            "app-ready"
        );
    }, 100);
}


// Start Part 9
document.addEventListener("DOMContentLoaded", () => {
    initFavorites();
    initRecentTools();
    initSaveShortcut();
    initLazyImages();
    initScrollProgress();
    initPageVisibility();
    initAppReady();
});

// ===============================
// PART 10 — FINAL JS SETUP
// ===============================

function initFinalSetup() {

    // -------------------------------
    // External links safety
    // -------------------------------
    document.querySelectorAll(
        'a[target="_blank"]'
    ).forEach(link => {
        link.rel = "noopener noreferrer";
    });


    // -------------------------------
    // Required form validation
    // -------------------------------
    document.querySelectorAll("form").forEach(form => {

        form.addEventListener("submit", event => {

            const requiredFields =
                form.querySelectorAll("[required]");

            let valid = true;

            requiredFields.forEach(field => {

                if (!field.value.trim()) {
                    field.classList.add(
                        "input-error"
                    );

                    valid = false;
                } else {
                    field.classList.remove(
                        "input-error"
                    );
                }

            });

            if (!valid) {
                event.preventDefault();
                showToast(
                    "⚠️ Please fill required fields"
                );
            }

        });

    });


    // -------------------------------
    // Search shortcut
    // Ctrl + K / Cmd + K
    // -------------------------------
    document.addEventListener(
        "keydown",
        event => {

            if (
                (event.ctrlKey ||
                    event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                const search =
                    get("searchInput");

                search?.focus();
            }

        }
    );


    // -------------------------------
    // Escape closes menus
    // -------------------------------
    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape")
                return;

            document
                .querySelectorAll(
                    ".main-nav.active"
                )
                .forEach(nav => {
                    nav.classList.remove(
                        "active"
                    );
                });

        }
    );


    // -------------------------------
    // Online / Offline status
    // -------------------------------
    function updateOnlineStatus() {

        if (navigator.onLine) {
            document.body.classList.remove(
                "offline-mode"
            );
        } else {
            document.body.classList.add(
                "offline-mode"
            );
        }

    }

    window.addEventListener(
        "online",
        () => {
            updateOnlineStatus();
            showToast("🟢 Back online");
        }
    );

    window.addEventListener(
        "offline",
        () => {
            updateOnlineStatus();
            showToast("🔴 You are offline");
        }
    );

    updateOnlineStatus();


    // -------------------------------
    // Prevent broken buttons
    // -------------------------------
    document.querySelectorAll(
        "button"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                if (
                    button.disabled
                ) {
                    return;
                }

            }
        );

    });


    // -------------------------------
    // Page loaded
    // -------------------------------
    document.body.classList.add(
        "js-loaded"
    );

    setTimeout(() => {
        document.body.classList.add(
            "fully-loaded"
        );
    }, 300);

}


// ===============================
// GLOBAL ERROR HANDLER
// ===============================

window.addEventListener(
    "error",
    event => {

        console.error(
            "StudyToolsHub Error:",
            event.error || event.message
        );

    }
);


// ===============================
// UNHANDLED PROMISE ERRORS
// ===============================

window.addEventListener(
    "unhandledrejection",
    event => {

        console.error(
            "StudyToolsHub Promise Error:",
            event.reason
        );

    }
);


// ===============================
// FINAL START
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initFinalSetup();

        console.log(
            "StudyToolsHub JS loaded successfully 🚀"
        );

    }
);
