const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb',
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool
    .query(
      `SELECT * from users
        WHERE email = $1`,
      [email],
    )
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
    .query(
      `SELECT * from users
      WHERE id = $1`,
      [id],
    )
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool
    .query(
      `INSERT INTO users (name,email,password)
      VALUES ($1,$2,$3) RETURNING *`,
      [user.name, user.email, user.password],
    )
    .then(res => {
      console.log(res.rows[0]);
      return res.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool
    .query(
      `SELECT reservations.*, properties.*
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2`,
      [guest_id, limit],
    )
    .then(res => {
      console.log(res.rows);
      return res.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  const queryStringWhereClauses = [` WHERE`, '\n  AND'];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id`;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `\n ${queryStringWhereClauses[0]} city LIKE $${queryParams.indexOf(`%${options.city}%`) + 1}`;
  }

  if (options.owner_id) {
    queryParams.length === 0
      ? (queryString += queryStringWhereClauses[0])
      : (queryString += queryStringWhereClauses[1]);
    queryParams.push(`%${options.owner_id}%`);
    queryString += ` owner_id = $${queryParams.indexOf(`%${options.owner_id}%`) + 1}`;
  }

  if (options.minimum_price_per_night) {
    queryParams.length === 0
      ? (queryString += queryStringWhereClauses[0])
      : (queryString += queryStringWhereClauses[1]);
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += ` cost_per_night >= $${queryParams.indexOf(`${options.minimum_price_per_night}`) + 1}`;
  }

  if (options.maximum_price_per_night) {
    queryParams.length === 0
      ? (queryString += queryStringWhereClauses[0])
      : (queryString += queryStringWhereClauses[1]);
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += ` cost_per_night <= $${queryParams.indexOf(`${options.maximum_price_per_night}`) + 1}`;
  }

  queryString += `\n  GROUP BY properties.id`;

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `\n  HAVING avg(property_reviews.rating) >= $${queryParams.indexOf(`${options.minimum_rating}`) + 1}`;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool
    .query(queryString, queryParams)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
