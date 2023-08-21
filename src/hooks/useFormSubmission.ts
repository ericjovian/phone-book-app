import useAddContact from "../hooks/useAddContact";
import { FormProps } from "../pages/Form";
import { useNavigate } from "react-router-dom";
import { useContactContext, ContactType } from "../contexts/ContactContext";

const useFormSubmission = () => {
  const navigate = useNavigate();
  const { addContact, editContact } = useContactContext();
  const addNewContact = useAddContact();

  const handleFormSubmission = async (
    isNewContact: boolean,
    formState: FormProps
  ) => {
    try {
      let newContact: ContactType = {
        id: 0, // Temporary ID
        first_name: formState.firstName!,
        last_name: formState.lastName!,
        phones: formState.phones!,
      };

      if (!isNewContact) {
        editContact({ ...newContact, id: formState.id });
      } else {
        const addedContact = await addNewContact(newContact);
        newContact.id = addedContact.id; // Update with the actual ID
        addContact(newContact);
      }

      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return handleFormSubmission;
};

export default useFormSubmission;
