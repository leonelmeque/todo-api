export interface UserDTO {
  uuid: string;
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  createdTodos: string[];  // List of UUIDs of todos created by the user
}
