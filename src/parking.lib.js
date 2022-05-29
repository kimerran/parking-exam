const _  = require('underscore')
const log = require('debug')('park:lib')

class Parking {
    constructor(parkingMap) {
        this.parkingMap = parkingMap
        // for testing only
        this.parkings = [
            // {
            //     carId: '7bea4e45-c67b-4250-82d1-e16288f983c7',
            //     slot: 'r1_0',
            //     entryTime: +new Date(),
            //     size: 1
            // }
        ]
    }

    findSlot (car) {
        // size S-1, M-2, L-3
        const carSize = car.size;
        const takenSlots = this.parkings.map(r => r.slot)
        let flatMap = []
        for(let row in this.parkingMap) {
            // iterate each row and flatten
            for(let ep in this.parkingMap[row]) {
                if (this.parkingMap[row][ep]) {
                    flatMap.push(Object.assign({},this.parkingMap[row][ep], {row:row, ep:ep }))
                }
            }
        }
        // filter by parking slot size and slots taken
        const capableSlots = flatMap.filter(r => r.s >= carSize && !takenSlots.includes(`${r.row}_${r.ep}`) )
        const openSlotsSorted = _.sortBy(capableSlots, 'd')
        // console.log('debug:openSlotsSorted', openSlotsSorted)
        const avail = openSlotsSorted.shift()
        return (avail) ? Object.assign({}, avail, {slot: `${avail.row}_${avail.ep}`}) : undefined;
    }
    park (car, slot) {
        const { carId, size } = car;
        log('cardId', carId, size, slot)

        // validate nd check if slot is taken
        const isTaken = ( this.parkings.filter(r => r.slot === slot).length > 0 )
        if (isTaken){
            log('debug:park:slot_taken', slot)
            return undefined;
        } else {
            const newPark = {
                carId: carId,
                entryTime: +new Date(),
                slot: slot,
                size: size
            }
            this.parkings.push(newPark)
            return newPark;
        }
    }

    unpark (car, futureDateInMs) {
        const { carId, size }= car;
        const endDateMs = (futureDateInMs) ? +new Date() + futureDateInMs : +new Date();
        const parkingEntry = this.parkings.filter(e => e.carId === carId).shift()

        const toHours = (timeInMs) => {
            return timeInMs / 1000 / 60 / 60;
        }

        const calculateParkingCharge = (spanHours, size) => {
            const flaRate = 40;
            if (spanHours <= 3) {
                return flaRate;
            } else {
                const excess = spanHours - 3;
                switch(size) {
                    case 1:
                        return flaRate + excess * 20;
                    case 2:
                        return flaRate + excess * 60;
                    case 3:
                        return flaRate + excess * 100;
                    default:
                        throw new Error('Size is invalid')
                }
            }
        }

        if (parkingEntry) {
            const calcTimeSpan = endDateMs - parkingEntry.entryTime;
            const spanHours = toHours(calcTimeSpan)
            const charge = Number(calculateParkingCharge(spanHours, size).toFixed(2))
            return {
                charge: charge,
                spanHours: spanHours,
            };
        } else {
            log('Parking Entry not found')
            return undefined;
        }
    }
}

module.exports = Parking;
