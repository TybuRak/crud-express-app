const mongoose = require("mongoose");
const ConfigService = require("./ConfigService");
const User = require("../models/User");
const ObjectId = require('mongoose').Types.ObjectId

class DbService {
    static instance = new DbService();

    constructor() {
        mongoose.connect(ConfigService.instance.get('mongourl'), {
            dbName: ConfigService.instance.get('dbName')
        });
    }

    getUsers() {
        return User.find();
    }

    getByIdentifier(id) {
        if (ObjectId.isValid(id))
            return User.findOne({ $or: [ { _id: new ObjectId(id) }, { index: id } ] })
        else return User.findOne({ index: id });
    }

    deleteByIdentifier(id) {
        if (ObjectId.isValid(id))
            return User.deleteOne({ $or: [ { _id: new ObjectId(id) }, { index: id } ] })
        else return User.deleteOne({ index: id });
    }
}

module.exports = DbService;