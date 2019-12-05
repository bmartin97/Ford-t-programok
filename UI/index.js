let state = {
    roles: [],
}

const roles_table = document.querySelector("#roles-table");
const start_btn = document.querySelector("#start-btn");
const input_func = document.querySelector("#input-function");

let input, output, rules;

start_btn.addEventListener('click', function(evt) {
    let input_function = input_func.value;

    console.log(input_function);

    input_function = input_function.replace('(','').replace(')','');
    input_function = input_function.split(',');

    input = input_function[0];
    output = input_function[1];
    rules = input_function[2];


    solverLoop();    
});

window.solverLoop = solverLoop;

function solverLoop() {
    let index = getRuleCellIndex(getNextChar(input), getNextChar(output));
    let rule = getRule(index);
    
    console.log(rule);
    switch (rule) {
        case "pop":
            input = input.substr(getNextChar(input).length);
            output = output.substr(getNextChar(output).length);
            break;
        case "ε":
            
        case "elfogad":
            return;
    
        default:
            console.log(rule.rule+","+rule.rule_number);
            output = output.substr(getNextChar(output).length);
            if(rule.rule !== "ε") {
                output = rule.rule + output;
            }
            rules = rules + rule.rule_number;
            break;
    }
    console.log(`${input}, ${output}, ${rules}`);
    solverLoop();

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
        throw "not found x value";
    }
    const y_headers = roles_table.querySelectorAll("tbody > tr > td:first-child");
    const y_index = [...y_headers].findIndex(head => head.innerHTML === y);
    if(y_index === -1) {
        throw "not found y value";
    }

    return { x: x_index + 1, y: y_index + 1};
}

function getRule({x, y}) {
    let rule = roles_table.querySelector(`tbody tr:nth-child(${y}) > td:nth-child(${x}) input`).value;
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
        throw "empty rule cell"
    }
}