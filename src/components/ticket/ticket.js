import PropTypes from 'prop-types';
import classes from './ticket.module.scss';

function Ticket({ price, carrier, segments: [flightOut, flightBack] }) {
  const getFlightDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  };

  const getLaunchTime = (time) => {
    const launchUnixTime = Date.parse(time);
    const launchTime = new Date(launchUnixTime);
    return launchTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const getLandingTime = (time, duration) => {
    const landingUnixTime = Date.parse(time) + duration * 60 * 1000;
    const landingTime = new Date(landingUnixTime);
    return landingTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const getTransfersCount = (stops) => {
    if (stops === 0) {
      return 'Без пересадок';
    }
    if (stops === 1) {
      return '1 пересадка';
    }
    return `${stops} пересадки`;
  };

  return (
    <div className={classes.ticket}>
      <div className={classes['ticket-header']}>
        <span className={classes.price}>{price} Р</span>
        <img src={`//pics.avs.io/99/36/${carrier}.png`} alt={carrier} />
      </div>
      <div className={classes.infoline}>
        <div className={classes.info}>
          <span className={classes['top-text']}>
            {flightOut.origin}–{flightOut.destination}
          </span>
          <br />
          <span className={classes['bottom-text']}>
            {getLaunchTime(flightOut.date)} – {getLandingTime(flightOut.date, flightOut.duration)}
          </span>
        </div>
        <div className={classes.info}>
          <span className={classes['top-text']}>В ПУТИ</span>
          <br />
          <span className={classes['bottom-text']}>{getFlightDuration(flightOut.duration)}</span>
        </div>
        <div className={classes.info}>
          <span className={classes['top-text']}>{getTransfersCount(flightOut.stops.length)}</span>
          <br />
          <span className={classes['bottom-text']}>{flightOut.stops.join(', ')}</span>
        </div>
      </div>
      <div className={classes.infoline}>
        <div className={classes.info}>
          <span className={classes['top-text']}>
            {flightBack.origin}–{flightBack.destination}
          </span>
          <br />
          <span className={classes['bottom-text']}>
            {getLaunchTime(flightBack.date)} – {getLandingTime(flightBack.date, flightBack.duration)}
          </span>
        </div>
        <div className={classes.info}>
          <span className={classes['top-text']}>В ПУТИ</span>
          <br />
          <span className={classes['bottom-text']}>{getFlightDuration(flightBack.duration)}</span>
        </div>
        <div className={classes.info}>
          <span className={classes['top-text']}>{getTransfersCount(flightBack.stops.length)}</span>
          <br />
          <span className={classes['bottom-text']}>{flightBack.stops.join(', ')}</span>
        </div>
      </div>
    </div>
  );
}

export default Ticket;

Ticket.defaultProps = {
  price: 0,
  carrier: '',
  segments: [],
};

Ticket.propTypes = {
  price: PropTypes.number,
  carrier: PropTypes.string,
  segments: PropTypes.arrayOf(PropTypes.shape({})),
};
