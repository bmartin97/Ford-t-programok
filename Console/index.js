const recursiveWay = {
    i: 0,
    input: null,
    valid: true,
    errors: [],
    S(input) {
        this.errors = [];
        this.i = 0;
        this.input = input;
        this.E();
        this.Accept('#');
    },
    Accept(symbol) {
        if (symbol === this.input[this.i]) {
            this.i++;
        }
        else {
            this.errors.push(`🔴 Error at line ${this.i}. Character: ${this.input[this.i]}`);
            this.valid = false;
        }
    },
    E() {
        this.T();
        this.E_();
    },
    E_() {
        if (this.input[this.i] === '+') {
            this.Accept('+');
            this.T();
            this.E_();
        }
    },
    T() {
        this.F();
        this.T_();
    },
    T_() {
        if (this.input[this.i] === '*') {
            this.Accept('*');
            this.F();
            this.T_();
        }
    },
    F() {
        if (this.input[this.i] === '(') {
            this.Accept('(');
            this.E();
            this.Accept(')');
        }
        else {
            this.Accept('i');
        }
    },
    get Result() {
        return this.valid ? `✔ Accepted input: ${this.input}` : `✖ Invalid input: ${this.input}\nErrors: \n${this.errors.join("\n")}`
    }
}

recursiveWay.S("i+i*i+i*i+i#");
console.log(recursiveWay.Result);

recursiveWay.S("i++i#");
console.log(recursiveWay.Result);