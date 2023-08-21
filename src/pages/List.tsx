import React, { useState, useEffect } from "react";
import Contact from "../components/Contact";
import SearchBar from "../components/SearchBar";
import useContacts from "../hooks/useContacts";
import { css } from "@emotion/react";
import { setIsLoading } from "../redux/slices/commonSlice";
import { useDispatch } from "react-redux";
import { useContactContext, ContactType } from "../contexts/ContactContext";
import Pagination from "../components/Pagination";

const List: React.FC = () => {
  const { addContact, contacts, favourites } = useContactContext();
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { loading, error, data } = useContacts(searchText);

  useEffect(() => {
    if (data?.contact && contacts.length === 0) {
      data.contact.forEach((contact: ContactType) => {
        addContact({
          id: contact.id,
          first_name: contact.first_name,
          last_name: contact.last_name,
          phones: contact.phones,
        });
      });
    }
    if (loading || error) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [loading]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      !favourites.some((fav) => fav.id === contact.id) &&
      (searchText === "" ||
        contact.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
        contact.last_name.toLowerCase().includes(searchText.toLowerCase()))
  );

  const startIndex = (currentPage - 1) * pageSize;
  const displayedContacts = filteredContacts.slice(
    startIndex,
    startIndex + pageSize
  );

  const totalFilteredContacts = filteredContacts.length;

  return (
    <div
      css={{
        width: "100%",
      }}
    >
      <SearchBar onSearch={setSearchText} />
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalFilteredContacts}
        onPageChange={handlePageChange}
      />
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1
          css={css`
            font-size: 1rem;
            font-weight: bold;
          `}
        >
          Favourites
        </h1>
        {favourites.map((contact) => (
          <Contact
            key={contact.id!}
            id={contact.id!}
            firstName={contact.first_name}
            lastName={contact.last_name}
            phoneNumber={contact.phones[0]?.number}
          />
        ))}
        <h1
          css={css`
            font-size: 1rem;
            font-weight: bold;
          `}
        >
          Contacts
        </h1>
        {displayedContacts?.map((contact) => (
          <Contact
            key={contact.id!}
            id={contact.id!}
            firstName={contact.first_name}
            lastName={contact.last_name}
            phoneNumber={contact.phones[0]?.number}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
