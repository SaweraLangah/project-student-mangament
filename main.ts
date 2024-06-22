#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

class student {
    static counter = 10000;
    name: string;
    Id: number;
    courses : string[] = [];
    totalBalance: number;

    constructor(names: string) {
        this.name = names;
        this.Id = student.counter++;
        this.courses = [];
        this.totalBalance = 50000;
    }

    enrollCourse(course: string) {
        this.courses.push(course);
    }
    viewBalance() {
        console.log(chalk.yellow (`this is your total balance ${this.totalBalance}`));
    }
    payAmount(amount: number) {
        this.totalBalance -= amount;
        console.log(chalk.italic.green(`${amount} fees paid successfully for ${this.courses}`));
    }

    viewStatus() {
        console.log(chalk.bold.greenBright.italic(`Name ${this.name}`));
        console.log(chalk.bold.blue.blue(`Id ${this.Id}`));
        console.log(chalk.bold.red(`Courses ${this.courses}`));
        console.log(chalk.bold.greenBright.italic(`Balance ${this.totalBalance}`));
    }
}

class studentManager {
    students: student[];

    constructor() {
        this.students = [];
    }

    //Method to add new student
    addStudents(name: string) {
        let studentN = new student(name);
        this.students.push(studentN);
        console.log(chalk.bold.red.italic(
            `student: ${name} added successfully student Id: ${studentN.Id}`
        ));
  }
    //Method to enroll a student in a course
    enrollstudent(studentId: number, course: string) {
        let student = this.findstudent(studentId);
        if (student) {
            student.enrollCourse(course);
            console.log(chalk.bold.green.italic(`${student.name} enrolled in ${course} successfully`));
        }
    }
    
    //Method to view a student balance
viewStudentBalance(studentId: number) {
    let student = this.findstudent(studentId);
    if (student) {
        student.viewBalance();
    } else {
        console.log(chalk.italic.red(`student not found please enter a correct student Id`));
    }
}

//Method to pay student fees
payStudentFees(studentId: number, amount: number) {
    let student = this.findstudent(studentId);
    if (student) {
        student.payAmount(amount);
    } else {
        console.log(chalk.italic.green(`student not found please enter a correct student Id`));
    }
}

//Method to display student status
showStudentStatus(studentId: number) {
    let student = this.findstudent(studentId);
    if (student) {
        student.viewStatus();
    } else {
        console.log(chalk.italic.blue(`student not found please enter a correct student Id`));
    }
}

// Method to find a student bu student id
findstudent(studentId: number) {
    return this.students.find((std) => std.Id === studentId);
}

}

//Main Function to run the program

async function main() {
    console.log(chalk.bold.cyan.italic("<<<", "-".repeat(50), ">>>"));
    console.log(chalk.bold.yellow.italic(`Welcome to "Sara": Student Managment System`));
    console.log(chalk.bold.blue.italic("<<<", "-".repeat(50), ">>>"));

    let manage = new studentManager();

    // Using while loop to keep program running
    while(true) {
        let choice = await inquirer.prompt({
            name: "choices",
            message: "Choose an option",
            type: "list",
            choices : [
                "Add student",
                "Enroll student",
                "View Balance",
                "Pay student Fees",
                "Show student status",
                "Exit",
            ],
        });

        // Using switch Case statement for user choice

        switch (choice.choices) {
            case "Add student":
                let input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a student Name"
                    }
                ]);
            manage.addStudents(input.name);

            break;
            case "Enroll student":
        let courseInput = await inquirer.prompt([
            {
                name: "Id",
                type: "number",
                message: "Enter a student Id"
            },
            {
                name: "course",
                type: "list",
                message: "Enter a course name",
                choices: ["Typescript", "Python", "Javascript"]
            }
        ]);
        manage.enrollstudent(courseInput.Id, courseInput.course);

        break;
        case "View Balance":
            let balance = await inquirer.prompt([
                {
                    name: "Id",
                    type: "number",
                    message: "Enter a student Id"
                }
            ]);
            manage.viewStudentBalance(balance.Id);

            break;
            case "Pay student Fees":
                let payFees = await inquirer.prompt([
                    {
                        name: "Id",
                        type: "number",
                        message: "Enter a student Id"
                    },
                    {
                        name: "amount",
                        type: "input",
                        message: "Enter amount"
                    }
                ]);
                manage.payStudentFees(payFees.Id, payFees.amount);

                break;
                case "Show student status":
            let studentstatus = await inquirer.prompt([
                {
                    name: "Id",
                    type: "number",
                    message: "Enter a student Id"
                }
            ]);
            manage.showStudentStatus(studentstatus.Id);

            break;
            case "Exit":
                console.log(chalk.bold.blue(`You are Exit..`));
                process.exit();
        }
    }
}

// calling the program
main();

