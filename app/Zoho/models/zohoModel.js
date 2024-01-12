module.exports = (sequelize, Sequelize) => {

    const ZohoToken = sequelize.define('ZohoToken', {
        ZohoTokenId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        access_token: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        refresh_token: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        api_domain:{
            type: Sequelize.STRING,
                allowNull: false,
           },
           token_type:{
            type: Sequelize.STRING,
                allowNull: false,
           },
        expires_in: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          lead_genration_id:{
            type: Sequelize.INTEGER
          }
    })
    
    return ZohoToken;
}