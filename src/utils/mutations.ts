import gql from 'graphql-tag';

export const ADD_TODO = gql`
mutation addTodo($name: String) {
  addTodo(name: $name) {
    code
    message
  }
}
`;

export const DELETE_TODO = gql`
mutation deleteTodo($id: String) {
  deleteTodo(id: $id) {
    code
    message
  }
}
`;

export const CHECK_OR_UNCHECK = gql`
mutation checkOrUncheck($id: String) {
  checkOrUncheck(id: $id) {
    code
    message
  }
}
`;
