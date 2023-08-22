import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { AddButton, EntryField } from './ContactForm.styled ';

const nameRegExp =
  /^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const phoneRegExp =
  /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/;

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Required')
    .matches(
      nameRegExp,
      ` Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan`
    ),
  number: Yup.string().matches(
    phoneRegExp,
    'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
  ),
});

export const ContactForm = ({ onAdd, contacts }) => {
  
  const handlerSubmit = (values, actions) => {
    const overlap = contacts.map(contact => contact.name).includes(values.name);
    overlap
      ? alert(`${values.name} is already in contacts`)
      : onAdd({ ...values, id: nanoid() });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={schema}
      onSubmit={handlerSubmit}
    >
      <Form>
        <h1>Phonebook</h1>
        <EntryField htmlFor="name">
          Name
          <Field id="name" type="text" name="name" />
        </EntryField>
        <ErrorMessage name="name" />
        <EntryField htmlFor="number">
          Number
          <Field id="number" type="tel" name="number" />
        </EntryField>
        <ErrorMessage name="number" />
        <AddButton type="submit">Add contact</AddButton>
      </Form>
    </Formik>
  );
};
