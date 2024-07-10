const connection = require('../../../connection/config/database');

const mobile_allowance = {
  mobile_allowance_list: async (req, res) => {
    try {
      const data = 'select * from mobile_allowance';

      connection.query(data, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.status(200).send(result);
        }
      });
    } catch (err) {
      console.log(err, 'error');
    }
  },

  mobile_allowance_create: async (req, res) => {
    try {
      const {
        recharge_user,
        mobile,
        amount,
        recharge_time,
        created_date,
        modified_date,
        created_by,
      } = req.body;

      const query =
        'insert into mobile_allowance(recharge_user, mobile, amount, recharge_time, created_date, modified_date, created_by ) values(?,?,?,?,?,?,?)';
      const values = [
        recharge_user,
        mobile,
        amount,
        recharge_time,
        created_date,
        modified_date,
        created_by,
      ];

      connection.query(query, values, (err, result) => {
        if (err) {
          res.status(500).json({message: 'mobile allowance creation failed'});
        } else {
          res
            .status(200)
            .json({message: 'mobile allowance created successfully', result});
        }
      });
    } catch (err) {
      console.log(err);
    }
  },

  // mobile_allowance_delete: async (req, res) => {
  //   try {
  //     // const {id} = req.body;
  //     const query = 'Delete from mobile_allowance where id=?';
  //     connection.query(query, [req.params.id], (err, result) => {
  //       if (err) {
  //         res.status(500).json({message: 'deletion failed.'});
  //       } else {
  //         res.status(200).json({message: 'deletion successfull..'});
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err, 'error');
  //   }
  // },

  mobile_allowance_delete: async (req, res) => {
    try {
      const {id} = req.params;
      const query = 'DELETE FROM mobile_allowance WHERE id = ?';
      connection.query(query, [id], (error, result) => {
        if (!error && result.affectedRows > 0) {
          console.log(result);
          return res.send(result);
        } else {
          console.log(error || 'Product not found' || id);
          return res.status(404).json({message: 'Product not found.'});
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = mobile_allowance;
