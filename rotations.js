import Employee from './Employee.js';
import Schedule from './Schedule.js';
import CurrentPositions from './CurrentPositions.js';




function createRotations(employees, startTime, endTime, numLines, numCash, numOrderTakers) {
    // vars
    let sched = "";
    
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
                    break;
                }
            }
            if (!currentPositions[i].hasCashier(j)) {

                for (let k = 0; k < employees.length; k++) {

                    if (employees[k].canFloat(time, i, currentPositions)) {
                        currentPositions[i].changeCashier(j, employees[k].name + "*");
                        break;
                    }
                }
            }
        }
        for (let j = 0; j < currentPositions[i].numOrderTakers; j++) {
            for (let k = 0; k < employees.length; k++) {
               // console.log(employees[k].shouldFloat(time, i, currentPositions));
                if (employees[k].shouldFloat(time, i, currentPositions) && !currentPositions[i].hasOrderTaker(j)) {
                    //  console.log(k + " " + employees[k].name);
                    currentPositions[i].changeOrderTaker(j, employees[k].name);
                    break;
                }
            }
            if (!currentPositions[i].hasOrderTaker(j)) {
                for (let k = 0; k < employees.length; k++) {
                    if (employees[k].canFloat(time, i, currentPositions)) {
                        currentPositions[i].changeOrderTaker(j, employees[k].name + "*");
                        break;
                    }
                }
            }
        }

        employees.forEach((employee) => {
            employee.updateFloat();
        });
    }

    for (let i = 0; i < currentPositions.length; i++) {
        

       // console.log(i / 2 + startTime - 12 + " PM Cashier: " + currentPositions[i].getCashiers() + " Order Taker: " + currentPositions[i].getOrderTakers());

        sched += returnTime(startTime, i) + " - " + returnTime(startTime, i + 1) + ": " + " Cashiers: " + currentPositions[i].getCashiers() + " Order Taker: " + currentPositions[i].getOrderTakers() + "\n";
    }

    document.getElementById('rotations').innerText = sched;

}

function returnTime(startTime, i) {
    let number = i/2
    if (Math.abs(number - Math.floor(number)) === 0.5) {
        return (i-1)/2 + startTime - 12 + ":30 PM";
    } else {
        return i/2 + startTime - 12 + ":00 PM";
    }
}
function prepRotations() {
    let employees = []
    const leftSide = JSON.parse(localStorage.getItem('leftSide'));
    const rightSide = JSON.parse(localStorage.getItem('rightSide'));

    // Assuming you have elements with IDs 'schedule1' and 'schedule2' in schedule.html
    // console.log(leftSide);
    // console.log(rightSide);

    for (let i = 0; i < leftSide.length; i++) {
        let string = leftSide[i];
        let name = string.substring(0, string.indexOf(","));
        string = string.substring(string.indexOf(",") + 2);
        let time = string.substring(0, string.indexOf(","));
        string = string.substring(string.indexOf(",") + 2);
        let position = string;

        let start = parseInt(time.substring(0, time.indexOf("-")));
        let end = parseInt(time.substring(time.indexOf("-") + 1));

        employees.push(new Employee(name, position, start, end));
    }
    for (let i = 0; i < rightSide.length; i++) {
        let string = rightSide[i];
        let name = string.substring(0, string.indexOf(","));
        string = string.substring(string.indexOf(",") + 2);
        let time = string.substring(0, string.indexOf(","));
        string = string.substring(string.indexOf(",") + 2);
        let position = string;

        let start = parseInt(time.substring(0, time.indexOf("-")));
        let end = parseInt(time.substring(time.indexOf("-") + 1));

        employees.push(new Employee(name, position, start, end));
    }

    const lineInputValue = document.getElementById('lineInput').value;
    let startInputValue = parseInt(document.getElementById('startInput').value);
    let endInputValue = parseInt(document.getElementById('endInput').value);
    const cashiers = document.getElementById('cashiersInput').value;
    const orderTakers = document.getElementById('orderTakersInput').value;

    if (startInputValue < 10) {
        startInputValue += 12;
    }
    if (endInputValue < 11) {
        endInputValue += 12;
    }
    // console.log(startInputValue);

    // employees.forEach((employee)=> {
    //     console.log(employee.name + " {}{} " + employee.getPosition());
    // })

    createRotations(employees, startInputValue, endInputValue, lineInputValue, cashiers, orderTakers);

}

document.getElementById("createRotationsButton").addEventListener('click', prepRotations);