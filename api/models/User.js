const knex = require('knex');
const objection = require('objection');
const Model = objection.Model;

class User extends Model {
    static get tableName() {
        return 'user';
    }
    static get relationMappings() {
        const Ride = require('./Ride');
        return {
            relation: Model.ManyToManyRelation,
            modelClass: Ride,
            join: {
                from: 'user.id',
                through: {
                    from: 'passenger.userId',
                    to: 'passenger.rideId'
                },
                to: 'ride.id'
            }
        }
    }
}