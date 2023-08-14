const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    Review: [{
      type: Schema.Types.ObjectId,
      ref: "Review",
    }],
    favoriteCulture: [{
        type: Schema.Types.ObjectId,
        ref: "Culture",
    }],
    favoriteFoodNdrink: [{
      type: Schema.Types.ObjectId,
      ref: "Fooddrink",
    }],
    favoriteLeisure: [{
      type: Schema.Types.ObjectId,
      ref: "Leisure",
    }],
    // this second object adds extra properties: `createdAt` and `updatedAt`
  },
    {
      timestamps: true
    }
);

const User = model("User", userSchema);

module.exports = User;
