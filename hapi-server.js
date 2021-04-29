// Knex
const knex = require("knex")({
    client: "pg",
    connection: {
      host: "faraday.cse.taylor.edu",
      user: "jackson_miller",
      password: "xopijuti",
      database: "jackson_miller"
    },
  });
  
  // Objection
  const { Model } = require("objection");
  Model.knex(knex);
  
  // Models
  const User = require("./api/models/User");
  const Driver = require("./api/models/Driver");
  const Location = require("./api/models/Location");
  const Ride = require("./api/models/Ride");
  const State = require("./api/models/State");
  const Vehicle = require("./api/models/Vehicle");
  const VehicleType = require("./api/models/VehicleType");
  
  // Hapi
  const Joi = require("@hapi/joi"); // Input validation
  const Hapi = require("@hapi/hapi"); // Server
  
  const server = Hapi.server({
    host: "localhost",
    port: 3000,
    routes: {
      cors: true,
    },
  });
  
  async function init() {
    // Show routes at startup.
    await server.register(require("blipp"));
  
    // Output logging information.
    await server.register({
      plugin: require("hapi-pino"),
      options: {
        prettyPrint: true,
      },
    });

    //Configure routes
    server.route([
        {
            method: 'GET',
            path: '/rides',
            config: {
                description: "Search for rides",
                validate: {
                  payload: Joi.string().required()
                },
            },
            handler: async (request, h) => {
                const rides = Ride.
            }
        }
    ]);

    //Start the server
    await server.start();
}

// Go!
init();
