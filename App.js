// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './Frontend/src/navigation/AppNavigator';
import { AppContext } from './Frontend/src/context.js';  // 根据实际路径修改这里

function App() {
  const [postDraft, setPostDraft] = useState({ title: '', content: '' });

  return (
    <AppContext.Provider value={{ postDraft, setPostDraft }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export default App;
