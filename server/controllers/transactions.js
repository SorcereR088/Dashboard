const pool = require('../db');

module.exports.allTransactions = async (req, res) => {
    try {
        const allTransactions = await pool.query(`
            SELECT 
                t.transaction_id, 
                u.user_name, 
                p.property_name, 
                t.amount, 
                t.transaction_date
            FROM transactions t
            JOIN user_details u ON t.user_id = u.user_id
            JOIN property_details p ON t.property_id = p.property_id
            ORDER BY t.transaction_date DESC;
        `);

        res.json(allTransactions.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

