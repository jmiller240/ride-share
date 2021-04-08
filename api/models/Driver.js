const knex = require('knex')({ 
    client: 'pg',
    connection: {
        host: 'localhost',
        database: 'dvdrental'
    }
});

const knex = require('knex');
const objection = require('objection');
const Model = objection.Model;

class Driver extends Model {
    static get tableName() {
        return 'driver';
    }
    static get relationMappings() {
        const Vehicle = require('./Vehicle');
        const Ride = require('./Ride');
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'driver.userId',
                    to: 'user.userId'
                }
            },
            state: {
                relation: Model.BelongsToOneRelation,
                modelClass: State,
                join: {
                    from: 'driver.licenseState',
                    to: 'state.abbreviation'
                }
            },
            vehicle: {
                relation: Model.ManyToManyRelation,
                modelClass: Vehicle,
                join: {
                    from: 'driver.id',
                    through: {
                        from: 'authorization.driverId',
                        to: 'authorization.vehicleId',
                    },
                    to: 'vehicle.id'
                }
            },
            ride: {
                relation: Model.ManyToManyRelation,
                modelClass: Ride,
                join: {
                    from: 'driver.id',
                    through: {
                        from: 'drivers.driverId',
                        to: 'drivers.rideId',
                    },
                    to: 'ride.id'
                }
            }
        };
    }
}
