import { gql, useMutation } from "@apollo/client";

const DEL_CONTACT = gql`
  mutation MyMutation($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;

const DelCont = () => {
  const [delContact] = useMutation(DEL_CONTACT);

  const edit = async (id: number) => {
    try {
      await delContact({
        variables: {
          id: id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return edit;
};

export default DelCont;
