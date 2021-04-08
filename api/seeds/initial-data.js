
const knex = require('knex');

objection = require('objection');
const Model = objection.Model;
Model.knex(knex);

exports.seed = function (knex, Promise) {
    return knex('drivers').del()
        .then(() => knex('passenger').del())
        .then(() => Promise.all([
            knex('ride').del(),
            knex('authorization').del()
        ]))
        .then(() => Promise.all([
            knex('location').del(),
            knex('driver').del(),
            knex('vehicle').del()
        ]))
        .then(() => Promise.all([
            knex('user').del(),
            knex('state').del(),
            knex('vehicleType').del()
        ]))
        .then(() => User.query().insertGraph([
            { '#id': 'Joe', firstName: 'Joe', lastName: 'Buck', email: 'joe@gmail.com', password: '1592', phone: '333-444-0000', isAdmin: true,
                passenger: [{
                    ride: [{
                        '#id': '10',
                        date: '2021-03-13',
                        time: '13:12:00',
                        distance: 80.0,
                        fuelPrice: 2.90,
                        fee: 25,
                        vehicle: [{
                            '#id': 'Buick',
                            make: 'Buick',
                            model: 'Lacrosse',
                            color: 'red',
                            vehicleType: [{
                                type: 'sedan'
                            }],
                            capacity: 4,
                            mpg: 18.9,
                            licenseState: [{
                                '#id': 'IN',
                                abbreviation: 'IN',
                                name: 'Indiana'
                            }],
                            licensePlate: 'HH5070'
                        }],
                        fromLocationID: [{
                            name: 'Walgreens',
                            address: '1 Main St',
                            city: 'Upland',
                            state: [{ '#ref': 'IN' }],
                            zipCode: '46989'
                        }],
                        toLocationID: [{
                            name: 'The Bullpen',
                            address: '5 Main St',
                            city: 'Zionsville',
                            state: [{ '#ref': 'IN' }],
                            zipCode: '46077'
                        }]

                    }]
                }]
            },
            { '#id': 'Tim', firsName: 'Tim', lastName: 'Bucktwo', email: 'tim@gmail.com', password: '1234567', phone: '555-555-5555', isAdmin: true,
                passenger: [{
                    ride: [{
                        '#id': "Bob's Ride",
                        date: '2021-04-10', time: '15:30:00', distance: 70.3, fuelPrice: 2.87, fee: 20,
                        Vehicle: [{
                            '#id': 'Ford', make: 'Ford', model: 'Explorer', color: 'maroon', capacity: 6, mpg: 26.5, licensePlate: '4W43IO',
                            vehicleType: [{
                                type: 'SUV'
                            }],
                            licenseState: [{
                                '#ref': 'IN'
                            }],
                        }],
                        fromLocationID: [{
                            name: 'Wengatz Hall',
                            address: '45 Reade ave',
                            city: 'Upland',
                            state: [{ '#ref': 'IN' }],
                            zipcode: '46989'
                        }],
                        toLocationID: [{
                            name: 'Wheaton University',
                            address: '284 Wheaton ave',
                            city: 'Wheaton',
                            state: [{
                                '#id': 'IL',
                                abbreviation: 'IL',
                                name: 'Illinois',
                            }]
                        }]
                    }]
                }]
            },
            { '#id': 'Susie', firstName: 'Susie', lastName: 'Jacobs', email: 'sue@yahoo.com', password: '343463134', phone: '555-234-1264', isAdmin: false,
                driver: [{
                    licenseNumber: '123456',
                    licenseState: [{ '#ref': 'OH' }],
                    authorization: [{
                        vehicleID: [{ '#ref': 'Buick' }]
                    }],
                    drivers: [{
                        rideID: [{ '#ref': '10' }]
                    }]
                }]
            },
            { '#id': 'Bob', firstName: 'Bob', lastName: 'Allen', email: 'bob@bob.edu', password: '4928598209', phone: '555-589-0934', isAdmin: true,
                Driver: [{
                    licenseNumber: '5496-483-4033',
                    licenseState: [{
                        '#ref': 'IL'
                    }],
                    authorization: [{
                        '#ref': 'Ford'
                    }],
                    Drivers: [{
                        '#ref': "Bob's ride"
                    }]
                }]
            }
        ])
    )
};
