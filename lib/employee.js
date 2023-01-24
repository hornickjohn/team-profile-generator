class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return 'Employee';
    }

    //generates HTML displaying a card with employee info
    //if extrainfo passed, it adds it as an block of html in the card
    //this parameter is intended for use by inheriting classes to display their HTML card with their unique information
    generateHTMLCard(extrainfo) {
        let output = ``;
        output += `<div class="card">
    <h2>${this.getName().split(' ')[0]}</h2>
    <h3>${this.getRole()}</h3>
    <div class="infoarea">
        <p>ID: ${this.getId()}</p>
        <p>Email: <a href="mailto:${this.getEmail()}">${this.getEmail()}</a></p>`;
    
        if(extrainfo) {
            output += '\n' + extrainfo;
        }

    output += `
    </div>
</div>`;

        return output;
    }
}

module.exports = Employee;