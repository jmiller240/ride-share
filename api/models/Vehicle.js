const knex = require('knex');
const objection = require('objection');
const Model = objection.Model;
Model.knex(knex);

class Vehicle extends Model {
    static get tableName() {
        return 'vehicle';
    }
    static get relationMappings() {
        return {
            vehicleType: {
                relation: Model.BelongsToOneRelation,
                modelClass: VehicleType,
                join: {
                    from: 'vehicle.vehicleTypeId',
                    to: 'vehicleType.id'
                }
            },
            state: {
                relation: Model.BelongsToOneRelation,
                modelClass: State,
                join: {
                    from: 'vehicle.licenseState',
                    to: 'state.abbreviation'
                }
            },
            driver: {
                relation: Model.ManyToManyRelation,
                modelClass: Driver,
                join: {
                    from: 'vehicle.id',
                    through: {
                        from: 'authorizaion.vehicleId',
                        to: 'authorization.driverId'
                    },
                    to: 'driver.id'
                }
            }
        }
    }
}