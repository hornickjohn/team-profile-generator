const Employee = require('./employee');

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return 'Manager';
    }

    generateHTMLCard() {
        let extrainfo = `<p>Office number: ${this.getOfficeNumber()}</p>`;
        return super.generateHTMLCard(extrainfo);
    }
}

module.exports = Manager;