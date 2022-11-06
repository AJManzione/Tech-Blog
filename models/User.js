const sequelize = require("../config/connection");
const bcrypt = require('bcrypt');
const {
    Model,
    DataTypes
} = require('sequelize');

class User extends Model {
    checkPassword(userPw) {
        return bcrypt.compareSync(userPw, this.password);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    hooks: {
        async beforeCreate(data) {
            data.password = await bcrypt.hash(data.password, 10);
            return data;
        },
        async beforeUpdate(updatedData) {
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
            return updatedData;
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
})

module.exports = User;