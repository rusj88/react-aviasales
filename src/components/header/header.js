import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Logosvg from './logo.svg';
import classes from './header.module.scss';

function Header({ ticketsError, ticketsComplete }) {
  const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

  const displayLoader = !ticketsComplete && (
    <>
      <Spin indicator={antIcon} /> Загрузка данных
    </>
  );
  const errormsg =
    ticketsError === 500 ? (
      'Произошла ошибка. Отправляем повторный запрос...'
    ) : (
      <Alert message="Что-то пошло не так. Перезагрузите страницу." type="error" />
    );

  return (
    <header className={classes.header}>
      <img src={Logosvg} alt="" className={classes['header-logo']} />
      <div className={classes.statusBar}>{ticketsError ? errormsg : displayLoader}</div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  ticketsError: state.tickets.error,
  ticketsComplete: state.tickets.gotAllTickets,
});

export default connect(mapStateToProps)(Header);

Header.defaultProps = {
  ticketsError: '',
  ticketsComplete: false,
};

Header.propTypes = {
  ticketsError: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ticketsComplete: PropTypes.bool,
};
