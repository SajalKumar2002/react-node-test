const bcrypt = require("bcrypt")

const SampleDataModel = require("../models/sampleData.Model.js");
const UserModel = require("../models/user.Model.js");

const {
    sendTokenToClient
} = require('../helpers/jwt.helper')

const getData = async (req, res) => {
    try {
        const skips = (req.params.page - 1) * 10;
        const data = await SampleDataModel
            .find()
            .skip(skips)
            .limit(10);
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error", error?.message);
    }
}

const updateData = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await SampleDataModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error", error?.message);
    }
}

const deleteData = async (req, res) => {
    try {
        await SampleDataModel.findByIdAndDelete(req.params.id);
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
            const user = await UserModel.create(
                {
                    email: req.body.email,
                    password: hash,
                    name: req.body.name
                }
            );

            sendTokenToClient(
                {
                    id: user._id,
                    email: user.email
                },
                false,
                res
            )

        } else {
            res.status(409).send({ message: "User Already exists" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error", error?.message);
    }
}

const getDataLimit = async (req, res) => {
    try {
        const data = await SampleDataModel.estimatedDocumentCount();
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error", error?.message);
    }
}

module.exports = {
    getData,
    getDataLimit,
    updateData,
    deleteData,
    login,
    register
}