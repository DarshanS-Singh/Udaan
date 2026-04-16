const pool = require('./db');
const fs = require('fs');
const path = require('path');

async function migrate() {
    try {
        const sql = fs.readFileSync(path.join(__dirname, 'drizzle', '0000_nostalgic_rocket_racer.sql'), 'utf8');
        await pool.query(sql);
        console.log('Migration successful');
        process.exit(0);
    } catch (e) {
        console.error('Migration failed', e);
        process.exit(1);
    }
}
migrate();
