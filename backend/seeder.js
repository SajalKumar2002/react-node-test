require("dotenv").config();
const db = require("./config/db");

const SampleDataModel = require("./models/sampleData.Model");
const UserModel = require("./models/user.Model");

const mock = require("./MOCK_DATA")

const importData = async () => {
    try {
        db;
        await SampleDataModel.deleteMany();
        await UserModel.deleteMany();

        await SampleDataModel.insertMany(mock);
        
        const user = { name: "Admin", email: "admin@gmaiil.com", password: "password" };

        await UserModel.create(user);

        console.log('Data Imported');
        process.exit();
    } catch (error) {
        console.error(`${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await SampleDataModel.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
