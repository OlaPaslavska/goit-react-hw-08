import css from "./ContactForm.module.css";
import { nanoid } from "nanoid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";

const ContactForm = () => {
  const dispatch = useDispatch();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const AddContactsSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .required("Required")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(3, "Too Short!")
      .max(50, "Too Long!"),
  });

  const INITIAL_VALUES = {
    name: "",
    number: "",
  };

  const handleSubmit = (values, actions) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    dispatch(addContact(newContact));

    actions.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validationSchema={AddContactsSchema}
        validateOnBlur={true}
        validateOnChange={true}
      >
        <Form className={css.form}>
          <label className={css.label}>
            <span>Name</span>
            <Field
              className={css.inputForm}
              type="text"
              name="name"
              placeholder=""
            />
            <ErrorMessage name="name" component="div" className={css.error} />
          </label>
          <label className={css.label}>
            <span>Number</span>
            <Field
              className={css.inputForm}
              type="tel"
              name="number"
              placeholder=""
            />
            <ErrorMessage name="number" component="div" className={css.error} />
          </label>
          <button className={css.ContactFormBtn} type="submit">
            Add Contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
