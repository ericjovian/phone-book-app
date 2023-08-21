import { gql, useQuery } from "@apollo/client";

const GET_CONTACTS = gql`
  query GetContactList(
    $distinct_on: [contact_select_column!]
    $order_by: [contact_order_by!]
    $where: contact_bool_exp
  ) {
    contact(distinct_on: $distinct_on, order_by: $order_by, where: $where) {
      created_at
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`;

const useContacts = (searchText: string) => {
  const { data, loading, error } = useQuery(GET_CONTACTS, {
    variables: {
      where: {
        _or: [
          { first_name: { _ilike: `%${searchText}%` } },
          { last_name: { _ilike: `%${searchText}%` } },
        ],
      },
      order_by: [{ created_at: "desc" }],
    },
  });
  return { data, loading, error };
};

export default useContacts;
