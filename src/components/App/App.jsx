import { useSelector, useDispatch } from "react-redux";
import {
  addContact,
  deleteContact,
  selectContacts,
} from "../../redux/contactsSlice";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filterValue = useSelector(selectNameFilter);

  const handleAddContact = ({ name, number }) => {
    dispatch(addContact({ name, number }));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (event) => {
    dispatch(changeFilter(event.target.value));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm addContact={handleAddContact} />
      <SearchBox
        filterValue={filterValue}
        handleContactSearch={handleFilterChange}
      />
      <ContactList
        contacts={filteredContacts}
        deleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
