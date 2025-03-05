const mongoose = require("mongoose");

const SampleDataSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Customer",
        enum: {
            values: ["Admin", "Publisher", "Reviewer", "Moderator", "Customer"],
            message: "Please Select from the given options"
        },
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active"
    }
}, {
    timestamps: true
})

const SampleDataModel = mongoose.model("SampleData", SampleDataSchema);

module.exports = SampleDataModel;