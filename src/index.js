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

const park1_result = parking.park(CAR_A, slot.slot)
log('park1_result', park1_result)


// Unparking example
const THREE_HOURS_MS  = 10800 * 1000;
const SIX_HOURS_MS = THREE_HOURS_MS * 2;
const FOUR_HALF_HOURS_MS = 16300 * 1000;

const charge = parking.unpark(CAR_A, SIX_HOURS_MS)
log('charge', charge)
