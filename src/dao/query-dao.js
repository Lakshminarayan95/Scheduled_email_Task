const schemaModel = require('../model/List-schema');

exports.create = (payload) => {
    return new schemaModel({
        name: payload.name,
        mobile: payload.mobile,
        email: payload.email,
        content: payload.content,
        created_date: payload.created_date,
        deliver_date: payload.deliver_date
    }).save();
};

exports.getData = (conditions = {}) => {
    return schemaModel.find(conditions);
};

exports.getOne = (conditions, deselectFields) => {
    if (deselectFields) {
        return schemaModel.findOne(conditions, deselectFields);
    } else {
        return schemaModel.findOne(conditions);
    }
};

exports.updateByCondition = (condition, updateFields) => {
    return schemaModel.updateOne(condition, { $set: updateFields });
};

exports.getByConditions = (conditions) => {
    return schemaModel.find(conditions);
}
