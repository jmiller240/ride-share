const { Model } = require('objection');
const State = require('./State');

class Location extends Model {
    static get tableName() {
        return 'location';
    }
    static get relationMappings() {
        return {
            st: {
                relation: Model.BelongsToOneRelation,
                modelClass: State,
                join: {
                    from: 'location.state',
                    to: 'state.abbreviation'
                }
            }
        }
    }
}

module.exports = Location;