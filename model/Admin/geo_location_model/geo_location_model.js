const {default: axios} = require('axios');
const connection = require('../../../connection/config/database');

const geo_location = {
  geo_location_create: async (req, res) => {
    try {
      const {user_id, latitude, longitude, created_date} = req.body;

      const query =
        'insert into geo_location( user_id, latitude, longitude, created_date ) values(?,?,?,?)';
      const values = [user_id, latitude, longitude, created_date];

      connection.query(query, values, (err, result) => {
        if (err) {
          res.status(500).json({message: 'geo location creation failed'});
        } else {
          res
            .status(200)
            .json({message: 'geo location created successfully', result});
        }
      });
    } catch (err) {
      console.log(err);
    }
  },

  // geo_location_list: async (req, res) => {
  //   try {
  //     const data =
  //       'select full_name,users.id,designation.designation_name from users left join teacher_admission on teacher_admission.user_id=users.id left join designation on designation.id=teacher_admission.designation_id where users.role_name=8';
  //     connection.query(data, (result, err) => {
  //       if (err) {
  //         res.status(500).json({message: 'geo location list failed'});
  //       } else {
  //         res.status(200).send(result);
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

  geo_location_list: async (req, res) => {
    try {
      const data = `
        SELECT full_name, users.id, designation.designation_name 
        FROM users 
        LEFT JOIN teacher_admission ON teacher_admission.user_id = users.id 
        LEFT JOIN designation ON designation.id = teacher_admission.designation_id 
        WHERE users.role_name = 8
      `;
      connection.query(data, (err, result) => {
        if (err) {
          res.status(500).json({message: 'Geo location list failed'});
        } else {
          res.status(200).send(result);
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'An unexpected error occurred'});
    }
  },

  geo_location_marker_list: async (req, res) => {
    try {
      const id = req.params.id;
      const query = 'SELECT * FROM geo_location WHERE user_id = ?';
      connection.query(query, [id], (err, result) => {
        console.log(id);
        if (err) {
          return res.status(500).json({message: 'Database query error.'});
        }
        if (result.length === 0) {
          return res.status(404).json({message: 'No lat long id found.'});
        }
        return res.json(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({message: 'Server error.'});
    }
  },

  geo_location_marker_live_list: async (req, res) => {
    try {
      const {id} = req.params;
      const query = `
        SELECT * 
        FROM geo_location 
        WHERE user_id = ? AND DATE(created_date) = CURDATE()
      `;
      connection.query(query, [id], (err, result) => {
        console.log(id);
        if (err) {
          return res.status(500).json({message: 'Database query error.'});
        }
        if (result.length === 0) {
          return res.status(404).json({message: 'No lat long id found.'});
        }
        return res.json(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({message: 'Server error.'});
    }
  },

  employee_location_search: async (req, res) => {
    const {id, date2, date} = req.body;

    try {
      // Parse fromDate and toDate as Date objects
      const parsedFromDate = new Date(date);
      const parsedToDate = new Date(date2);

      // Make sure fromDate and toDate are valid Date objects
      if (isNaN(parsedFromDate.getTime()) || isNaN(parsedToDate.getTime())) {
        throw new Error('Invalid date format');
      }

      // Set the time to the end of the day for the parsedToDate to ensure inclusivity
      parsedToDate.setHours(23, 59, 59, 999);

      // Convert fromDate and toDate to ISO format
      const isoFromDate = parsedFromDate.toISOString();
      const isoToDate = parsedToDate.toISOString();

      // Make API request to fetch data based on selectedEmployeeId, fromDate, toDate
      const response = await axios.get(
        `http://192.168.0.113:5000/geo_location/geo_location_marker_list/${id}`,
        {
          params: {
            fromDate: isoFromDate,
            toDate: isoToDate,
          },
        },
      );

      // Extract data from response
      const data = response.data;
      console.log(data);

      // Filter data based on date range
      const filteredData = data.filter(item => {
        const itemDate = new Date(item.created_date);
        return itemDate >= parsedFromDate && itemDate <= parsedToDate;
      });
      console.log(filteredData);

      // Return filtered data as JSON response
      res.json({results: filteredData});
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({error: 'An error occurred during search.'});
    }
  },
};

module.exports = geo_location;
