const connection = require("../../../connection/config/database");

const office_visit = {
  office_visit_list: async (req, res) => {
    try {
      //   const data =
      //     'select * from office_visit inner join office_visit_remarks on office_visit.id = office_visit_remarks.office_visit_id';
      // const data =
      //   'SELECT remarks FROM office_visit ov left JOIN  office_visit_remarks ovr ON ov.id = ovr.office_visit_id left JOIN office_visit_person ovp ON ov.id = ovp.office_visit_id';
      // const data =
      //   'SELECT office_name,office_address,office_mobile,office_email,add_office_date,remarks,remarks_date,person_name,person_email,person_mobile,add_person_date FROM office_visit ov LEFT JOIN office_visit_remarks ovr ON ov.id = ovr.office_visit_id LEFT JOIN office_visit_person ovp ON ov.id = ovp.office_visit_id GROUP BY remarks;';
      const data =
        "SELECT ov.id,ov.office_name, ov.user_id, ov.office_address, ov.office_mobile, ov.office_email, ov.add_office_date, ovr.remarks,ovr.office_visit_id, ovr.remarks_date, ovp.person_name, ovp.person_email, ovp.person_mobile, ovp.add_person_date FROM office_visit ov LEFT JOIN office_visit_remarks ovr ON ov.id = ovr.office_visit_id LEFT JOIN office_visit_person ovp ON ov.id = ovp.office_visit_id ORDER BY ov.id DESC ";
      connection.query(data, (err, result) => {
        if (err) {
          res.status(504).json({ message: "no data" });
        }
        res.status(200).send(result);
      });
    } catch (err) {
      console.log(err);
    }
  },

  office_visit_delete: async (req, res) => {
    const { id } = req.params;
    const dataRe = "delete from office_visit_remarks where office_visit_id = ?";
    const dataPer = "delete from office_visit_person where office_visit_id = ?";
    const data = "delete from office_visit where id = ?";

    try {
      // Promisify the connection.query method
      const query = (sql, params) => {
        return new Promise((resolve, reject) => {
          connection.query(sql, params, (err, result) => {
            if (err) {
              return reject(err);
            }
            resolve(result);
          });
        });
      };

      // Execute each delete query sequentially
      await query(dataRe, [id]);
      await query(dataPer, [id]);
      await query(data, [id]);

      res.status(200).json({ message: "deleted.." });
    } catch (err) {
      res.status(504).json({ message: "not found" });
    }
  },

  // offce_visit_all_create: async (req, res) => {
  //   try {
  //     const {
  //       office_name,
  //       office_address,
  //       office_mobile,
  //       office_email,
  //       created_by,
  //       add_office_date,
  //       user_id,
  //       remarks_date,
  //       remarks,
  //       person_name,
  //       person_mobile,
  //       person_email,
  //       add_person_date,
  //     } = req.body;

  //     // Assuming you have a connection object already defined
  //     connection.beginTransaction();

  //     const userQuery = `INSERT INTO office_visit (office_name, office_address, office_mobile, office_email,  created_by, add_office_date, user_id)
  //                               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  //     const userParams = [
  //       office_name,
  //       office_address,
  //       office_mobile,
  //       office_email,
  //       created_by,
  //       add_office_date,
  //       user_id,
  //     ];

  //     connection.query(userQuery, userParams, async (err, results) => {
  //       if (err) {
  //         console.error(err);
  //         await connection.rollback();
  //         res.status(500).json({ message: "User creation failed" });
  //         return;
  //       }

  //       try {
  //         const officeVisit = results.insertId;
  //         const employeInfoQuery = `INSERT INTO office_visit_remarks ( office_visit_id, remarks_date, remarks, created_by, user_id) VALUES (?, ?, ?, ?, ?)`;
  //         const employeInfoParams = [
  //           officeVisit,
  //           remarks_date,
  //           remarks,
  //           created_by,
  //           user_id,
  //         ];

  //         const eduQualificationQuery = `INSERT INTO office_visit_person ( office_visit_id, person_name,  person_mobile, person_email, created_by, add_person_date,
  //                   user_id)
  //                                                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
  //         const eduQualificationParams = [
  //           officeVisit,
  //           person_name,
  //           person_mobile,
  //           person_email,
  //           created_by,
  //           add_person_date,
  //           user_id,
  //         ];

  //         // Insert into employe_info table
  //         await connection.query(employeInfoQuery, employeInfoParams);
  //         // Insert into educational_qualification table
  //         await connection.query(eduQualificationQuery, eduQualificationParams);
  //         // Insert into living_address table

  //         // New addition: Insert into employee_promotion table

  //         await connection.commit();

  //         res.status(200).json({ message: "User created successfully" });
  //       } catch (error) {
  //         console.error("Error inserting additional data:", error);
  //         await connection.rollback();
  //         res.status(500).json({ message: "Error inserting additional data." });
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error inserting data:", error);
  //     await connection.rollback();
  //     res.status(500).json({ message: "Error inserting data." });
  //   }
  // },

  // offce_visit_all_create: async (req, res) => {
  //   try {
  //     const {
  //       office_name,
  //       office_address,
  //       office_mobile,
  //       office_email,
  //       add_office_date,
  //       created_by,
  //       created_date,
  //       modified_date,
  //       remarks,
  //       remarks_date,
  //       person_name,
  //       person_mobile,
  //       person_email,
  //       add_person_date,
  //       user_id,
  //     } = req.body;

  //     const queryFirst =
  //       "INSERT INTO office_visit (office_name, office_address, office_mobile, office_email, add_office_date, created_by, created_date, modified_date,user_id,) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  //     const valuesFirst = [
  //       office_name,
  //       office_address,
  //       office_mobile,
  //       office_email,
  //       add_office_date,
  //       created_by,
  //       created_date,
  //       modified_date,
  //       user_id,
  //     ];

  //     connection.query(queryFirst, valuesFirst, (err, result) => {
  //       if (err) {
  //         return res.status(400).json({
  //           error: `Bad Request: Invalid data provided for office visit a. ${err}`,
  //         });
  //       }

  //       console.log(result);

  //       const office_visit_id = result.insertId;

  //       const querySecond =
  //         "INSERT INTO office_visit_remarks (office_visit_id, remarks, remarks_date, created_by, created_date, modified_date,user_id,) VALUES (?, ?, ?, ?, ?, ?, ?)";
  //       const valuesSecond = [
  //         office_visit_id,
  //         remarks,
  //         remarks_date,
  //         created_by,
  //         created_date,
  //         modified_date,
  //         user_id,
  //       ];

  //       connection.query(querySecond, valuesSecond, (err, result) => {
  //         if (err) {
  //           return res.status(400).json({
  //             error:
  //               "Bad Request: Invalid data provided for office visit remarks b. b",
  //           });
  //         }

  //         const queryThirdd =
  //           "INSERT INTO  office_visit_person  (office_visit_id,person_name,person_mobile,person_email,add_person_date,created_by, created_date, modified_date,user_id,)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  //         const valuesThird = [
  //           office_visit_id,
  //           person_name,
  //           person_mobile,
  //           person_email,
  //           add_person_date,
  //           created_by,
  //           created_date,
  //           modified_date,
  //           user_id,
  //         ];

  //         connection.query(queryThirdd, valuesThird, (err, result) => {
  //           if (err) {
  //             return res.status(400).json({
  //               error:
  //                 "Bad Request: Invalid data provided for office visit remarks c. c",
  //             });
  //           }

  //           res.status(200).json({
  //             message:
  //               "Office visit and remarks and person successfully created.",
  //           });
  //         });
  //       });
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },

  offce_visit_all_create: async (req, res) => {
    try {
      const {
        office_name,
        office_address,
        office_mobile,
        office_email,
        add_office_date,
        created_by,
        created_date,
        modified_date,
        remarks,
        remarks_date,
        person_name,
        person_mobile,
        person_email,
        add_person_date,
        user_id,
      } = req.body;

      // Log the request body for debugging
      console.log("Request Body:", req.body);

      // Validate required fields
      if (!office_name || !office_address || !office_mobile || !office_email) {
        return res.status(400).json({
          error: "Bad Request: Missing required fields.",
        });
      }

      // Default empty fields to null
      const addOfficeDate = add_office_date || null;
      const createdDate =
        created_date || new Date().toISOString().split("T")[0]; // Default to current date
      const remarksDate = remarks_date || null;
      const addPersonDate = add_person_date || null;
      const createdBy = created_by || null;
      const modifiedDate = modified_date || null;

      const queryFirst =
        "INSERT INTO office_visit (office_name, office_address, office_mobile, office_email, add_office_date, created_by, created_date, modified_date, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const valuesFirst = [
        office_name,
        office_address,
        office_mobile,
        office_email,
        addOfficeDate,
        createdBy,
        createdDate,
        modifiedDate,
        user_id,
      ];

      connection.query(queryFirst, valuesFirst, (err, result) => {
        if (err) {
          console.error("Error inserting into office_visit:", err);
          return res.status(400).json({
            error: "Bad Request: Invalid data provided for office visit.",
          });
        }

        const office_visit_id = result.insertId;

        const querySecond =
          "INSERT INTO office_visit_remarks (office_visit_id, remarks, remarks_date, created_by, created_date, modified_date, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const valuesSecond = [
          office_visit_id,
          remarks,
          remarksDate,
          createdBy,
          createdDate,
          modifiedDate,
          user_id,
        ];

        connection.query(querySecond, valuesSecond, (err, result) => {
          if (err) {
            console.error("Error inserting into office_visit_remarks:", err);
            return res.status(400).json({
              error:
                "Bad Request: Invalid data provided for office visit remarks.",
            });
          }

          const queryThird =
            "INSERT INTO office_visit_person (office_visit_id, person_name, person_mobile, person_email, add_person_date, created_by, created_date, modified_date, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
          const valuesThird = [
            office_visit_id,
            person_name,
            person_mobile,
            person_email,
            addPersonDate,
            createdBy,
            createdDate,
            modifiedDate,
            user_id,
          ];

          connection.query(queryThird, valuesThird, (err, result) => {
            if (err) {
              console.error("Error inserting into office_visit_person:", err);
              return res.status(400).json({
                error:
                  "Bad Request: Invalid data provided for office visit person.",
              });
            }

            res.status(200).json({
              message:
                "Office visit, remarks, and person successfully created.",
            });
          });
        });
      });
    } catch (err) {
      console.error("Internal Server Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  office_visit_remarks_list: async (req, res) => {
    try {
      const { id } = req.params;
      const query =
        "SELECT * FROM office_visit_remarks WHERE office_visit_id = ?";
      connection.query(query, [id], (error, result) => {
        if (!error) {
          if (result.length > 0) {
            console.log(result);
            return res.send(result);
          } else {
            console.log("No remarks found for the given office visit ID:", id);
            return res.status(404).json({ message: "No remarks found." });
          }
        } else {
          console.log("Database query error:", error);
          return res.status(500).json({ message: "Database query error." });
        }
      });
    } catch (error) {
      console.log("Internal server error:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  },

  office_visit_remarks_create: async (req, res) => {
    try {
      const { remarks, remarks_date, created_by, office_visit_id, user_id } =
        req.body;
      const data =
        "insert into office_visit_remarks (office_visit_id,remarks,remarks_date,created_by,user_id,) values(?,?,?,?,?)";

      const values = [office_visit_id, remarks, remarks_date, created_by];
      connection.query(data, values, (err, result) => {
        if (err) {
          res.status(500).send("insertion failed..");
        } else {
          res.status(200).send(result);
        }
      });
    } catch (err) {
      console.log(err);
    }
  },

  office_visit_person_create: async (req, res) => {
    try {
      const {
        person_name,
        person_mobile,
        person_email,
        add_person_date,
        created_by,
        office_visit_id,
      } = req.body;
      const data =
        "insert into office_visit_person (office_visit_id,person_name,person_mobile,add_person_date,person_email,created_by) values(?,?,?,?,?,?)";

      const values = [
        office_visit_id,
        person_name,
        person_mobile,
        person_email,
        add_person_date,
        created_by,
      ];
      connection.query(data, values, (err, result) => {
        if (err) {
          res.status(500).send("insertion failed..");
        } else {
          res.status(200).send(result);
        }
      });
    } catch (err) {
      console.log(err);
    }
  },

  office_visit_person: async (req, res) => {
    try {
      const { id } = req.params;
      const query = "SELECT * FROM office_visit_person where office_visit_id=?";
      connection.query(query, [id], (error, result) => {
        if (!error) {
          if (result.length > 0) {
            console.log(result);
            return res.send(result);
          } else {
            console.log("No person found for the given office visit ID:", id);
            return res.status(404).json({ message: "No person found." });
          }
        } else {
          console.log("Database query error:", error);
          return res.status(500).json({ message: "Database query error." });
        }
      });
    } catch (error) {
      console.log("Internal server error:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  },
};

module.exports = office_visit;
