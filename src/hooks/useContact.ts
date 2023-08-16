import { gql, useQuery } from "@apollo/client";

const GET_CONTACT = gql`
  query GetContactDetail($id: Int!) {
    contact_by_pk(id: $id) {
      last_name
      id
      first_name
      created_at
      phones {
        number
      }
    }
  }
`;

const useContact = (id: number) => {
  const { data, loading, error } = useQuery(GET_CONTACT, {
    variables: {
      id,
    },
  });
  return { data, loading, error };
};

export default useContact;
