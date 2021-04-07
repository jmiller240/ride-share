const knex = require('knex');

objection = require('objection');
const Model = objection.Model;
Model.knex(knex);

exports.up = function(knex, Promise){
    return knex.schema
        .createTable('user', table => {
            table.increments();
            table.string('firstName');
            table.string('lastName');
            table.string('email');
            table.string('password');
            table.string('phone');
            table.boolean('isAdmin');            
        })
        .then(() => Promise.all([
            knex.schema.createTable('vehicleType', table => {
                table.increments();
                table.string('type');
            }),
            knex.schema.createTable('state', table => {
                table.string('abbreviation').primary();
                table.string('name');
            })
        ]))
        .then(() => Promise.all([
            knex.schema.createTable('location', table => {
                table.increments();
                table.string('name');
                table.string('address');
                table.string('city');
                table.string('state').references('state.abbreviation');
            }), 
            knex.schema.createTable('driver', table => {
                table.increments();
                table.integer('userId').references('user.id');
                table.string('licenseNumber');
                table.string('licenseState').references('state.abbreviation');
            }),
            knex.schema.createTable('vehicle', table => {
                table.increments();
                table.string('make');
                table.string('model');
                table.string('color');
                table.integer('vehicleTypeId').references('vehicleType.id');
                table.integer('capacity');
                table.float('mpg');
                table.string('licenseState').references('state.abbreviation');
                table.string('licensePlate');
            }),
        ]))
        .then(() => Promise.all([
            knex.schema.createTable('authorization', table => {
                table.integer('driverID').references('driver.id');
                table.integer('vehicleID').references('vehicle.id');
            }),
            knex.schema.createTable('ride', table => {
                table.increments();
                table.date('date');
                table.time('time');
                table.float('distance');
                table.float('fuelPrice');
                table.float('fee');
                table.integer('vehicleID').references('vehicle.id');
                table.integer('fromLocationID').references('location.id');
                table.integer('toLocationID').references('location.id');                
            })
        ]))
        .then(() => Promise.all([
            knex.schema.createTable('passenger', table => {
                table.integer('userID').references('user.id');
                table.integer('rideID').references('ride.id');
            }),
            knex.schema.createTable('drivers', table => {
                table.integer('driverId').references('driver.id').primary();
                table.integer('rideId').references('ride.id').primary();
            })
        ]))
        .catch(err => console.log(`ERROR: ${err}`));
}