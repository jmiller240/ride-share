const { Model } = require('objection');
const User = require('../models/User');
const knex = require('../knexfile');
Model.knex(knex.development);

async function create() {

    const newUser = await User.query().insert(
        {
            firstName: 'Pat',
            lastName: 'Rick',
            email: 'pr@gmail.com',
            password: 'patty',
            phone: '209-456-3201',
            isAdmin: false,
        }
    )
    console.log('CREATE\n', newUser)
}

async function read() {


}

async function update() {


}

async function deleteTest() {


}


async function main() {
    create();
    read();
    update();
    deleteTest();

}

main();