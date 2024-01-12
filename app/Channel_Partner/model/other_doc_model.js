module.exports = (sequelize, Sequelize) => {
    const otherDocoments = sequelize.define("other_document", {
       other_document_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        channel_partner_id: {
            type: Sequelize.INTEGER,
        },
        file_name: {
            type: Sequelize.STRING,
        },
        other_docs: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
            defaultValue: 'ACTIVE'
        }
    })
    return otherDocoments;
}