class Robot {
    constructor(name) {
        this.name = name;
        this.energy = 80;
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
                (this.energy + energyAmount) > 100 ? this.energy = 100 : this.energy += energyAmount;
                break;
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
        if (dx + dy > this.maxMove) {
            return this.status('errorMove');
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
            this.energyMnger('charge', amount);
            return this.status('charge');
        }
    }

}

// let Nonko = new Robot ('Nonko');
// console.log(Nonko.status());
// console.log(Nonko.charge());
// console.log(Nonko.move(25, 17));
// console.log(Nonko.status('location'));
// console.log(Nonko.move(-10, -18));
// console.log(Nonko.status('location'));
// console.log(Nonko.status('location'));
// console.log(Nonko.charge(25));
// console.log(Nonko.status('energy'));
// console.log(Nonko.charge(25));