import React, { useCallback, useState, useEffect } from 'react';
import './App.scss';
import Table, { ISwimmer } from '../Table/Table';
import ModalResult from '../ModalResult/ModalResult';
import ModalNewSwimmer from '../ModalNewSwimmer/ModalNewSwimmer';

function App() {
  const [showResultModal, setShowResultModal] = useState(false);
  const [showNewSwimmerModal, setShowNewSwimmerModal] = useState(false);
  const [swimmer, setSwimmer] = useState({_id: '0', name: 'start', result: 0});
  const [swimmers, setSwimmers] = useState([
    {
      _id: '1',
      name: 'Test',
      result: 0
    },
    {
      _id: '2',
      name: 'John',
      result: 35
    },
    {
      _id: '3',
      name: 'Henry',
      result: 31
    },
  ]);

  useEffect(() => {
    fetch('http://localhost:3001')
      .then(r => r.json())
      .then(setSwimmers);
  }, []);

  const handleResultClick = useCallback((swimmer: ISwimmer) => {
    setSwimmer(swimmer);
    setShowResultModal(true);
  }, []);

  const handleNewSwimmerClick = useCallback(() => {
    setShowNewSwimmerModal(true);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <Table className="col-9" swimmers={swimmers} modalResultClick={handleResultClick} modalNewSwimmerClick={handleNewSwimmerClick}/>
          <div className="col-2 offset-1">
            <h4>
              {`Общий результат: 
                ${swimmers.reduce((result, nextSwimmer) => {
                  return result + nextSwimmer.result;
                }, 0)}
              `}
            </h4>
          </div>
        </div>
      </div>
      <ModalResult swimmer={swimmer} show={showResultModal} setShow={setShowResultModal} />
      <ModalNewSwimmer swimmersCount={swimmers.length} show={showNewSwimmerModal} setShow={setShowNewSwimmerModal} />
    </div>
  );
}

export default App;
