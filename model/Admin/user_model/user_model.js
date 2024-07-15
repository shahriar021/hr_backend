const connection = require("../../../connection/config/database");
const sha1 = require("sha1");

const users_model = {
  usersListAll: async (req, res) => {
    try {
      const data = "SELECT * FROM users";

      connection.query(data, function (error, result) {
        if (!error) {
          res.status(200).send(result);
        } else {
          console.error(error);
          res.status(500).send("Internal server error");
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
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
    const { email, password } = req.body;

    const sql = "select * from users where email=?";

    connection.query(sql, [email], (err, result) => {
      if (err) {
        res.status(500).json("login failed.");
      } else if (result.length == 0) {
        res.status(401).json("user not found..");
      } else {
        const user = result[0];
        const hashedPassword = sha1(password);
        if (hashedPassword === user.password) {
          // res.status(200).json('login successfull', user.id);
          console.log("User ID:", user.id);
          res
            .status(200)
            .json({ message: "Login successful", userId: user.id });

          console.log(user.id);
        } else {
          res.status(400).json("invalid password");
        }
      }
    });
  },

  userToken: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const data = "update users set token=? where id=?";
      const value = [req.body.token, id];

      connection.query(data, value, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.status(200).json({ message: "successfully updated" });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },

  changePassword: async (req, res) => {
    const { id } = req.params;
    const { old_password, new_password } = req.body;
    const hashedOldPassword = sha1(old_password);
    const hashedNewPassword = sha1(new_password);

    // Step 1: Fetch user's current hashed password
    const fetchSql = "SELECT password FROM users WHERE id=?";
    connection.query(fetchSql, [id], (fetchErr, fetchResult) => {
      if (fetchErr) {
        console.error("Error fetching user:", fetchErr);
        return res
          .status(500)
          .send({ error: "Database error while fetching user" });
      }
      if (fetchResult.length === 0) {
        console.error("User not found");
        return res.status(404).json({ error: "User not found" });
      }

      const storedHashedPassword = fetchResult[0].password;

      // Step 2: Compare old password
      if (hashedOldPassword !== storedHashedPassword) {
        console.error("Incorrect old password");
        return res.status(401).json({ error: "Incorrect old password" });
      }

      // Step 3: Update password with new hashed password
      const updateSql = "UPDATE users SET password=? WHERE id=?";
      connection.query(
        updateSql,
        [hashedNewPassword, id],
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Error updating password:", updateErr);
            return res
              .status(500)
              .send({ error: "Database error while updating password" });
          }
          console.log("Password successfully updated");
          return res
            .status(200)
            .json({ message: "Password successfully updated" });
        }
      );
    });
  },

  userProfileUpdate: async (req, res) => {
    const { id } = req.params;
    // const {full_name, email, mobile} = req.body;
    const sql = "update users set full_name=?, email=?, mobile=? where id=?";
    const value = [req.body.full_name, req.body.email, req.body.mobile, id];

    try {
      connection.query(sql, value, (err, result) => {
        if (err) {
          console.error("Error updating password:", err);
        } else {
          res.status(200).send(result);
        }
      });
    } catch (err) {
      console.error("Error updating password:", err);
    }
  },

  usersListAllForSpecific: async (req, res) => {
    const { id } = req.params;
    try {
      const data = "SELECT * FROM users where id=?";

      connection.query(data, [id], function (error, result) {
        if (!error) {
          res.status(200).send(result);
        } else {
          console.error(error);
          res.status(500).send("Internal server error");
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },
};

module.exports = users_model;
