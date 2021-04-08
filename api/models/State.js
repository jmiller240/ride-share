const knex = require('knex');
const objection = require('objection');
const Model = objection.Model;
Model.knex(knex);

class State extends Model {
    static get tableName() {
        return 'state';
    }
}