import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import useDeleteContact from "../hooks/useDeleteContact";
import { useContactContext, ContactType } from "../contexts/ContactContext";
import AddFavourite from "./AddFavourite";
import BackButton from "./BackButton";
import useFormSubmission from "../hooks/useFormSubmission";

export interface Phone {
  number: string;
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
  const handleFormSubmission = useFormSubmission();
  const { deleteContact, addFavourite } = useContactContext();
  const navigate = useNavigate();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [formState, setFormState] = useState<FormProps>(initialData);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFormSubmission(isNewContact || false, formState);
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
  };

  useEffect(() => {
    setFormState(initialData);
  }, [initialData]);

  return (
    <div>
      <h1>{isNewContact ? "Create New Contact" : "Edit Contact"}</h1>
      <div css={{ display: "flex", justifyContent: "space-between" }}>
        <BackButton />
        {isNewContact ? null : <AddFavourite onClick={handleFavorite} />}
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
              name="phones"
              css={inputStyling}
              value={phone.number}
              onChange={(e) => {
                const newPhones = [...formState.phones!];
                newPhones[index].number = e.target.value;
                setFormState((prevState) => ({
                  ...prevState,
                  phones: newPhones,
                }));
              }}
              onFocus={() => setFocusedIndex(index)} // Set the focused index
              onBlur={() => setFocusedIndex(null)} // Clear focused index on blur
              autoFocus={index === focusedIndex} // Automatically focus the current input
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
        <button type="submit">Save</button>
        {!isNewContact && (
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
