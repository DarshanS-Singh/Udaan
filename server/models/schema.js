const { pgTable, serial, text, varchar, timestamp } = require('drizzle-orm/pg-core');

const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  role: varchar('role', { length: 50 }).default('user'),
  ownerImg: text('ownerImg').array(),
  createdAt: timestamp('created_at').defaultNow()
});

module.exports = { users };
