export interface TodoDto {
  uuid: string;
  name: string;
  description: string;
  creationDate: number;  // Unix timestamp
  creator: string;  // UUID of the user
  viewers: string[];  // List of UUIDs of users who have access
}
