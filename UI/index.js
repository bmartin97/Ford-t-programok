let state = {
    roles: [],
}

const roles_table = document.querySelector("#roles-table");
const start_btn = document.querySelector("#start-btn");
const display = document.querySelector("#display");
const input_func = document.querySelector("#input-function");

let input, output, rules;


start_btn.addEventListener('click', function(evt) {
    display.innerHTML = "";
    let input_function = input_func.value;
        
    input_function = input_function.replace('(','').replace(')','');
    input_function = input_function.split(',');
    
    input = input_function[0];
    output = input_function[1];
    rules = input_function[2];
    
    
    solverLoop();    
});

start_btn.click();
window.solverLoop = solverLoop;

function solverLoop() {

    let index = getRuleCellIndex(getNextChar(input), getNextChar(output));
    let rule = getRule(index);
    
    switch (rule) {
        case "pop":
            input = input.substr(getNextChar(input).length);
            output = output.substr(getNextChar(output).length);
            break;
        case "elfogad":
            display.innerHTML += '<div class="success">✔ elfogad</div>'
            return;
    
        default:
            output = output.substr(getNextChar(output).length);
            if(rule.rule !== "ε") {
                output = rule.rule + output;
            }
            rules = rules + rule.rule_number;
            break;
    }
    showOnDisplay(rule);
    setTimeout(solverLoop, 200);
}

function getNextChar(text) {
    if(text.length > 2 && text[1] === "'") {
        return text[0] + text[1];
    } else {
        return text[0];
    }
}

function getRuleCellIndex(x, y) {
    const x_headers = roles_table.querySelectorAll("thead > tr > th");
    const x_index = [...x_headers].findIndex(head => head.innerHTML === x);
    if(x_index === -1) {
        display.innerHTML += `<div class="warning">⚠ invalid karakter: ${x}</div>`

        throw "not found x value";
    }
    const y_headers = roles_table.querySelectorAll("tbody > tr > td:first-child");
    const y_index = [...y_headers].findIndex(head => head.innerHTML === y);
    if(y_index === -1) {
        display.innerHTML += `<div class="warning">⚠ invalid karakter: ${y}</div>`
        throw "not found y value";
    }

    return { x: x_index + 1, y: y_index + 1};
}

function getRule({x, y}) {
    let rule = roles_table.querySelector(`tbody tr:nth-child(${y}) > td:nth-child(${x})`);

    const previusUsedCell = roles_table.querySelector(".use");
    if(previusUsedCell) {
        previusUsedCell.classList.remove("use");
    }

    rule.classList.add("use");

    rule = rule.querySelector("input").value;
    if(rule !== "") {
        if(rule !== "pop" && rule !== "elfogad") {
            rule = rule.split(',');
            return {
                rule: rule[0].replace('(',''),
                rule_number: rule[1].replace(')','')
            }
        } else {
            return rule;
        }
    } else {
        display.innerHTML += '<div class="wrong">✖ elutasít</div>'
        throw "empty rule cell"
    }
}

function showOnDisplay(rule) {
    const tempRule = rule !== "pop" ? `<span class="coral-highlight">(${rule.rule}, ${rule.rule_number})</span>` : `<span class="pop-highlight">${rule}</span>`;
    display.innerHTML += `
    <div class="row">
        <div class="rule">
            ${tempRule}
        </div>
        <div class="output">
            <div class="column">
                (
            </div>
            <div class="column">
                ${input},
            </div>
            <div class="column">
                ${output},
            </div>
            <div class="column">
                ${rules}
            </div>
            <div class="column">
                )
            </div>
        </div>
    </div>
    `;
}