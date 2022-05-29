const { v4 } = require('uuid')
const log = require('debug')('park:main')
const parkingMap = require('../config/parkingmap.config')

const Parking = require('./parking.lib')

const parking = new Parking(parkingMap)

const newCar = (size) => {
    return {
        carId: v4(),
        size: size,
    }
}

const CAR_A = newCar(1)
const CAR_B = newCar(3)

const slot = parking.findSlot(CAR_A);
log('avail slot', slot)
const park1_result = parking.park(CAR_A, 'r1_1')

log('park1_result', park1_result)

// console.log(parking.parkings)

// try unpark
const THREE_HOURS_MS  = 10800 * 1000;
const FOUR_HOURS_MS = 14500 * 1000;
const FOUR_HALF_HOURS_MS = 16300 * 1000;

// parking.unpark(CAR_A, FOUR_HOURS_MS)
const slot2 = parking.findSlot(CAR_B)
log('avail for slot2', slot2)
parking.park(CAR_B, slot2.slot)
// log(parking.parkings)

const charge = parking.unpark(CAR_B,FOUR_HALF_HOURS_MS )
log('charge', charge)
