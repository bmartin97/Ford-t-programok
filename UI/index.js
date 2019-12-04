let state = {
    roles: [],
}

const roles_table = document.querySelector("#roles-table");
const start_btn = document.querySelector("#start-btn");
const input_func = document.querySelector("#input-function");

start_btn.addEventListener('click', function(evt) {
    let input_function = input_func.value;
    input_function = input_function.replace('(','').replace(')','');
    input_function = input_function.split(',');
    console.log(input_function);

    let input = input_function[0];
    let output = input_function[1];
    let rules = input_function[2];

    let index = getRuleCellIndex(input[0], output[0]);
    let rule = getRule(index);
});

console.log(getRule(getRuleCellIndex("+", "E'")));

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
    const rule = roles_table.querySelector(`tbody tr:nth-child(${y}) > td:nth-child(${x}) input`).value.split(',');
    return {
        rule: rule[0].replace('(',''),
        rule_number: rule[1].replace(')','')
    }
}