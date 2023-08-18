import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface Phone {
  number: string;
  __typename?: string;
}

export interface ContactType {
  id?: number;
  first_name: string;
  last_name: string;
  phones: Phone[];
}

interface ContactContextType {
  contacts: ContactType[];
  favourites: ContactType[];
  isFavorited: (contactId: number | undefined) => boolean;
  addContact: (newContact: ContactType) => void;
  editContact: (editedContact: ContactType) => void;
  deleteContact: (contactId: number) => void;
  addFavourite: (newFavourite: ContactType) => void;
  removeFavourite: (contactId: number, newContact: ContactType) => void;
}
const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const useContactContext = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContactContext must be used within a ContactProvider");
  }
  return context;
};

interface ContactProviderProps {
  children: ReactNode;
}

export const ContactProvider = ({ children }: ContactProviderProps) => {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [favourites, setFavourites] = useState<ContactType[]>(() => {
    const storedFavourites = localStorage.getItem("favourites");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  const addContact = (newContact: ContactType) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const isFavorited = (contactId: number | undefined) => {
    if (contactId === undefined) {
      return false;
    }
    return favourites.some((fav) => fav.id === contactId);
  };

  const addFavourite = (newFavourite: ContactType) => {
    setFavourites((prevFavourites) => [...prevFavourites, newFavourite]);
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== newFavourite.id)
    );
  };

  const removeFavourite = (contactId: number, newContact: ContactType) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
    setFavourites((prevFavourites) =>
      prevFavourites.filter((contact) => contact.id !== contactId)
    );
  };

  const editContact = (editedContact: ContactType) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === editedContact.id ? editedContact : contact
      )
    );
  };

  const deleteContact = (contactId: number) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
    if (favourites.some((fav) => fav.id === contactId)) {
      setFavourites((prevFavourites) =>
        prevFavourites.filter((contact) => contact.id !== contactId)
      );
    }
  };

  const contextValue: ContactContextType = {
    contacts,
    favourites,
    isFavorited,
    addContact,
    editContact,
    deleteContact,
    addFavourite,
    removeFavourite,
  };

  useEffect(() => {
    const storedFavourites = localStorage.getItem("favourites");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  return (
    <ContactContext.Provider value={contextValue}>
      {children}
    </ContactContext.Provider>
  );
};
