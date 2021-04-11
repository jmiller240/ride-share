const { Model } = require('objection');
const Ride = require('./Ride');


class User extends Model {
    static get tableName() {
        return 'user';
    }

    static get relationMappings() {
        return {
            ride: {
                relation: Model.ManyToManyRelation,
                modelClass: Ride,
                join: {
                    from: 'user.id',
                    through: {
                        from: 'passenger.userID',
                        to: 'passenger.rideID'
                    },
                    to: 'ride.id'
                }
            },
        }
    }
}

module.exports = User;
