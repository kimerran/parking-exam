# Parking

## Configuration

Configuration example.
- r1, r2, r3 - are the entries
- 0,1,2 - are the entrypoints
- d: distance from entrypoint
- s: size (1: small, 2:med, 3:large)

```js
const parkingMap = {
    r1: {
        0: {d:1, s:3},
        1: {d:3, s:3},
        2: {d:1, s:1}
    },
    r2: {
        0: {d:2, s:1},
        1: {d:1, s:2},
        2: {d:2, s:3}
    },
    r3: {
        0: {d:3, s:1},
        1: {d:3, s:1},
    }
}
```

## Initialization
```js
const parking = new Parking(parkingMap)
```

## Car spec
```
{
    "carId": any,
    "size": Number [1,2,3]
}
```

## Finding the nearest parking slot
```js
parking.findSlot(CAR_A);
// { d: 1, s: 3, row: 'r1', ep: '0', slot: 'r1_0' }
```

## Parking
```js
parking.park(CAR_A, slot.slot)
// {
//      carId: 'd08ad379-f5cc-4164-9947-f48288ed2633',
//      entryTime: 1653804682217,
//      slot: 'r1_0',
//      size: 1
//  }
```

## Unparking
```js
parking.unpark(CAR_B)

// for testing, we can pass timeElapsed value
const THREE_HOURS_MS  = 10800 * 1000;
const SIX_HOURS_MS = THREE_HOURS_MS * 2;

parking.unpark(CAR_B, SIX_HOURS_MS)
// { charge: 100, spanHours: 6 }
```