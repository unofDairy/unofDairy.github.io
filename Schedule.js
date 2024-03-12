export default class Schedule {

    constructor(startOfDay, endOfDay, numLines) {
        if (startOfDay < 9) {
            this.startOfDay = startOfDay + 12;
        }
        else {
            this.startOfDay = startOfDay;
        }
        if (endOfDay < 12) {
            this.endOfDay = endOfDay + 12;
        }
        else {
            this.endOfDay = endOfDay;
        }
    
        this.numLines = numLines;
    }

    getScheduleLength() {
        return this.endOfDay - this.startOfDay;
    }
}