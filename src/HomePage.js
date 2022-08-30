import './App.css';
import bg1 from './assets/images/minimal-money.jpg'
import bg2 from './assets/images/background2.jpg'
import icon from './assets/images/budgeticon.png'
import budge1 from './assets/images/budge1.png'

function HomePage() {
  return (
    <div className="home-container parallax-wrapper">

      <div className='parallax'>
        {/* <img alt='background' src={bg1} className='background bg-1'></img> */}
        <img src={budge1}></img>
        <div className='background bg-1test'></div>
        <h1 className='title'>Feeling Budgety?</h1>
      </div>


      <section className='bg-divider'>
        <h2>Start Budgeting today with Budgety!</h2>
        <p>Your solution to every day budgeting needs!</p>
        <p>Ditch those old pen and paper methods, or don't we also provide an PDF capabilities.</p>
      </section>


      <div className='background bg-2'>
        {/* <img className='background bg-2' alt='background 2' src={bg2}></img> */}

        <img className='hp-icon1' alt='budget icon' src={icon}></img>
        <h2 className='hp-icon1-text'>Coming soon to iOS</h2>

        <section className='hp-footer'>
          <p>Copyright @ MT</p>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
