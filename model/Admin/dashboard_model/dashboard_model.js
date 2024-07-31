const connection = require("../../../connection/config/database");

// const dashboard_model = {
//   weeklyAllowance: (req, res) => {
//     const {id} = req.params;
//     const sql =
//       'SELECT mobile_allowance.amount AS mob,  transport_allowance.amount AS transFROM transport_allowance LEFT JOIN mobile_allowance ON mobile_allowance.recharge_user = transport_allowance.user_idWHERE transport_allowance.created_date >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) + 1 DAY)AND transport_allowance.created_date < DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) + 1 DAY), INTERVAL 5 DAY)AND mobile_allowance.created_date >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) + 1 DAY)AND mobile_allowance.created_date < DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) + 1 DAY), INTERVAL 5 DAY)AND user_id = ?';

//     connection.query(sql, [id], (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Internal server error');
//       }
//       res.status(200).send(result);
//     });
//   },
// };

const dashboard_model = {
  weeklyAllowance: (req, res) => {
    const { id } = req.params;
    const sql = `
      SELECT 
        mobile_allowance.amount AS mob, 
        transport_allowance.amount AS trans 
      FROM 
        transport_allowance 
      LEFT JOIN 
        mobile_allowance 
      ON 
        mobile_allowance.recharge_user = transport_allowance.user_id 
      WHERE 
        transport_allowance.created_date >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) + 1 DAY)
        AND transport_allowance.created_date < DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) + 1 DAY), INTERVAL 5 DAY)
        AND mobile_allowance.created_date >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) + 1 DAY)
        AND mobile_allowance.created_date < DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) + 1 DAY), INTERVAL 5 DAY)
        AND transport_allowance.user_id = ?`;

    connection.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
      }
      return res.status(200).send(result);
    });
  },
};

module.exports = dashboard_model;
