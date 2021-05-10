import React, { useState } from 'react';
import styled from 'styled-components/native'

import Button from './components/Button'
import Counter from './components/Counter'
import Dog from './components/Dog';
import From from './components/Form'
import Length from './components/Length';

const Layout = styled.ScrollView`
  flex: 1;
`

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`

const App = () => {
  const [isVisibleForm, setIsVisibleForm] = useState(true)
  return (
    <Layout>
      <Container>
        <Counter />
        <Button
          title="Toggle Form Component"
          onPress={() => {
            setIsVisibleForm(!isVisibleForm)
          }}
        />
        { isVisibleForm && <From /> }
        <Length />
        <Dog />
      </Container>
    </Layout>
  );
};

export default App;