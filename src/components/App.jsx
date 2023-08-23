import { useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm ';
import { Contacts } from './Contacts/ContactList ';
import { useState } from 'react';

const LS_KEY = 'save_contacts';

const getSaveContacts = () => {
  const saveContacts = localStorage.getItem(LS_KEY);
  if (saveContacts !== null) {
    return JSON.parse(saveContacts);
  }
  return [];
};

export const App = () => {
  const [contacts, setContacts] = useState(getSaveContacts);
  const [filters, setFilters] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    if (contacts.length === 0) {
      localStorage.removeItem(LS_KEY);
    }
  }, [contacts]);

  const addContact = newContact => {
    setContacts(prevState => [...prevState, newContact]);
  };

  const onDel = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contactId !== contact.id)
    );
  };

  const getVisibleContactsItems = () => {
    const lowerCaseName = filters.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(lowerCaseName)
    );
  };

  const visibleQuizItems = getVisibleContactsItems();

  return (
    <div>
      <ContactForm contacts={contacts} onAdd={addContact} />
      <Contacts
        contacts={visibleQuizItems}
        nameFilter={setFilters}
        onDel={onDel}
      />
    </div>
  );
};
