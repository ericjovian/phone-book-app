import React from "react";
import Contact from "./Contact";
import SearchBar from "../components/SearchBar";
import useContacts from "../hooks/useContacts";

const List: React.FC = () => {
  const { loading, error, data } = useContacts();

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <SearchBar />
      {loading && <p>Loading...</p>}
      {error && <p>Error :(</p>}
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          alignItems: "center",
          width: "100%",
        }}
      >
        {data &&
          data.contact.map((contact: any) => (
            <Contact
              key={contact.id}
              firstName={contact.first_name}
              lastName={contact.last_name}
              phoneNumber={contact.phones[0]?.number || ""}
            />
          ))}
      </div>
    </div>
  );
};

export default List;