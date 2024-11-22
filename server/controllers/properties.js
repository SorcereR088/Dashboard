const pool = require('../db')

module.exports.allProperties = async (req, res) => {
    try {
        const allProperties = await pool.query('SELECT * FROM property_details');
        res.json(allProperties.rows)
    } catch (error) {
        console.error(error.message)
    }
}

module.exports.Property = async(req, res) => {

    try {
        const {id} = req.params;
        const Property = await pool.query('SELECT * FROM property_details WHERE property_id = $1', [id]);
        res.json(Property.rows)
    } catch (error) {
        console.error(error.message)
    }

}