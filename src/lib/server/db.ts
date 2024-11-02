import { Sequelize } from 'sequelize';
import { DB_STRING } from '$env/static/private';

export const sq = new Sequelize(DB_STRING, {
	dialect: 'postgres',
	logging: false
});
