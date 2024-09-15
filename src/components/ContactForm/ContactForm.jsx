import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import css from "./ContactForm.module.css";
import * as Yup from "yup";

const ContactForm = () => {
  const dispatch = useDispatch();

  const phoneRegExp =
    /^(\+?[1-9]{1,4}[-\s]?|[0-9]{2,4}[-\s]?)?[0-9]{3,4}[-\s]?[0-9]{3,4}$/;
  const AddContactsSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm(); //
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      onSubmit={handleSubmit}
      validationSchema={AddContactsSchema}
    >
      <Form className={css.form}>
        <label className={css.label}>
          <span>Name</span>
          <Field className={css.inputForm} type="text" name="name" />
          <ErrorMessage name="name" component="div" className={css.error} />
        </label>
        <label className={css.label}>
          <span>Number</span>
          <Field className={css.inputForm} type="tel" name="number" />
          <ErrorMessage name="number" component="div" className={css.error} />
        </label>
        <button className={css.ContactFormBtn} type="submit">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
