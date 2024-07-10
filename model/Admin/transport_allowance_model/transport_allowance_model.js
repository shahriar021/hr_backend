const connection = require('../../../connection/config/database');

const transport_allowance = {
  transport_allowance_list: async (req, res) => {
    try {
      const data = 'select * from transport_allowance';
      connection.query(data, (err, result) => {
        if (err) {
          res.json(err);
        }
        res.status(200).send(result);
      });
    } catch (err) {
      console.log(err, 'error');
    }
  },

  transport_allowance_create: async (req, res) => {
    try {
      const {
        travel_from,
        travel_from_time,
        travel_to,
        travel_to_time,
        vehicle_name,
        km_travel,
        amount,
        created_by,
        created_date,
        modified_date,
      } = req.body;
      const data =
        'insert into transport_allowance(travel_from,travel_from_time,travel_to,travel_to_time,vehicle_name,km_travel,amount,created_by,created_date,modified_date) values(?,?,?,?,?,?,?,?,?,?) ';
      const values = [
        travel_from,
        travel_from_time,
        travel_to,
        travel_to_time,
        vehicle_name,
        km_travel,
        amount,
        created_by,
        created_date,
        modified_date,
      ];
      connection.query(data, values, (err, result) => {
        if (err) {
          res.json(err);
        }
        res.status(200).send(result);
      });
    } catch (err) {
      console.log(err);
    }
  },

  transport_allowance_delete: async (req, res) => {
    try {
      const {id} = req.params;
      const query = 'DELETE FROM transport_allowance WHERE id = ?';
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

  transport_allowance_edit: async (req, res) => {
    try {
      const {id} = req.params;
      console.log(id);
      const data =
        'update transport_allowance set travel_from=?,travel_from_time=?,travel_to=?,travel_to_time=?,vehicle_name=?,km_travel=?,amount=?,modified_by=? where id=?';
      const value = [
        req.body.travel_from,
        req.body.travel_from_time,
        req.body.travel_to,
        req.body.travel_to_time,
        req.body.vehicle_name,
        req.body.km_travel,
        req.body.amount,
        req.body.modified_by,
        id,
      ];

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

module.exports = transport_allowance;
