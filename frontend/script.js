const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentExpression = "";
let memory = 0;

// Scientific & math functions
function calculateFunction(func, value) {
    let num = parseFloat(value);
    if (isNaN(num)) return "";
    switch(func) {
        case "sqrt": return Math.sqrt(num);
        case "square": return num ** 2;
        case "reciprocal": return 1 / num;
        case "sin": return Math.sin(num * Math.PI / 180); // degrees
        case "cos": return Math.cos(num * Math.PI / 180);
        case "tan": return Math.tan(num * Math.PI / 180);
        case "log": return Math.log10(num);
        case "ln": return Math.log(num);
        case "exp": return Math.exp(num);
        default: return num;
    }
}

// Evaluate expression safely
function safeEval(expr) {
    try {
        // Replace ^ with **
        expr = expr.replace(/\^/g, "**");
        // Replace % with /100
        expr = expr.replace(/%/g, "/100");
        return eval(expr);
    } catch {
        return "Error";
    }
}

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.textContent;

        // Numbers / operators
        if (btn.classList.contains("number") || btn.classList.contains("operator")) {
            currentExpression += value;
            display.value = currentExpression;
        }

        // Clear all
        else if (btn.classList.contains("clear")) {
            currentExpression = "";
            display.value = "";
        }

        // Clear last entry
        else if (btn.classList.contains("clear-entry")) {
            currentExpression = currentExpression.slice(0, -1);
            display.value = currentExpression;
        }

        // Toggle sign
        else if (btn.classList.contains("toggle-sign")) {
            if(currentExpression) {
                if(currentExpression.startsWith("-"))
                    currentExpression = currentExpression.slice(1);
                else
                    currentExpression = "-" + currentExpression;
                display.value = currentExpression;
            }
        }

        // Scientific functions
        else if (btn.classList.contains("function")) {
            currentExpression = calculateFunction(btn.dataset.func, currentExpression).toString();
            display.value = currentExpression;
        }

        // Memory functions
        else if (btn.classList.contains("memory")) {
            switch(btn.dataset.mem) {
                case "MC": memory = 0; break;
                case "MR": currentExpression = memory.toString(); display.value = currentExpression; break;
                case "M+": memory += parseFloat(currentExpression || 0); break;
                case "M-": memory -= parseFloat(currentExpression || 0); break;
            }
        }

        // Equals
        else if (btn.classList.contains("equals")) {
            let result = safeEval(currentExpression);
            display.value = result;
            currentExpression = result.toString();
        }
    });
});