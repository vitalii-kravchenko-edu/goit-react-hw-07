import { useDispatch } from "react-redux";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";

import { addContact } from "/src/redux/contactsSlice.js";

import styles from "./ContactForm.module.css";

const FORM_INITIAL_VALUES = {
  name: "",
  number: "",
};

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const newContact = { ...values, id: nanoid() };
    dispatch(addContact(newContact));

    actions.resetForm();
  };

  const contactFormSchema = Yup.object({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required")
      .trim(),
    number: Yup.string()
      .matches("^\\d{3}-\\d{2}-\\d{2}$", "Number format is: xxx-xx-xx")
      .required("Required")
      .trim(),
  });

  return (
    <Formik
      initialValues={FORM_INITIAL_VALUES}
      validationSchema={contactFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <label>
          <span>Name</span>
          <br />
          <Field type="text" name="name" />
          <ErrorMessage component="p" name="name" />
        </label>
        <label>
          <span>Number</span>
          <br />
          <Field type="tel" name="number" placeholder="xxx-xx-xx" />
          <ErrorMessage component="p" name="number" />
        </label>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
