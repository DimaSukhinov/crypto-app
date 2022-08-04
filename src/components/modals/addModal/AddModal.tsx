import React, { ChangeEvent } from 'react';
import './AddModal.scss';
import { Modal } from '../Modal';
import { ValueType } from '../../../store/values-reducer';
import { Button } from '../../common/button/Button';

type AddModalPropsType = {
  values: ValueType[]
  activeAddModal: boolean
  currentValue: string
  closeModal: () => void
  error: boolean
  valueCount: number
  onValueCountChange: (e: ChangeEvent<HTMLInputElement>) => void
  addToPortfolio: (id: string, name: string, price: string, valueCount: number) => () => void
}

export const AddModal = React.memo(({
                                      values, activeAddModal, closeModal, currentValue,
                                      valueCount, error, onValueCountChange, addToPortfolio,
                                    }: AddModalPropsType) => {

  return (
    <div data-testid={'add-modal'}>
      {activeAddModal && <Modal closeModal={closeModal}>
        {values.map(v => v.id === currentValue && <div key={v.id} className={'modal'}>
          <span className={'modal__item'}>{v.name}</span>
          <input type='number' onChange={onValueCountChange} className={'modal__item'} />
          {error && <div style={{ color: 'red' }} className={'modal__error'}>min 0.1, max 1000</div>}
          <span className={'modal__item'}>
            Price: {valueCount > 0 && (valueCount * +v.priceUsd).toFixed(2) + '$'}
          </span>
          <Button onClickHandler={addToPortfolio(v.id, v.name, v.priceUsd, valueCount)}>
            <span className={'modal__buttonText'}>Add</span>
          </Button>
        </div>)}
      </Modal>}
    </div>
  );
});
