import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import css from "./ContactForm.module.css";

export default function ContactForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    // dispatch(addContact(values.name, values.number));
    dispatch(addContact({ name: values.name, number: values.number }));
    actions.resetForm();
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must not exceed 50 characters"),
    number: Yup.string()
      .required("Required")
      .matches(/^[0-9\-]+$/, "Phone number can only contain digits and dashes")
      .min(3, "Phone number must be at least 3 characters")
      .max(15, "Phone number must not exceed 15 characters")
      .test(
        "no-only-dashes",
        "Phone number cannot contain only dashes",
        (value) => value && value.replace(/-/g, "").length > 0
      ),
  });

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <div className={css.container}>
            <label className={css.label} htmlFor="name">
              Name
            </label>
            <Field
              className={css.input}
              type="text"
              name="name"
              id="name"
              placeholder=""
            />
            {touched.name && errors.name && (
              <span className={css.error}>{errors.name}</span>
            )}
          </div>
          <div className={css.container}>
            <label className={css.label} htmlFor="number">
              Number
            </label>
            <Field
              className={css.input}
              type="text"
              name="number"
              id="number"
              placeholder=""
            />
            {touched.number && errors.number && (
              <span className={css.error}>{errors.number}</span>
            )}
          </div>
          <button type="submit" className={css.submitButton}>
            Add Contact
          </button>
        </Form>
      )}
    </Formik>
  );
}
