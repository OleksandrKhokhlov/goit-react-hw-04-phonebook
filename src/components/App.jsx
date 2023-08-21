import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm ';
import { Contacts } from './Contacts/ContactList ';

const LS_KEY = 'save_contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const saveContacts = localStorage.getItem(LS_KEY);
    if (saveContacts !== null) {
      this.setState({
      contacts: JSON.parse(saveContacts),
    }) 
  }
}

  componentDidUpdate(prevProps, prevState) {
    const { contacts: prevContacts } = prevState;
    const { contacts: nextContacts } = this.state;
    if (prevContacts !== nextContacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  addContact = newContact => {
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  onDel = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contactId !== contact.id
        ),
      };
    });
  };

  changeNameFilter = newName => {
    this.setState({ filter: `${newName}` });
  };

  getVisibleContactsItems = () => {
    const { contacts, filter } = this.state;
    const lowerCaseName = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(lowerCaseName)
    );
  };

  render() {
    const visibleQuizItems = this.getVisibleContactsItems();
    return (
      <div>
        <ContactForm contacts={this.state.contacts} onAdd={this.addContact} />
        <Contacts
          contacts={visibleQuizItems}
          nameFilter={this.changeNameFilter}
          onDel={this.onDel}
        />
      </div>
    );
  }
}
