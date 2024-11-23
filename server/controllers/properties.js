const pool = require('../db')

module.exports.allProperties = async (req, res) => {
  try {
    // SQL query to retrieve property details with host and images
    const allProperties = await pool.query(`
      SELECT 
        p.property_id, 
        p.property_name, 
        p.description, 
        p.price, 
        p.host_id, 
        h.host_name,
        h.host_email,
        json_agg(i.image_url) AS images
      FROM property_details p
      LEFT JOIN property_images i ON p.property_id = i.property_id
      LEFT JOIN hosts h ON p.host_id = h.host_id
      GROUP BY p.property_id, h.host_name, h.host_email
    `);
    res.json(allProperties.rows); // Send the result back to frontend
  } catch (error) {
    console.error(error.message);
  }
};
  

module.exports.Property = async(req, res) => {

    try {
        const {id} = req.params;
        const Property = await pool.query('SELECT * FROM property_details WHERE property_id = $1', [id]);
        res.json(Property.rows)
    } catch (error) {
        console.error(error.message)
    }

}