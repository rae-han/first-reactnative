import React, { useState } from 'react';
import styled from 'styled-components/native'

import Button from './components/Button'
import Counter from './components/Counter'
import From from './components/Form'

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`

const App = () => {
  const [isVisibleForm, setIsVisibleForm] = useState(true)
  return (
    <Container>
      <Counter />
      <Button
        title="Toggle Form Component"
        onPress={() => {
          setIsVisibleForm(!isVisibleForm)
        }}
      />
      { isVisibleForm && <From /> }
    </Container>
  );
};

export default App;