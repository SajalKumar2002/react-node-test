const bcrypt = require("bcrypt")

const SampleDataModel = require("../models/sampleData.Model.js");
const UserModel = require("../models/user.Model.js");

const {
    sendTokenToClient
} = require('../helpers/jwt.helper')

const getData = async (req, res) => {
    try {
        const page = req.params.page;
        const data = await SampleDataModel
            .find()
            .skip(page * 10)
            .limit(10);
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error", error?.message);
    }
}

const updateData = async (req, res) => {
    try {
        const data = await SampleDataModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error", error?.message);
    }
}

const deleteData = async (req, res) => {
    try {
        await SampleDataModel.findByIdandDelete(req.params.id);
        res.status(200);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error", error?.message);
    }
}

const login = async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email })
        if (!existingUser) {
            res.status(404).send({ message: "User not found" })
        } else {
            bcrypt.compare(req.body.password, existingUser.password, function (err, result) {
                if (result) {
                    sendTokenToClient(
                        {
                            id: existingUser._id,
                            email: existingUser.email
                        },
                        req.body.rememberMe,
                        res
                    )
                }
                else
                    res.status(401).send({ message: "Incorrect Credentials" })
            });

        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error", error?.message);
    }
}

const register = async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email })
        if (!existingUser) {
            const hash = await bcrypt.hash(req.body.password, 10)
            await UserModel.create(
                {
                    email: req.body.email,
                    password: hash,
                    name: req.body.name
                }
            );
            res.status(201).send({ message: "Successfully Registered" });
        } else {
            res.status(409).send({ message: "User Already exists" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error", error?.message);
    }
}

module.exports = {
    getData,
    updateData,
    deleteData,
    login,
    register
}