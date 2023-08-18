import { gql, useMutation } from "@apollo/client";
import { ContactType } from "../contexts/ContactContext";

const POST_CONTACT = gql`
  mutation AddContactWithPhones(
    $first_name: String!
    $last_name: String!
    $phones: [phone_insert_input!]!
  ) {
    insert_contact(
      objects: {
        first_name: $first_name
        last_name: $last_name
        phones: { data: $phones }
      }
    ) {
      returning {
        first_name
        last_name
        id
        phones {
          number
        }
      }
    }
  }
`;

const useAddContact = () => {
  const [addContactMutation] = useMutation(POST_CONTACT);

  const addContact = async (contact: ContactType) => {
    try {
      const response = await addContactMutation({
        variables: {
          first_name: contact.first_name,
          last_name: contact.last_name,
          phones: contact.phones,
        },
      });

      const addedContact = response.data.insert_contact.returning[0];
      return addedContact;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return addContact;
};

export default useAddContact;
