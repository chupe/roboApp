class Robot {
    constructor(name) {
        this.name = name;
        this.energy = 60;
        this.location = [0, 0];
        this.maxMove = 30;
        this._temp = {
            prevEnergy: '',
            prevLocation: [],
            distance: 0
        }
    }


    status(action) {
        switch (action) {
            case 'location':
                if (this._temp.distance == false){
                    return`${this.name} is at location of ${this.location}.`;
                } else {
                    let dist = this._temp.distance;
                    this._temp.distance = 0;
                    return `${this.name} has traveled a distance of ${dist} to a new location of ${this.location}.`;
                }
            case 'energy':
                return this.energy >= 100 ? `${this.name}'s energy is FULL!` : `${this.name} has ${this.energy}% energy left.`;
            case 'charge':
                let charge = this.energy - this._temp.prevEnergy;
                return `${this.name}'s had a ${charge}% charge for a total of ${this.energy}%.`;
            case 'errorMove':
                return `A robot can travel a maximum of ${this.maxMove} steps.`;
            case 'coorNaN':
                return 'Coordinates are not numbers';
            case 'selfNrg':
                return this.energy == 100 ? `${this.name}'s energy is FULL!` : `${this.name} has ${this.energy}% energy left.`;
            default:
                let energyAmount = 2;
                if (!this.energyMnger('check', energyAmount)) return this.energyMnger ('lowEnergy');
                return`${this.name} reporting for duty! My coordinates are ${this.location}. ${this.status('selfNrg')}`;
        }
    }

    energyMnger(action, energyAmount) {
        switch (action) {
            case 'charge':
                energyAmount = parseInt(energyAmount, 10);
                if (isNaN(energyAmount)) {
                    return 'Entered value is not a number';
                } else {
                    (this.energy + energyAmount) > 100 ? this.energy = 100 : this.energy += energyAmount;
                    return this.status('charge');
                }
            case 'lowEnergy':
                return 'Energy is critically low! No action is possible. Please recharge!';
            case 'check':
                if (this.energy < energyAmount) {
                    return false;
                } else {
                    this.energy -= energyAmount;
                    return true;
                }
        }
    }

    move(dx, dy) {
        let energyAmount = 5;
        dx = parseInt(dx);
        dy = parseInt(dy);
        if (dx + dy > this.maxMove) {
            return this.status('errorMove');
        } else if (isNaN(dx) || isNaN(dy)) {
            return this.status('coorNaN');
        }
        if (!this.energyMnger('check', energyAmount)) return;
        this._temp.distance = Math.abs(dx) + Math.abs(dy);
        this.location = [this.location[0]+dx, this.location[1] + dy];
        return this.status('location');
    }

    charge(amount = 10) {
        if (this.energy >= 100) {
            return this.status('energy');
        } else {
            this._temp.prevEnergy = this.energy;
            return this.energyMnger('charge', amount);
        }
    }

}

// let Nonko = new Robot ('Nonko');
// console.log(Nonko.status());
// console.log(Nonko.charge());
// console.log(Nonko.status('location'));
// console.log(Nonko.move(-10, -18));
// console.log(Nonko.status('location'));
// console.log(Nonko.status('location'));
// console.log(Nonko.charge(25));
// console.log(Nonko.status('energy'));
// console.log(Nonko.charge('aaa'));
// console.log(Nonko.charge(12));
// console.log(Nonko.charge('14'));
// console.log(Nonko.move('2', '12'));