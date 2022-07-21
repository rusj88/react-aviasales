/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './aside.module.scss';

import {
  selectOneTransfer,
  selectTwoTransfer,
  selectThreeTransfer,
  selectNoTransfer,
  selectAllTransferOptions,
} from '../actions';

function Aside({
  fnSelectOneTransfer,
  fnSelectTwoTransfer,
  fnSelectThreeTransfer,
  fnSelectNoTransfer,
  fnSelectAllTransferOptions,
  checkboxes,
}) {
  return (
    <div className={classes['side-box']}>
      <h5>КОЛИЧЕСТВО ПЕРЕСАДОК</h5>

      <div className={classes['label-container']}>
        <label className={classes.label} >
          Все
          <input
            type="checkbox"
            checked={checkboxes.none && checkboxes.one && checkboxes.two && checkboxes.three}
            onChange={fnSelectAllTransferOptions}
          />
          <span className={classes.checkmark} />
        </label>
      </div>

      <div className={classes['label-container']}>
        <label className={classes.label}>
          Без пересадок
          <input type="checkbox" checked={checkboxes.none} onChange={fnSelectNoTransfer} />
          <span className={classes.checkmark} />
        </label>
      </div>

      <div className={classes['label-container']}>
        <label className={classes.label}>
          1 пересадка
          <input type="checkbox" checked={checkboxes.one} onChange={fnSelectOneTransfer} />
          <span className={classes.checkmark} />
        </label>
      </div>

      <div className={classes['label-container']}>
        <label className={classes.label}>
          2 пересадки
          <input type="checkbox" checked={checkboxes.two} onChange={fnSelectTwoTransfer} />
          <span className={classes.checkmark} />
        </label>
      </div>

      <div className={classes['label-container']}>
        <label className={classes.label}>
          3 пересадки
          <input type="checkbox" checked={checkboxes.three} onChange={fnSelectThreeTransfer} />
          <span className={classes.checkmark} />
        </label>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  checkboxes: state.checkbox,
});

const mapDispatchToProps = (dispatch) => ({
  fnSelectOneTransfer: () => dispatch(selectOneTransfer()),
  fnSelectTwoTransfer: () => dispatch(selectTwoTransfer()),
  fnSelectThreeTransfer: () => dispatch(selectThreeTransfer()),
  fnSelectNoTransfer: () => dispatch(selectNoTransfer()),
  fnSelectAllTransferOptions: () => dispatch(selectAllTransferOptions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Aside);

Aside.defaultProps = {
  fnSelectOneTransfer: () => {},
  fnSelectTwoTransfer: () => {},
  fnSelectThreeTransfer: () => {},
  fnSelectNoTransfer: () => {},
  fnSelectAllTransferOptions: () => {},
  checkboxes: {},
};

Aside.propTypes = {
  fnSelectOneTransfer: PropTypes.func,
  fnSelectTwoTransfer: PropTypes.func,
  fnSelectThreeTransfer: PropTypes.func,
  fnSelectNoTransfer: PropTypes.func,
  fnSelectAllTransferOptions: PropTypes.func,
  checkboxes: PropTypes.objectOf(PropTypes.bool),
};
