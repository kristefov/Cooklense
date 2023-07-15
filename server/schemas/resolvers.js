/* These lines of code are importing necessary dependencies and modules for the resolver function. */
const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in");
      }
      const user = await User.findById(context.user._id);

      return user;
    },
  },

  Mutation: {
    addUser: async (parent, { userData }) => {
      const user = await User.create(userData);
      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, { userData }, context) => {
      if (!context.user) throw new AuthenticationError("You must be logged in");
      const user = await User.findByIdAndUpdate(context.user._id, userData, {
        runValidators: true,
        new: true,
      });
      return user;
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    saveRecipe: async (parent, { recipeData }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in");
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedRecipes: recipeData } },
        { new: true }
      );
      return updatedUser;
    },

    removeRecipe: async (parent, { idMeal }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in");
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedRecipes: { idMeal: idMeal } } },
        { new: true }
      );

      return updatedUser;
    },

    addToWeekPlan: async (_, { day, recipeData }, { user }) => {
      if (!user) {
        throw new AuthenticationError("You must be logged in");
      }

      const updatedUser = await User.findByIdAndUpdate(
        { _id: user._id },
        { $addToSet: { weekPlan: { day: day, recipeData: recipeData } } },
        { new: true }
      );

      return updatedUser;
    },

    removeMealFromWeekPlan: async (_, { idMeal }, { user }) => {
      if(!user) {
        throw new AuthenticationError("You must be logged in");
      };

      const updatedUser = await User.findOneAndRemove(
        { _id: user._id },
        { $pull: { weekPlan: { recipeData: { idMeal: idMeal }}}},
        { new: true }
      );

      return updatedUser;
    },
  },
};

module.exports = resolvers;
