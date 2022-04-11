import React from 'react';
import './App.css';
import NewMainView from './components/newMainView';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <NewMainView></NewMainView>
    </RecoilRoot>
  );
}

export default App;
