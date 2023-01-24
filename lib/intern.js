const Employee = require('./employee');

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return 'Intern';
    }

    generateHTMLCard() {
        let extrainfo = `<p>School: ${this.school}</p>`;
        return super.generateHTMLCard(extrainfo);
    }
}

module.exports = Intern;