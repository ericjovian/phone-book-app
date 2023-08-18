import { gql, useMutation } from "@apollo/client";

const PUT_CONTACT = gql`
  mutation EditContactById($id: Int!, $_set: contact_set_input) {
    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

const POST_NUMBER = gql`
  mutation EditContactById($id: Int!, $_set: contact_set_input) {
    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

const PUT_NUMBER = gql`
  mutation EditPhoneNumber(
    $pk_columns: phone_pk_columns_input!
    $new_phone_number: String!
  ) {
    update_phone_by_pk(
      pk_columns: $pk_columns
      _set: { number: $new_phone_number }
    ) {
      contact {
        id
        last_name
        first_name
        created_at
        phones {
          number
        }
      }
    }
  }
`;

const useEditContact = () => {
  const [editContact] = useMutation(PUT_CONTACT);
  const [addNumber] = useMutation(POST_NUMBER);
  const [editNumber] = useMutation(PUT_NUMBER);

  const edit = async (id: number, contact: any) => {
    try {
      await editContact({
        variables: {
          id,
          _set: {
            first_name: contact.first_name,
            last_name: contact.last_name,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const add = async (id: number, number: string) => {
    try {
      await addNumber({
        variables: {
          id,
          _set: {
            number,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editNum = async (id: number, number: string, newNumber: string) => {
    try {
      await editNumber({
        variables: {
          pk_columns: {
            id,
            number,
          },
          new_phone_number: newNumber,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { edit, add, editNum };
};

export default useEditContact;
