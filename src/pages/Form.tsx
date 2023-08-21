import React, { useEffect, useState } from "react";
import useContact from "../hooks/useContact";
import { useParams } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import { setIsLoading } from "../redux/slices/commonSlice";
import { useDispatch } from "react-redux";

interface Phone {
  number: string;
  __typename?: string;
}

export interface FormProps {
  id?: number;
  firstName?: string;
  lastName?: string;
  phones?: Phone[];
}

const Form: React.FC<FormProps> = ({ id, firstName, lastName, phones }) => {
  const dispatch = useDispatch();
  const contactId = parseInt(useParams<{ id?: string }>().id || "0");
  const isNewContact = contactId === 0;

  const { data, loading, error } = useContact(contactId);

  const [formState, setFormState] = useState<FormProps>({
    id: contactId || id,
    firstName: firstName || "",
    lastName: lastName || "",
    phones: phones || [],
  });

  useEffect(() => {
    if (!isNewContact && data) {
      const { first_name, last_name, phones } = data.contact_by_pk;
      setFormState({
        id: contactId,
        firstName: first_name,
        lastName: last_name,
        phones,
      });
    }
    if (loading || error) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [data, isNewContact]);

  if (isNewContact) {
    return (
      <ContactForm
        isNewContact
        initialData={{
          id: 0,
          firstName: "",
          lastName: "",
          phones: [],
        }}
      />
    );
  } else return <ContactForm initialData={formState} />;
};

export default Form;
