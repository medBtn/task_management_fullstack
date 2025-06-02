export interface User {
  id?: string;
  username: string;
  email?: string;
  role: 'ADMIN' | 'USER';
  // Add other user properties as needed
}
