import Header from '../header/header';
import Aside from '../aside/aside';
import TicketList from '../ticketlist/ticketlist';
import classes from './app.module.scss';

function App() {

  return <div className={classes.wrapper}> 
  <Header />
  <section className={classes.main}>
  <Aside/>
  <TicketList/>
  </section>
  </div>
  
}

export default App;