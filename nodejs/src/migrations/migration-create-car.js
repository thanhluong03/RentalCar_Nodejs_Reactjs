'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('cars', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name_car: {
                type: Sequelize.STRING(100)
            },
            image: {
                type: Sequelize.BLOB('long')
            },
            license_plate: {
                type: Sequelize.STRING(100)
            },
            type_id: {
                type: Sequelize.STRING(100)
            },
            brand: {
                type: Sequelize.STRING(100)
            },
            model_year: {
                type: Sequelize.STRING(4)
            },
            price_of_day: {
                type: Sequelize.STRING(100)
            },
            status_id: {
                type: Sequelize.STRING(100)
            },
            location_id: {
                type: Sequelize.INTEGER
            },
            created_at: {
            allowNull: false,
            type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('cars');
    }
};