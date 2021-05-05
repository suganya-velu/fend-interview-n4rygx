// Write an interface for the User object, where "confirmed" is optional.
export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  confirmed?: boolean;
}
