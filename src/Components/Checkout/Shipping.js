import { TextField } from '@mui/material';
import { getIn } from 'formik';
import React from 'react'

function Shipping({values, touched, errors, handleChange, handleBlur}) {

  const formattedName = (field) => `shipping${field}`;

  const formattedError = (field) =>
    Boolean(
        getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    );

  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

  return (
    <><h1>Shipping info</h1>
    <div className="inputs">
          <TextField
              type="text"
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.shippingfirstName}
              name={formattedName("firstName")}
              error={formattedError("firstName")}
              helperText={formattedHelper("firstName")} />
          <TextField
              type="text"
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.shippinglastName}
              name={formattedName("lastName")}
              error={formattedError("lastName")}
              helperText={formattedHelper("lastName")} />
          <TextField
              type="text"
              label="Country"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.shippingcountry}
              name={formattedName("country")}
              error={formattedError("country")}
              helperText={formattedHelper("country")}
            />
          <TextField
              type="text"
              label="Street Address"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.shippingstreet1}
              name={formattedName("street1")}
              error={formattedError("street1")}
              helperText={formattedHelper("street1")} />
          <TextField
              type="text"
              label="Street Address 2 (optional)"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.shippingstreet2}
              name={formattedName("street2")}
              error={formattedError("street2")}
              helperText={formattedHelper("street2")} />
          <TextField
              type="text"
              label="City"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.shippingcity}
              name={formattedName("city")}
              error={formattedError("city")}
              helperText={formattedHelper("city")} />
          <TextField
              type="text"
              label="State"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.shippingstate}
              name={formattedName("state")}
              error={formattedError("state")}
              helperText={formattedHelper("state")} />
          <TextField
              type="text"
              label="Zip Code"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.shippingzipCode}
              name={formattedName("zipCode")}
              error={formattedError("zipCode")}
              helperText={formattedHelper("zipCode")} />
      </div></>
  )
}

export default Shipping