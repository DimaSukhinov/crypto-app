import React, { useCallback, useState } from 'react';
import './PortfolioModal.scss';
import { Modal } from '../Modal';
import { ConfirmDeletionModal } from '../confirmDeletionModal/ConfirmDeletionModal';
import { useDispatch } from 'react-redux';
import { removeFromPortfolioAC } from '../../../store/portfolio-reducer';
import { PortfolioValue } from './portfolioValue/PortfolioValue';
import { useAppSelector } from '../../../hooks/CustomHooks';
import { CircleChart } from '../../charts/CircleChart';

type PortfolioModalPropsType = {
  currentWalletValue: React.ReactNode
  activePortfolioModal: boolean
  setActivePortfolioModal: (activePortfolioModal: boolean) => void
}

export const PortfolioModal = React.memo(({
                                            activePortfolioModal, setActivePortfolioModal, currentWalletValue,
                                          }: PortfolioModalPropsType) => {

  const dispatch = useDispatch();
  const portfolio = useAppSelector((store) => store.portfolio);
  const [valueForDelete, setValueForDelete] = useState<string>('');
  const [confirmDeletionModal, setConfirmDeletionModal] = useState<boolean>(false);
  const chartData = portfolio.map(d => {
    return { name: d.name, price: d.price * d.valueCount };
  });

  const removeValueFromPortfolio = useCallback((id: string) => () => {
    setValueForDelete(id);
    setConfirmDeletionModal(true);
  }, []);

  const closePortfolioModal = useCallback(() => setActivePortfolioModal(false), [setActivePortfolioModal]);

  const confirmValueDelete = useCallback(() => {
    dispatch(removeFromPortfolioAC(valueForDelete));
    setConfirmDeletionModal(false);
  }, [dispatch, setConfirmDeletionModal, valueForDelete]);

  const rejectValueDelete = useCallback(() => setConfirmDeletionModal(false), []);

  return <>
    {activePortfolioModal && <div data-testid={'portfolio-modal'}>
      <Modal closeModal={closePortfolioModal}>
        {
          portfolio.length > 0
            ? <div className={'portfolio'}>
              <div className={'portfolio__price'}>
                Current price: {currentWalletValue}
              </div>
              <PortfolioValue portfolio={portfolio} removeValueFromPortfolio={removeValueFromPortfolio} />
              <CircleChart data={chartData} />
              {confirmDeletionModal &&
                <ConfirmDeletionModal valueForDelete={valueForDelete} confirm={confirmValueDelete}
                                      reject={rejectValueDelete} />}
            </div>
            : <div className={'portfolio__empty-portfolio'} data-testid={'empty-portfolio'}>You don't have currency</div>
        }
      </Modal>
    </div>}
  </>;
});
