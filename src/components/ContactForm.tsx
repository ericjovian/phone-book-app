import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import useDeleteContact from "../hooks/useDeleteContact";
import useContacts from "../hooks/useContacts";
import { ContactType, useContactContext } from "../contexts/ContactContext";
import BackButton from "./BackButton";
import useEditContact from "../hooks/useEditContact";
import useAddContact from "../hooks/useAddContact";

export interface Phone {
  number: string;
  originalNumber?: string;
  __typename?: string;
}

interface ContactFormProps {
  isNewContact?: boolean;
  initialData: FormProps;
}

interface FormProps {
  id?: number;
  firstName?: string;
  lastName?: string;
  phones?: Phone[];
}

const ContactForm: React.FC<ContactFormProps> = ({
  isNewContact = false,
  initialData,
}) => {
  const delContact = useDeleteContact();
  const addContact = useAddContact();
  const { data: contactData } = useContacts("");
  const {
    deleteContact,
    addFavourite,
    removeFavourite,
    isFavorited,
    editContact,
    addContact: addContactToContext,
  } = useContactContext();
  const navigate = useNavigate();
  const { edit, addNum, editNum } = useEditContact();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [formState, setFormState] = useState<FormProps>({
    firstName: "",
    lastName: "",
    ...initialData,
  });

  const labelStyling = css`
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 0 auto;
  `;

  const inputStyling = css`
    width: 300px;
    height: 30px;
    margin: 0 auto;
    gap: 10px;
    border: 1px solid black;
    margin-bottom: 10px;
  `;

  const favButtonStyling = {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "1rem",

    "&:hover": {
      scale: "1.1",
    },
  };

  const deleteButtonStyling = {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "1rem",
    color: "red",

    "&:hover": {
      scale: "1.1",
    },
  };

  const buttonsStyling = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 300px;
    margin: 0 auto;
  `;

  const isDuplicateName = (
    firstName: string,
    lastName: string,
    contacts: ContactType[] | undefined,
    editedContactId?: number
  ) => {
    return contacts?.some(
      (contact) =>
        (editedContactId && contact.id === editedContactId) ||
        (contact.first_name === firstName && contact.last_name === lastName)
    );
  };

  const isValidName = (name: string) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "firstName" || name === "lastName") {
      if (value.trim() !== "" && !isValidName(value)) {
        setDisabled(true);
        return;
      }
    }
    setDisabled(false);
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      phones: prevState.phones!.map((phone, index) =>
        index === focusedIndex
          ? {
              ...phone,
              number: value,
              originalNumber: phone.originalNumber || value,
            }
          : phone
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isNewContact) {
      if (
        contactData?.contacts &&
        isDuplicateName(
          formState.firstName!,
          formState.lastName!,
          contactData.contacts
        )
      ) {
        alert("Contact already exists!");
        return;
      } else {
        const data = await addContact({
          first_name: formState.firstName!,
          last_name: formState.lastName!,
          phones: formState.phones!,
        });
        addContactToContext(data);
        navigate("/");
        return;
      }
    }

    const { id, firstName, lastName, phones } = formState;

    if (
      firstName !== initialData.firstName ||
      lastName !== initialData.lastName
    ) {
      if (
        contactData?.contacts &&
        isDuplicateName(
          firstName!,
          lastName!,
          contactData.contacts,
          formState.id
        )
      ) {
        alert("Contact already exists!");
        return;
      }
    }

    edit(id!, { first_name: firstName!, last_name: lastName! });
    editContact({
      id: id!,
      first_name: firstName!,
      last_name: lastName!,
      phones: phones!,
    });

    if (phones) {
      phones.forEach(async (phone) => {
        if (phone.number) {
          if (phone.__typename === "Phone") {
            console.log(
              "Comparing numbers:",
              phone.number,
              phone.originalNumber
            );
            if (phone.originalNumber !== phone.number) {
              console.log("Calling editNum for:", phone.number);
              await editNum(id!, phone.originalNumber!, phone.number);
            } else {
              console.log("Not calling editNum for:", phone.number);
            }
          } else if (phone.number && phone.number !== "") {
            const existingPhone = formState.phones!.find(
              (p) => p.number === phone.number
            );
            if (!existingPhone || !existingPhone.originalNumber) {
              addNum(id!, phone.number);
            }
          }
        }
      });
    }

    editContact({
      id: id!,
      first_name: firstName!,
      last_name: lastName!,
      phones: phones!,
    });
    navigate("/");
  };

  const handleDelete = () => {
    delContact(formState.id!);
    deleteContact(formState.id!);
    navigate("/");
  };

  const handleFavorite = () => {
    addFavourite({
      id: formState.id!,
      first_name: formState.firstName!,
      last_name: formState.lastName!,
      phones: formState.phones!,
    });
    navigate("/");
  };

  const handleRemoveFromFavorites = () => {
    if (formState.id) {
      removeFavourite(formState.id, {
        id: formState.id,
        first_name: formState.firstName!,
        last_name: formState.lastName!,
        phones: formState.phones!,
      });
    }
    navigate("/");
  };

  useEffect(() => {
    setFormState(initialData);
  }, [initialData]);

  return (
    <div>
      <h1>{isNewContact ? "Create New Contact" : "Edit Contact"}</h1>
      <div css={{ display: "flex", justifyContent: "space-between" }}>
        <div css={buttonsStyling}>
          <BackButton />
          {isNewContact ? null : (
            <>
              {isFavorited(formState.id) ? (
                <button
                  type="button"
                  onClick={handleRemoveFromFavorites}
                  css={favButtonStyling}
                >
                  &#9733; Remove from Favorites
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFavorite}
                  css={favButtonStyling}
                >
                  &#9733; Add to Favorites
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <label css={labelStyling}>
          First Name:
          <input
            type="text"
            name="firstName"
            css={inputStyling}
            value={formState.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label css={labelStyling}>
          Last Name:
          <input
            type="text"
            name="lastName"
            css={inputStyling}
            value={formState.lastName}
            onChange={handleInputChange}
          />
        </label>
        {formState.phones!.map((phone, index) => (
          <label css={labelStyling} key={index}>
            Phone {index + 1}:
            <input
              type="text"
              name={`phones_${index}`}
              css={inputStyling}
              value={phone.number}
              onChange={(e) => {
                const newPhones = formState.phones!.map((p, i) =>
                  i === index ? { ...p, number: e.target.value } : p
                );
                setFormState((prevState) => ({
                  ...prevState,
                  phones: newPhones,
                }));
              }}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              autoFocus={index === focusedIndex}
            />
          </label>
        ))}
        <label css={labelStyling}>
          Phone {formState.phones!.length + 1}:
          <input
            type="text"
            name="phones"
            css={inputStyling}
            value=""
            onChange={(e) => {
              const newPhones = [
                ...formState.phones!,
                { number: e.target.value },
              ];
              setFormState((prevState) => ({
                ...prevState,
                phones: newPhones,
              }));
            }}
            onFocus={() => setFocusedIndex(formState.phones!.length)}
            onBlur={() => setFocusedIndex(null)}
            autoFocus={formState.phones!.length === focusedIndex}
          />
        </label>
        <div css={buttonsStyling}>
          <button type="submit" css={favButtonStyling} disabled={disabled}>
            Save
          </button>
          {!isNewContact && (
            <button
              type="button"
              onClick={handleDelete}
              css={deleteButtonStyling}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
