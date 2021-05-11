import React, { createContext, useState } from 'react';

const initialState = { name: 'Raehan' }

const UserContext = createContext(initialState)

const UserProvider = ({ children }) => {
  const [name, setName] = useState('rae-han');

  const value = { user: { name }, dispatch: setName };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer }
export default UserContext;