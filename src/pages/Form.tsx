import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import useContact from "../hooks/useContact";
import { useParams } from "react-router-dom";

interface Phone {
  number: string;
  __typename?: string;
}

interface FormProps {
  firstName?: string;
  lastName?: string;
  phones?: Phone[];
}

const Form: React.FC<FormProps> = ({ firstName, lastName, phones }) => {
  const { id } = useParams<{ id?: string }>();
  const contactId = id ? parseInt(id) : 0;

  const { data, loading, error } = useContact(contactId);

  const [formState, setFormState] = useState<FormProps>({
    firstName: firstName || "",
    lastName: lastName || "",
    phones: phones || [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phones") {
      const phoneArray = value.split(",").map((phone) => ({
        number: phone.trim(),
        __typename: "phone", // You might need to adjust this if needed
      }));
      setFormState((prevState) => ({ ...prevState, [name]: phoneArray }));
    } else {
      setFormState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

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

  useEffect(() => {
    if (data) {
      const { first_name, last_name, phones } = data.contact_by_pk;
      setFormState({
        firstName: first_name,
        lastName: last_name,
        phones,
      });
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  else if (error) return <div>Error: {error.message}</div>;
  else
    return (
      <div>
        <h1>Form</h1>
        <button
          type="button"
          onClick={() =>
            setFormState({ firstName: "", lastName: "", phones: [] })
          }
        >
          Reset
        </button>
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
            <label key={index} css={labelStyling}>
              Phone {index + 1}:
              <input
                type="text"
                name="phones"
                css={inputStyling}
                value={phone.number}
                onChange={(e) => {
                  const newPhones = [...formState.phones!];
                  newPhones[index] = {
                    number: e.target.value,
                  };
                  setFormState((prevState) => ({
                    ...prevState,
                    phones: newPhones,
                  }));
                }}
                ref={(inputRef) => {
                  if (inputRef && index === formState.phones!.length - 1) {
                    inputRef.focus();
                  }
                }}
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
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </form>
      </div>
    );
};

export default Form;
