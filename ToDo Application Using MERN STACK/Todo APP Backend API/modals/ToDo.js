var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
var TodoSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
      },
      description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
      },
      category: {
        type: String
        // ref: "Category",
        // required: true
      },
      due:{
         type:Date,
      },
      status: {
        type: String,
        default: "Assigned",
        enum: ["Completed", "InProgress", "Assigned"]
      },
      user: {
        type: ObjectId,
        ref: "User",
        required:true
      }
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("ToDo", TodoSchema);
