const knex = require('knex');
const objection = require('objection');
const Model = objection.Model;

class VehicleType extends Model {
    static get tabelName() {
        return 'vehicleType';
    }
}