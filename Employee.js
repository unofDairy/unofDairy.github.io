import CurrentPositions from './CurrentPositions.js';

export default class Employee {
    shouldFloatV = 0;
   
    constructor(name, position, shiftStart, shiftEnd) {
        this.name = name;
        this.position = position;
        this.shiftStart = shiftStart;
        this.shiftEnd = shiftEnd;

        this.getPosition();
    }



    isOnShift(time) {
        if ((this.shiftStart <= time) && (time < this.shiftEnd)) {
            return true;
        }
        else {
            return false;
        }
    }

    getPosition() {
        if (this.position.toLowerCase() === "order filler") {
            this.positionNum = 1;
        }
        else if (this.position.toLowerCase() === "rotation floater" || this.position.toLowerCase() === "senior rotation") {
            this.positionNum = 2;
        }
        else if (this.position.toLowerCase() === "station manager") {
            this.positionNum = 3;
        }
        else {
            this.positionNum = 4;
        }

        return this.positionNum;
    }

    canFloat(time, index, currentPositions) {
        if (currentPositions[index].getCashiers().toLowerCase().includes(this.name.toLowerCase()) || 
        currentPositions[index].getOrderTakers().toLowerCase().includes(this.name.toLowerCase()) || 
        this.positionNum != 2 ||
        !this.isOnShift(time)) {
            return false;
        }
        else {
            
            this.shouldFloatV = 2;
            return true;
        }
    }
    shouldFloat(time, index, currentPositions) {

       

        if (currentPositions[index].getCashiers().toLowerCase().includes(this.name.toLowerCase()) || 
        currentPositions[index].getOrderTakers().toLowerCase().includes(this.name.toLowerCase()) || 
        this.positionNum != 2 ||
        this.shouldFloatV > 0||
        !this.isOnShift(time)) {
            
            return false;
        }
        else {
            this.shouldFloatV = 2;
            return true;
        } 
    }


    updateFloat() {
        this.shouldFloatV--; 
    }


}