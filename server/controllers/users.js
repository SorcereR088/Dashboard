const pool = require('../db')


module.exports.allUsers = async (req, res) => {
    try {
        const allUsers = await pool.query('SELECT * FROM user_details');
        res.json(allUsers.rows)

    } catch (error) {
        console.error(error.message)
    }
}

module.exports.user = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await pool.query('SELECT * FROM user_details WHERE user_id = $1', [id])
        res.json(user.rows)

    } catch (error) {
        console.error(error.message)
    }
}