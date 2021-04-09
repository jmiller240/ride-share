const { Model } = require('objection');

class User extends Model {
    static get tableName() {
        return 'user';
    }

    static get relationMappings() {
        const Ride = require('./Ride');
        return {
            rides: {
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
            },
        }
    }
}

module.exports = User;
