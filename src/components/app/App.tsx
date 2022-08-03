import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Header } from '../header/Header';
import { Values } from '../values/Values';
import { Value } from '../values/value/Value';
import { AddModal } from '../modals/addModal/AddModal';
import { useDispatch } from 'react-redux';
import { useAddModal } from '../../hooks/UseAddModal';
import { useAppSelector } from '../../hooks/CustomHooks';
import { setPortfolioAC } from '../../store/portfolio-reducer';
import { useQuery } from '@apollo/client';
import { GET_ALL_VALUES } from '../../api/GraphqlRequests';
import { setValuesAC } from '../../store/values-reducer';

export const App = React.memo(() => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const values = useAppSelector((store) => store.values);
  const { data, loading } = useQuery(GET_ALL_VALUES);

  const [currentValue, setCurrentValue] = useState<string>('');
  const [valueCount, setValueCount] = useState<number>(0);
  const [activeAddModal, setActiveAddModal] = useState<boolean>(false);
  const [InputError, setInputError] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const {
    openAddModal, closeModal, onValueCountChange, addToPortfolio,
  } = useAddModal(setActiveAddModal, setCurrentValue, setInputError, setValueCount);

  useEffect(() => {
    if (!loading) {
      dispatch(setValuesAC(data.getAllValues));
    }

    let portfolio = localStorage.getItem('portfolio');
    if (portfolio !== null) {
      dispatch(setPortfolioAC(JSON.parse(portfolio)));
    }

    let value = sessionStorage.getItem('value');
    if (value) {
      let newValue = JSON.parse(value);
      setValue(newValue);
    }
  }, [data]);

  const navigateToValue = useCallback((id: string) => {
    navigate(`values/${id}`);
    setValue(id);
    sessionStorage.setItem('value', JSON.stringify(id));
  }, [navigate]);

  const navigateToValues = useCallback(() => {
    navigate('values');
    sessionStorage.setItem('value', JSON.stringify(''));
  }, [navigate]);

  return (
    <div className={'app'}>
      <Header values={values} />
      <div className={'app__main'}>
        <Routes>
          <Route path={'/'} element={<Navigate to={'/values'} />} />
          <Route path={'/values'}
                 element={<Values values={values} navigateToValue={navigateToValue}
                                  openAddModal={openAddModal} />}
          />
          <Route path={`/values/:id`}
                 element={<Value values={values} value={value} navigateToValues={navigateToValues}
                                 openAddModal={openAddModal} />}
          />
          <Route path={'/*'} element={<div data-testid={'InputError-page'}>404</div>} />
        </Routes>
      </div>
      {activeAddModal && <AddModal values={values} activeAddModal={activeAddModal} closeModal={closeModal}
                                   currentValue={currentValue} valueCount={valueCount}
                                   onValueCountChange={onValueCountChange} error={InputError}
                                   addToPortfolio={addToPortfolio}
      />}
    </div>
  );
});
