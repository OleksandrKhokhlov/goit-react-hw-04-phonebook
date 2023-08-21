import { Filter } from '../Filter/Filter';
import {
  ButtonDelete,
  ContactsItem,
  ContactsList,
} from './ContactList .styled';

export const Contacts = ({ contacts, nameFilter, onDel }) => {
  return (
    <ContactsList>
      <Filter onChange={nameFilter} />
      {contacts.map(({ id, name, number }) => (
        <ContactsItem key={id}>
          {name}: {number}
          <ButtonDelete type="button" onClick={() => onDel(id)}>
            Delete
          </ButtonDelete>
        </ContactsItem>
      ))}
    </ContactsList>
  );
};
