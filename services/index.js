'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken (user) {
  const payload = {
    sub: user._id, // Ideally this souldn't be the mongodb id to mantain the db separated... :P
    iat: moment().unix(), // Creation date
    exp: moment().add(14, 'days').unix(), // Expiration date
  }

  return jwt.encode(payload, config.SECRET_TOKEN)
}

module.exports = createToken