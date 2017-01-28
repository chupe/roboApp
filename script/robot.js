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
                    console.log(`${this.name} is at location of ${this.location}.`);
                    return;
                } else {
                    console.log(`${this.name} has traveled a distance of ${this._temp.distance} to a new location of ${this.location}.`);
                    this._temp.distance = 0;
                    return;
                }
            case 'energy':
                this.energy == 100 ? console.log(`${this.name}'s energy is FULL!`) : console.log(`${this.name} has ${this.energy}% energy left.`);
                break;
            case 'charge':
                let charge = this.energy - this._temp.prevEnergy;
                console.log(`${this.name}'s had a ${charge}% charge for a total of ${this.energy}%.`);
                break;
            case 'errorMove':
                console.log(`A robot can travel a maximum of ${this.maxMove} steps.`);
                break;
            case 'selfNrg':
                return this.energy == 100 ? `${this.name}'s energy is FULL!` : `${this.name} has ${this.energy}% energy left.`;
            default:
                let energyAmount = 2;
                if (!this.energyMnger(energyAmount)) return;
                console.log(`${this.name} reporting for duty! My coordinates are ${this.location}. ${this.status('selfNrg')}`);
                break;
        }
    }

    energyMnger(energyAmount, action) {
        switch (action) {
            case 'charge':
                (this.energy + energyAmount) > 100 ? this.energy = 100 : this.energy += energyAmount;
                break;
            default:
                if (this.energy - energyAmount < 0) {
                    console.log('Energy is critically low! No action is possible. Please recharge!');
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
            this.status('errorMove');
            return;
        }
        if (!this.energyMnger(energyAmount)) return;
        this._temp.distance = Math.abs(dx) + Math.abs(dy);
        this.location = [this.location[0]+dx, this.location[1] + dy];
    }

    charge(amount = 10) {
        if (this.energy >= 100) {
            this.status('energy')
        } else {
            this._temp.prevEnergy = this.energy;
            this.energyMnger(amount, 'charge');
            this.status('charge');
        }
    }

}

const Nonko = new Robot ('Nonko');
Nonko.status();
Nonko.charge();
Nonko.move(12, 17);
Nonko.status('location');
Nonko.move(-10, -18);
Nonko.status('location');
Nonko.status('location');
Nonko.charge(25);
Nonko.status('energy');
Nonko.charge(25);
