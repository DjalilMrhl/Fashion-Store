import { TextField } from '@mui/material';
import { getIn } from 'formik';
import React from 'react'

function Billing({values, touched, errors, handleChange, handleBlur}) {

  const formattedName = (field) => `billing${field}`;

  const formattedError = (field) =>
    Boolean(
      getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    );

  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

  return (
    <><h1>Billing info</h1>
    <div className="inputs">
          <TextField
              type="text"
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.billingfirstName}
              name={formattedName("firstName")}
              error={formattedError("firstName")}
              helperText={formattedHelper("firstName")} />
          <TextField
              type="text"
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.billinglastName}
              name={formattedName("lastName")}
              error={formattedError("lastName")}
              helperText={formattedHelper("lastName")} />
          <TextField
              type="text"
              label="Country"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.billingcountry}
              name={formattedName("country")}
              error={formattedError("country")}
              helperText={formattedHelper("country")}
              />
          <TextField
              type="text"
              label="Street Address"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.billingstreet1}
              name={formattedName("street1")}
              error={formattedError("street1")}
              helperText={formattedHelper("street1")} />
          <TextField
              type="text"
              label="Street Address 2 (optional)"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.billingstreet2}
              name={formattedName("street2")}
              error={formattedError("street2")}
              helperText={formattedHelper("street2")} />
          <TextField
              type="text"
              label="City"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.billingcity}
              name={formattedName("city")}
              error={formattedError("city")}
              helperText={formattedHelper("city")} />
          <TextField
              type="text"
              label="State"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.billingstate}
              name={formattedName("state")}
              error={formattedError("state")}
              helperText={formattedHelper("state")} />
          <TextField
              type="text"
              label="Zip Code"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.billingzipCode}
              name={formattedName("zipCode")}
              error={formattedError("zipCode")}
              helperText={formattedHelper("zipCode")} />
      </div></>
  )
}

export default Billing