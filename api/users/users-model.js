const db = require('../../data/db-config');

function find() {
    return db("users").select("id", "username").orderBy("id");
}

async function findBy(filter) {
    const [user] = await db("users").where(filter);
    return user;
}

async function add(user) {
    const [id] = await db("users").insert(user);
    return findById(id);
}

async function findById(id) {
    const [user] = await db("users").where({ id });
    return user;
}

module.exports = {
    find,
    findBy,
    add,
    findById
};