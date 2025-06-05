export interface User {
  id?: number;
  username: string;
  email?: string;
  role: 'ADMIN' | 'USER';
  // Add other user properties as needed
}
