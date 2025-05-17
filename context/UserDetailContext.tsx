import { createContext, Dispatch, SetStateAction } from 'react';

export interface UserDetail {
  name: string;
  email: string;
  member: boolean;
  uid?: string;
}

export interface UserDetailContextType {
  userDetail: UserDetail | null;
  setUserDetail: Dispatch<SetStateAction<UserDetail | null>>;
}

const defaultContext: UserDetailContextType = {
  userDetail: null,
  setUserDetail: () => { },
};

export const UserDetailContext = createContext<UserDetailContextType>(defaultContext);
