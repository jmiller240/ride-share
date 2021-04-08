const knex = require('knex');
const objection = require('objection');
const Model = objection.Model;

class Location extends Model {
    static get tableName() {
        return 'location';
    }
    static get relationMappings() {
        return {
            state: {
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