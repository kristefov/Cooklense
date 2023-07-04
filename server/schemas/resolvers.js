/* These lines of code are importing necessary dependencies and modules for the resolver function. */
const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth")

