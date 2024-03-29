const Employee = require('./employee');

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return 'Engineer';
    }

    generateHTMLCard() {
        let extrainfo = `<p>GitHub: <a href="https://github.com/${this.getGithub()}" target="_blank">${this.getGithub()}</a></p>`;
        return super.generateHTMLCard(extrainfo);
    }
}

module.exports = Engineer;