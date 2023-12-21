module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.IS_DEV ? process.env.LOCAL_DB_HOST : process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  seeds: ['src/database/seeding/seeds/**/*.seed{.ts,.js}'],
  factories: ['src/database/seeding/factories/**/*.factory{.ts,.js}'],
  synchronize: process.env.TYPEORM_SYNC,
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
