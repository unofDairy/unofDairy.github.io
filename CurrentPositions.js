export default class CurrentPositions {

    cashiers = [];
    orderTakers = [];

    constructor(numCashiers, numOrderTakers) {
        this.numCashiers = numCashiers;
        this.numOrderTakers = numOrderTakers;

        for (let i = 0; i < numCashiers; i++) {
            this.cashiers.push("N/A");
        }
        for (let i = 0; i < numOrderTakers; i++) {
            this.orderTakers.push("N/A");
        }
    }
    // cashier functions
    changeCashier(index, name) {
        this.cashiers[index] = name;
    }
    getCashiers() {
        return this.cashiers.toString();
    }
    getCashier(index) {
        return this.cashiers[index];
    }
    hasCashier(index) {
        if (this.cashiers[index] === "N/A") {
            return false;
        }
        else {
            return true;
        }
    }
    // order taker functions
    changeOrderTaker(index, name) {
        this.orderTakers[index] = name;
    }
    getOrderTakers() {
        return this.orderTakers.toString();
    }
    getOrderTaker(index) {
        return this.orderTakers[index];
    }
    hasOrderTaker(index) {
        if (this.orderTakers[index] === "N/A") {
            return false;
        }
        else {
            return true;
        }
    }
}