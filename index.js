const Employee = require('./lib/employee');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const Manager = require('./lib/manager');
const inquirer = require('inquirer');
const fileStream = require('fs');

let team = [];

const RequireAnswer = input => input.trim();

//returns a formatted string literal with HTML contents for a web page representing current team
function CreateHTML() {
    let htmlOutput = ``;
    //create top part of generic html page
    htmlOutput += `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style.css">
    <title>My Team</title>
</head>
<body>
    <header>
        <h1>Team Profiles</h1>
    </header>
    <main>
`;

    //pass each employee into a function that generates a card displaying them
    for(let i = 0; i < team.length; i++) {
        htmlOutput += team[i].generateHTMLCard();
    }

    //create bottom part of generic html page
    htmlOutput += `
    </main>
</body>
</html>`;
    return htmlOutput;
}

//prompt user with sequence of questions getting data for a new employee to add to our data
function GetEmployeeInfo(employeetype) {
    //default questions for generic employee
    let questions = [
        { name:'name', message:'Name:', validation:RequireAnswer },
        { name:'id', message:'Employee ID:', validation:RequireAnswer },
        { name:'email', message:'Email Address:', validation:RequireAnswer }
    ];
    let str = 'employee';

    //set final question question and prompt based on employee type
    if(employeetype === 'manager') {
        str = 'team\'s manager';
        questions.push({ name:'office', message:'Office Number:', validation:RequireAnswer });
    } else if(employeetype === 'engineer') {
        str = 'engineer';
        questions.push({ name:'github', message:'Github Username:', validation:RequireAnswer });
    } else if(employeetype === 'intern') {
        str = 'intern';
        questions.push({ name:'school', message:'School:', validation:RequireAnswer });
    }

    //query user for information
    console.log('Please provide information about the ' + str + '.');
    inquirer.prompt(questions)
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

//prompt user with a menu offering them to add an engineer, add an intern, or exit the application
function DisplayMenu() {
    console.log('Would you like to add a team member?');
    inquirer.prompt([
        { name:'selection', message:'Would you like to add a team member?', type:'list', choices:['Add an Engineer', 'Add an Intern', 'Nope, Team Finished!'] }
    ])
    .then((answers) => {
        //get what user wants to do next, and go there
        if(answers.selection === 'Add an Engineer') {
            GetEmployeeInfo('engineer');
        } else if(answers.selection === 'Add an Intern') {
            GetEmployeeInfo('intern');
        } else {
            //user has selected no more input, wrap up
            fileStream.writeFile('teamprofiles.html',CreateHTML(),function(err) {
                if(err) {
                    throw err;
                }
            });
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

function init() {
    //start off getting manager info, menus will recursively continue from there
    GetEmployeeInfo('manager');
}

//begin CLI application
init();