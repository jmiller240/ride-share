const knex = require('knex');
const objection = require('objection');
const Model = objection.Model;
Model.knex(knex);

class VehicleType extends Model {
    static get tabelName() {
        return 'vehicleType';
    }
}