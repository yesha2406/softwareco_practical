const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        access_modules: [{
            type: String,
        }],
        active: {
            type: Boolean,
            default: true
        },
        createdAt: {
            type: Number,
        },
        updatedAt: {
            type: Number,
        },
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("role", roleSchema);
