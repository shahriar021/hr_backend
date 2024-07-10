const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const connection = require('./config/database');
const users_model = require('../model/Admin/user_model/user_model');
const mobile_allowance_model = require('../model/Admin/mobile_allowance_model/mobile_allowance_model');
const mobile_allowance = require('../model/Admin/mobile_allowance_model/mobile_allowance_model');
const transport_allowance = require('../model/Admin/transport_allowance_model/transport_allowance_model');
const transport_allowance_model = require('../model/Admin/transport_allowance_model/transport_allowance_model');
const office_visit = require('../model/Admin/office_visit_model/office_visit_model');
const geo_location = require('../model/Admin/geo_location_model/geo_location_model');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running for Shahriar....');
});

app.get('/all_users', users_model.usersListAll);

app.post('/login_user', users_model.loginUserEmailPassword);

app.post('/user_token/:id', users_model.userToken);

// ---------------------------------------end of users --------------------------------

app.get(
  '/mobile_allowance/mobile_allowance_list',
  mobile_allowance.mobile_allowance_list,
);

app.post(
  '/mobile_allowance/mobile_allowance_create',
  mobile_allowance.mobile_allowance_create,
);

app.post(
  '/mobile_allowance/mobile_allowance_delete/:id',
  mobile_allowance.mobile_allowance_delete,
);

// -----------------------------------------end of mobile_allowance--------------------------------

app.get(
  '/transport_allowance/transport_allowance_list',
  transport_allowance.transport_allowance_list,
);

app.post(
  '/transport_allowance/transport_allowance_create',
  transport_allowance.transport_allowance_create,
);

app.post(
  '/transport_allowance/transport_allowance_delete/:id',
  transport_allowance.transport_allowance_delete,
);

app.post(
  '/transport_allowance/transport_allowance_edit/:id',
  transport_allowance.transport_allowance_edit,
);

// -----------------------------end of transport allowance-------------------

app.get('/office_visit/office_visit_list', office_visit.office_visit_list);

app.post(
  '/office_visit/office_visit_delete/:id',
  office_visit.office_visit_delete,
);

app.post(
  '/office_visit/offce_visit_all_create',
  office_visit.offce_visit_all_create,
);

app.post(
  '/office_visit/office_visit_remarks_create',
  office_visit.office_visit_remarks_create,
);

app.get(
  '/office_visit/office_visit_remarks_list/:id',
  office_visit.office_visit_remarks_list,
);

app.get(
  '/office_visit/office_visit_person/:id',
  office_visit.office_visit_person,
);

app.post(
  '/office_visit/office_visit_person_create',
  office_visit.office_visit_person_create,
);

// -----------------------------------end of office visit ----------------------------

app.post('/geo_location/geo_location_create', geo_location.geo_location_create);

app.get('/geo_location/geo_location_list', geo_location.geo_location_list);

app.get(
  '/geo_location/geo_location_marker_list/:id',
  geo_location.geo_location_marker_list,
);

app.get(
  '/geo_location/geo_location_marker_live_list/:id',
  geo_location.geo_location_marker_live_list,
);

app.post(
  '/geo_location/employee_location_search',
  geo_location.employee_location_search,
);

// -------------------------------------end of geo location -----------------------------

const PORT = 5000;
app.listen(PORT, () => {
  console.log('Server is running at port ' + PORT);
});

module.exports = connection;
