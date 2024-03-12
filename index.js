import Employee from './Employee.js';
import Schedule from './Schedule.js';
import CurrentPositions from './CurrentPositions.js';



function printSchedule() {
  
    let scheduleInput = document.getElementById("scheduleInput").value;
    //console.log(JSON.stringify(scheduleInput));
}

function scanInEmployees(employeesString) {
    let employees = [];
    while (employeesString.includes("\n")) {
        let employeePosition = employeesString.substring(0, employeesString.indexOf("\t"));
        employeesString = employeesString.substring(employeesString.indexOf("\t") + 1);
        let shiftTime = employeesString.substring(0, employeesString.indexOf("\t"));
        employeesString = employeesString.substring(employeesString.indexOf("\t") + 1);
        let shiftLength = employeesString.substring(0, employeesString.indexOf("\t"));
        employeesString = employeesString.substring(employeesString.indexOf("\t") + 1);
        let employeeName = employeesString.substring(0, employeesString.indexOf("\t"));
        employeesString = employeesString.substring(employeesString.indexOf("\n"));
        employeesString = employeesString.substring(employeesString.indexOf("\t") + 1);
        let shiftStart = shiftTime.substring(0, shiftTime.indexOf("-"));
        let shiftEnd = shiftTime.substring(shiftTime.indexOf("-") + 1);
        if (shiftStart.includes("pm")) {
            shiftStart = parseInt(shiftStart);
            if (shiftStart != 12) {
                shiftStart += 12;
            }
        }
        else {
            shiftStart = parseInt(shiftStart);
        }

        if (shiftEnd.includes("pm")) {
            shiftEnd = parseInt(shiftEnd);
            if (shiftEnd != 12) {
                shiftEnd += 12;
            }
        }
        else {
            shiftEnd = parseInt(shiftEnd);
        }
        if (employeeName.length > 2) {
            employees.push(new Employee(employeeName, employeePosition, shiftStart, shiftEnd));
        }
    }
    return employees;
}

function createDisplaySchedule(employees) {
    let displayEmployees = [];
    for (let i = 0; i < employees.length; i++) {
        displayEmployees[i] = employees[i].name + ", " + employees[i].shiftStart + "-" + employees[i].shiftEnd + ", " + employees[i].position;
    }
    //console.log(displayEmployees.join("\n"));
    var half_length = Math.ceil(displayEmployees.length / 2);

    var leftSide = displayEmployees.slice(0, half_length);
    var rightSide = displayEmployees.slice(half_length);

    localStorage.setItem('leftSide', JSON.stringify(leftSide));
    localStorage.setItem('rightSide', JSON.stringify(rightSide));

    // Now navigate to schedule.html
    // window.location.href = "schedule.html";
}


function createRotations(employees, startTime, endTime, numLines, numCash, numOrderTakers) {
    // vars

    const schedule = new Schedule(startTime, endTime, numLines);
    let currentPositions = [];
    let time = 0;

    for (let i = 0; i < (endTime - startTime) * 2; i++) {

        currentPositions.push(new CurrentPositions(numCash, numOrderTakers));
    }

    for (let i = 0; i < currentPositions.length; i++) {

        time = i / 2 + startTime;

        for (let j = 0; j < currentPositions[i].numCashiers; j++) {
            for (let k = 0; k < employees.length; k++) {

                if (employees[k].shouldFloat(time, i, currentPositions) && !currentPositions[i].hasCashier(j)) {
                    currentPositions[i].changeCashier(j, employees[k].name);
                    employees[k].isFloating();

                }
            }
            if (!currentPositions[i].hasCashier(j)) {
                for (let k = 0; k < employees.length; k++) {
                    if (employees[k].canFloat(time, i, currentPositions)) {
                        currentPositions[i].changeCashier(j, employees[k].name);
                        employees[k].isFloating();
                        continue;
                    }
                }
            }
        }
        for (let j = 0; j < currentPositions[i].numOrderTakers; j++) {
            for (let k = 0; k < employees.length; k++) {
                if (employees[k].shouldFloat(time, i, currentPositions) && !currentPositions[i].hasOrderTaker(j)) {

                    currentPositions[i].changeOrderTaker(j, employees[k].name);
                    employees[k].isFloating();

                }
            }
            if (!currentPositions[i].hasOrderTaker(j)) {
                for (let k = 0; k < employees.length; k++) {
                    if (employees[k].canFloat(time, i, currentPositions)) {
                        currentPositions[i].changeOrderTaker(j, employees[k].name);
                        employees[k].isFloating();
                        continue;
                    }
                }
            }
        }


        for (let j = 0; j < employees.length; j++) {
            employees[j].updateFloat();
        }
    }


    for (let i = 0; i < currentPositions.length; i++) {
       //console.log(i + " Cashier: " + currentPositions[i].getCashiers() + " Order Taker: " + currentPositions[i].getOrderTakers());
    }


}

function createSchedule() {
    printSchedule();
    let employees = scanInEmployees(document.getElementById("scheduleInput").value);
    createDisplaySchedule(employees);
   // window.location.href = "schedule.html";
    createRotations(employees, 14, 21, 3, 2, 2);
}

document.getElementById("button").addEventListener('click', createSchedule);


//console.log(schedule.startOfDay);

