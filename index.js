const Employee = require('./lib/employee');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const Manager = require('./lib/manager');
const inquirer = require('inquirer');

let team = [];

const RequireAnswer = input => input.trim();

function CreateHTML() {
    console.log(team);
}

function GetEmployeeInfo(employeetype) {
    //default values for generic employee
    let str = 'employee';
    let lastQ = {};

    //set question and prompt based on employee type
    if(employeetype === 'manager') {
        str = 'team\'s manager';
        lastQ = { name:'office', message:'Office Number:', validation:RequireAnswer };
    } else if(employeetype === 'engineer') {
        str = 'engineer';
        lastQ = { name:'github', message:'Github Username:', validation:RequireAnswer };
    } else if(employeetype === 'intern') {
        str = 'intern';
        lastQ = { name:'school', message:'School:', validation:RequireAnswer };
    }

    //query user for information
    console.log('Please provide information about the ' + str + '.');
    inquirer.prompt([
        //questions
        { name:'name', message:'Name:', validation:RequireAnswer },
        { name:'id', message:'Employee ID:', validation:RequireAnswer },
        { name:'email', message:'Email Address:', validation:RequireAnswer },
        lastQ
    ])
    .then((answers) => {
        //create new object for the employee based on employee type
        if(employeetype === 'manager') {
            team.push(new Manager(answers.name, answers.id, answers.email, answers.office));
        } else if(employeetype === 'engineer') {
            team.push(new Engineer(answers.name, answers.id, answers.email, answers.github));
        } else if(employeetype === 'intern') {
            team.push(new Intern(answers.name, answers.id, answers.email, answers.school));
        } else {
            team.push(new Employee(answers.name, answers.id, answers.email));
        }

        //return user to menu after creating employee
        DisplayMenu();
    })
    .catch((error) => {
        console.log(error);
    });
}

function DisplayMenu() {
    console.log('Would you like to add a team member?');
    inquirer.prompt([
        //questions
        { name:'selection', message:'Would you like to add a team member?', type:'list', choices:['Add an Engineer', 'Add an Intern', 'Team Finished!'] }
    ])
    .then((answers) => {
        if(answers.selection === 'Add an Engineer') {
            GetEmployeeInfo('engineer');
        } else if(answers.selection === 'Add an Intern') {
            GetEmployeeInfo('intern');
        } else {
            //user has selected no more input, wrap up
            CreateHTML();
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

function init() {
    //start off getting manager info, menus will self-continue from there
    GetEmployeeInfo('manager');
}

init();