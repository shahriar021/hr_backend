const connection = require('../../../connection/config/database');
const sha1 = require('sha1');

const users_model = {
  usersListAll: async (req, res) => {
    try {
      const data = 'SELECT * FROM users';

      connection.query(data, function (error, result) {
        if (!error) {
          res.status(200).send(result);
        } else {
          console.error(error);
          res.status(500).send('Internal server error');
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  },

  // loginUserEmailPassword: (req, res) => {
  //   const {email, password} = req.body;

  //   const sql = 'SELECT * FROM users WHERE email = ?';
  //   connection.query(sql, [email], (err, result) => {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).json({message: 'Login failed'});
  //     } else if (result.length === 0) {
  //       res.status(401).json({message: 'User not found'});
  //     } else {
  //       const user = result[0];
  //       console.log(user);
  //       const hashedPassword = sha1(password);

  //       if (hashedPassword === user.password) {
  //         res.json({message: 'Login successful'});
  //       } else {
  //         res.json({message: 'Invalid password'});
  //       }
  //     }
  //   });
  // },

  loginUserEmailPassword: async (req, res) => {
    const {email, password} = req.body;

    const sql = 'select * from users where email=?';

    connection.query(sql, [email], (err, result) => {
      if (err) {
        res.status(500).json('login failed.');
      } else if (result.length == 0) {
        res.status(401).json('user not found..');
      } else {
        const user = result[0];
        const hashedPassword = sha1(password);
        if (hashedPassword === user.password) {
          // res.status(200).json('login successfull', user.id);
          console.log('User ID:', user.id);
          res.status(200).json({message: 'Login successful', userId: user.id});

          console.log(user.id);
        } else {
          res.status(400).json('invalid password');
        }
      }
    });
  },

  userToken: async (req, res) => {
    try {
      const {id} = req.params;
      console.log(id);
      const data = 'update users set token=? where id=?';
      const value = [req.body.token, id];

      connection.query(data, value, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.status(200).json({message: 'successfully updated'});
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = users_model;
