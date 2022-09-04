const output = document.getElementById("output");
const form = document.getElementById("calc_form");
const operand_btns = document.querySelectorAll("button[data-type=operand]");
const operator_btns = document.querySelectorAll("button[data-type=operator]");

// prevent reload on every button click
form.addEventListener("submit", (e) => {
    e.preventDefault();
});

// display operand(numbers) values when buttons clicked
let is_operator = false;
operand_btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        removeActive();
        if (output.value == "0") {
            output.value = e.target.value;
        } else if (output.value.includes(".")) {
            // ensure only one decimal is added i.e. - prevent duplicate clicks
            output.value = output.value + "" + e.target.value.replace(".", "");
        } else if (is_operator) {
            // check if an operator btn was already pressed. If so, set is_operator to false so we can continue calculations on new value
            is_operator = false;
            output.value = e.target.value;
        } else {
            output.value = output.value + "" + e.target.value;
        }
    });
});

// add operator functions
let equation = [];
operator_btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        removeActive();
        e.currentTarget.classList.add("active");

        switch (e.target.value) {
            case "%":
                output.value = parseFloat(output.value) / 100;
                break;
            case "invert":
                output.value = parseFloat(output.value) * -1;
                break;
            case "=":
                equation.push(output.value);
                output.value = eval(equation.join(""));
                equation = [];
                break;
            default:
                let last_item = equation[equation.length - 1];
                if (["/", "*", "+", "-"].includes(last_item) && is_operator) {
                    equation.pop();
                    equation.push(e.target.value);
                } else {
                    equation.push(output.value);
                    equation.push(e.target.value);
                }
                is_operator = true;
                break;
        }
    });
});

// remove active class from operators
const removeActive = () => {
    operator_btns.forEach((btn) => {
        btn.classList.remove("active");
    });
};
