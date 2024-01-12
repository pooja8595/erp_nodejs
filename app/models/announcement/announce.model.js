
module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize");

  const Announcement_email = sequelize.define("announcement_email", {
    email_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
    },

    cc_email: {
      type: DataTypes.STRING,
      get: function () {
        return this.getDataValue('cc_email');
      },
      set: function (val) {
        return this.setDataValue('cc_email', JSON.stringify(val));
      }
    },

    bcc_email: {
      type: DataTypes.STRING,
      get: function () {
        return this.getDataValue('bcc_email');
      },
      set: function (val) {
        return this.setDataValue('bcc_email', JSON.stringify(val));
      }
    },

    to_email: {
      type: DataTypes.TEXT,
      get: function () {
        this.getDataValue('to_email');
      },
      set: function (val) {
        return this.setDataValue('to_email', JSON.stringify(val));
      }
    },
    //   cc_email: {
    //     type: Sequelize.ARRAY(Sequelize.TEXT),
    //     defaultValue: [],
    //   },
    //   bcc_email: {
    //     type: Sequelize.ARRAY(Sequelize.TEXT),      // defaultValue: [],
    //  },
    //   to_email: {
    //     type: Sequelize.ARRAY(Sequelize.TEXT),
    //     defaultValue: [],
    //   },
    subject: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.TEXT,
    },
    email_status: {
      type: DataTypes.ENUM("draft", "send"),
      defaultValue: "draft"
    },
    attach_status: {
      type: DataTypes.STRING,
      defaultValue: "false"
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.NOW
    }
  },
    {
      timestamps: false,
    }
  )
  return Announcement_email;
}