const knex = require('knex');
const objection = require('objection');
const Model = objection.Model;
Model.knex(knex);

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
                    from: 'ride.vehicleId',
                    to: 'vehicle.id'
                } 
            },
            //Do we use two separate relations???
            fromLocation: {
                relation: Model.BelongsToOneRelation,
                modelClass: Location,
                join: {
                    from: 'ride.fromLocationId',
                    to: 'location.id'
                }
            },
            toLocation: {
                relation: Model.BelongsToOneRelation,
                modelClass: Location,
                join: {
                    from: 'ride.toLocationId',
                    to: 'location.id'
                }
            },
            user: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'ride.id',
                    through: {
                        from: 'passenger.rideId',
                        to: 'passenger.userId',
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
                        from: 'drivers.rideId',
                        to: 'drivers.driverId',
                    },
                    to: 'driver.id'
                }
            },
        }
    }
}