import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';

export const Searchbar = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        input: '',
      }}
      onSubmit={(values, { resetForm }) => {
        const normalizeInput = values.input.toLowerCase().trim();
        // if (
        //   contacts.find(contact => contact.name.toLowerCase() === normalizeName)
        // ) {
        //   return alert(`${values.name} is already in contact list`);
        // }

        onSubmit(normalizeInput);
        resetForm();
      }}
    >
      <header className="searchbar">
        <Form>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
          <Field
            type="text"
            name="input"
            placeholder="Search images and photos"
          />
        </Form>
      </header>
    </Formik>
  );
};

Searchbar.propTypes = {};
