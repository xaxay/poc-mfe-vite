// components/admin/admin-api.ts

import { getUserLogin } from "@browser-module/api/user";

// Mock
export type User = {
  name: string;
}

// Mock
export type UserDetails = User & {
  permissions: string[];
}


// Mock
export const searchUser = async (nameLike: string) : Promise<User[]> => {
  if (!nameLike) {
    return [];
  }

  const currentUserName = getUserLogin();
  if (!currentUserName.includes(nameLike)) {
    return [];
  }

  const result = [{ name: nameLike }];

  if (nameLike !== currentUserName && currentUserName.includes(nameLike)) {
    result.unshift({ name: currentUserName });
  }  

  return result;
}

// Mock
export const getUserDetails = async (name: string) : Promise<UserDetails|null> => {

  if (!name) {
    return null;
  }
  
  const currentUserName = getUserLogin();
  if (name != currentUserName) {
    return null;
  }


  const permissions = [
    'account', 
    'rumors', 
    'app4', 'app5', 'app6', 'app7', 'app8', 'app9', 
    // 'app10', 
    'app11', 'app12', 'app13', 'app14', 'app15', 'app16', 'app17', 'app18'
  ];

  if (name === 'admin') {
    permissions.push('admin');
  }

  return { 
    name, 
    permissions,
  } as UserDetails;
} 