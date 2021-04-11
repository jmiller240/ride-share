const { Model } = require("objection");
const User = require("./User");
const Vehicle = require("./Vehicle");
const Location = require('./Location');
const Driver = require('./Driver');

class Ride extends Model {
    static get tableName() {
        return 'ride';
    }

    static get relationMappings() {
        return {
            vehicle: {
                relation: Model.BelongsToOneRelation,
                modelClass: Vehicle,
                join: {
                    from: 'ride.vehicleID',
                    to: 'vehicle.id'
                } 
            },
            //Do we use two separate relations???
            fromLocation: {
                relation: Model.BelongsToOneRelation,
                modelClass: Location,
                join: {
                    from: 'ride.fromLocationID',
                    to: 'location.id'
                }
            },
            toLocation: {
                relation: Model.BelongsToOneRelation,
                modelClass: Location,
                join: {
                    from: 'ride.toLocationID',
                    to: 'location.id'
                }
            },
            user: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'ride.id',
                    through: {
                        from: 'passenger.rideID',
                        to: 'passenger.userID',
                    },
                    to: 'user.id'
                }
            },
            driver: {
                relation: Model.ManyToManyRelation,
                modelClass: Driver,
                join: {
                    from: 'ride.id',
                    through: {
                        from: 'drivers.rideID',
                        to: 'drivers.driverID',
                    },
                    to: 'driver.id'
                }
            },
        }
    }
}

module.exports = Ride;