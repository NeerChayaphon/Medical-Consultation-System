import React, {useState, useEffect} from 'react';
// import useAuthCheck from '../adapters/useAuthCheck';
import {Link} from 'react-router-dom';
import './Navbar.css';
import {useFetchUser} from '../context/userContext';

function Navbar() {
  // const contextValue = useContext(UserContext);
  // console.log(contextValue);
  const {state} = useFetchUser();
  console.log(state.data);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            MyDoctor
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='/patient/record' className='nav-links' onClick={closeMobileMenu}>
                Appointment
              </Link>
            </li>

            {state.data && (
              <li className='nav-item'>
                <Link to='/patient' className='nav-links' onClick={closeMobileMenu}>
                  Profile
                </Link>
              </li>
            )}

            <li>
              <Link to='/login' className='nav-links-mobile' onClick={closeMobileMenu}>
                <>Sign Out</>
              </Link>
            </li>
          </ul>
          {button && (
            <Link to='/login' className='btn-signup'>
              Sign Out
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
