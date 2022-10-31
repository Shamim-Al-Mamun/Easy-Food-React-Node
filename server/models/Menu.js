const { Schema, model } = require("mongoose");

const menuSchema = new Schema(
  {
    menuName: {
      type: String,
      required: true,
      maxlength: 15,
      trim: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Menu = model("Easy_Food_Menu", menuSchema);
module.exports = Menu;
