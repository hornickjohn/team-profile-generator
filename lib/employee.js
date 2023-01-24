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
    <h2>${this.name.split(' ')[0]}</h2>
    <h3>${this.getRole()}</h3>
    <div class="infoarea">
        <p>ID: ${this.id}</p>
        <p>Email: <a href="mailto:${this.email}">${this.email}</a></p>`;
    
        if(extrainfo) {
            output += '\n' + extraInfo;
        }

    output += `
    </div>
</div>`;
    }
}

module.exports = Employee;