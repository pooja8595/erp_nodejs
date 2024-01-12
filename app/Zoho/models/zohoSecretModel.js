module.exports = (sequelize, Sequelize) => {

    const zohoSecretKey = sequelize.define('zohoSecret', {
        zohoSecretId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        client_id:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        access_token: {
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
        client_id:{
            type: Sequelize.STRING,
            allowNull: false,
        },
    })
    
    return zohoSecretKey;
}