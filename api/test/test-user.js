const knexConfig = require("../knexfile.js");
const knex = require("knex")(knexConfig.development);
const { Model } = require("objection");
Model.knex(knex);

const User = require("../models/User.js");

async function create() {
  const newUser = await User.query().select("id", "firstName");

  /*.insert(
        {
            firstName: 'Pat',
            lastName: 'Rick',
            email: 'pr@gmail.com',
            password: 'patty',
            phone: '209-456-3201',
            isAdmin: false,
        }
    )*/
  console.log("CREATE\n", newUser);
}

async function read() {}

async function update() {}

async function deleteTest() {}

async function main() {
  create();
  /*read();
    update();
    deleteTest();
    */
}

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

main();
