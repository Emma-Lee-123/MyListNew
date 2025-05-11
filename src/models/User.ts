export type User = {
  id?: number;
  userName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>; //(user: IUser | null) => void;
}