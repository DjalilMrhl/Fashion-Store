import React, { useEffect, useState } from "react";
import "./Checkout.scss";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { Button, Step, StepLabel, Stepper, TextField } from "@mui/material";
import { Billing, Shipping } from "../../Components";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51MtWkhBx5TEHq8kdA9k3PEeq0HYl7R0FovVIPQisKQkkolftDlWp8LijISiLesoWTC9s0k5yDN90UEasbf0bU2cp000XV2XJYL"
);

function Checkout() {
  const [step, setStep] = useState(0);
  const cart = useSelector((state) => state.cart);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return (
    <>
      <section className="checkout" id="checkout">
        <div className="checkout--container">
          <Stepper activeStep={step}>
            <Step>
              <StepLabel>Shipping info</StepLabel>
            </Step>
            <Step>
              <StepLabel>Contact info</StepLabel>
            </Step>
          </Stepper>
          <Formik
            onSubmit={(values, actions) => {
              if (step === 0) {
                setStep(1);
              }
              console.log(step);
              console.log(values);
              if (step === 1) {
                const makePayment = async (values) => {
                  const stripe = await stripePromise;
                  const requestBody = {
                    userName: [values.firstName, values.lastName].join(" "),
                    email: values.email,
                    products: cart.cartItems.map((item) => ({
                      id: item.id,
                      cartQuantity: item.cartQuantity,
                    })),
                  };
                  console.log(requestBody);
                  const res = await fetch("https://strapi-4yf5.onrender.com/api/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json",
                    Authorization: "Bearer "+token
                    },
                    body: JSON.stringify(requestBody),
                  });
                  console.log(res);
                  const data = await res.json();
                  console.log(
                    "🚀 ~ file: Checkout.js:60 ~ makePayment ~ data:",
                    data
                  );
                  stripe.redirectToCheckout({
                    sessionId: data.id,
                  });
                };
                makePayment(values);
              }
            }}
            initialValues={initialValues}
            validationSchema={checkoutSchema[step]}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleSubmit,
              handleChange,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                {step === 0 ? (
                  <>
                    <Billing
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                    />
                    <label htmlFor="isSameAddress">
                      <input
                        type="checkbox"
                        name="isSameAddress"
                        checked={values.isSameAddress}
                        onChange={() => {
                            setFieldValue("isSameAddress", !values.isSameAddress)
                            setFieldValue("shippingfirstName", values.billingfirstName)
                            setFieldValue("shippinglastName", values.billinglastName)
                            setFieldValue("shippingcountry", values.billingcountry)
                            setFieldValue("shippingstreet1", values.billingstreet1)
                            setFieldValue("shippingstreet2", values.billingstreet2)
                            setFieldValue("shippingcity", values.billingcity)
                            setFieldValue("shippingstate", values.billingstate)
                            setFieldValue("shippingzipCode", values.billingzipCode)
                        }}
                        id="isSameAddress"
                      />
                      same for shipping
                    </label>
                    {!values?.isSameAddress && (
                      <Shipping
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                      />
                    )}
                  </>
                ) : (
                  <div className="contact">
                    <TextField
                      type="email"
                      label="email"
                      name="email"
                      value={values?.email}
                      error={touched?.email && Boolean(errors?.email)}
                      helperText={touched?.email && errors?.email}
                      placeholder="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <TextField
                      type="text"
                      label="phone"
                      name="phoneNumber"
                      value={values?.phoneNumber}
                      error={
                        touched?.phoneNumber && Boolean(errors?.phoneNumber)
                      }
                      helperText={touched?.phoneNumber && errors?.phoneNumber}
                      placeholder="phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                )}
                {step === 0 ? (
                  <Button type="submit">Next</Button>
                ) : (
                  <div className="btns">
                    <Button type="button" onClick={() => setStep(0)}>
                      Back
                    </Button>
                    <Button type="submit">
                      {step === 0 ? "Next" : "Place order"}
                    </Button>
                  </div>
                )}
              </form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
}

const initialValues = {
  billingfirstName: "",
  billinglastName: "",
  billingcountry: "",
  billingstreet1: "",
  billingstreet2: "",
  billingcity: "",
  billingstate: "",
  billingzipCode: "",
  isSameAddress: false,
  shippingfirstName: "",
  shippinglastName: "",
  shippingcountry: "",
  shippingstreet1: "",
  shippingstreet2: "",
  shippingcity: "",
  shippingstate: "",
  shippingzipCode: "",
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
      billingfirstName: yup.string().required("required"),
      billinglastName: yup.string().required("required"),
      billingcountry: yup.string().required("required"),
      billingstreet1: yup.string().required("required"),
      billingstreet2: yup.string(),
      billingcity: yup.string().required("required"),
      billingstate: yup.string().required("required"),
      billingzipCode: yup.string().required("required"),
      isSameAddress: yup.boolean(),
      shippingfirstName: yup.string().when("isSameAddress",(isSameAddress,field)=>
        !isSameAddress? field: field.required("required")
      ),
      shippinglastName: yup.string().when("isSameAddress",(isSameAddress,field)=>
        !isSameAddress? field: field.required("required")
      ),
      shippingcountry: yup.string().when("isSameAddress",(isSameAddress,field)=>
        !isSameAddress? field: field.required("required")
      ),
      shippingstreet1: yup.string().when("isSameAddress",(isSameAddress,field)=>
        !isSameAddress? field: field.required("required")
      ),
      shippingstreet2: yup.string(),
      shippingcity: yup.string().when("isSameAddress",(isSameAddress,field)=>
        !isSameAddress? field: field.required("required")
      ),
      shippingstate: yup.string().when("isSameAddress",(isSameAddress,field)=>
        !isSameAddress? field: field.required("required")
      ),
      shippingzipCode: yup.string().when("isSameAddress",(isSameAddress,field)=>
        !isSameAddress? field: field.required("required")
      ),
    }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

export default Checkout;
