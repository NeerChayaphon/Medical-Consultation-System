import React, {useState, useEffect} from 'react';
// import useAuthCheck from '../adapters/useAuthCheck';
import {Link} from 'react-router-dom';
import '../styles/Navbar.css';
import {useFetchUser} from '../context/userContext';

function Navbar() {
  // const contextValue = useContext(UserContext);
  // console.log(contextValue);
  const {state, refetch} = useFetchUser();
  //console.log(state.data);
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

  const signOut = () => {
    localStorage.removeItem('token');
    refetch();
  };

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
            {state.data && (
              <li className='nav-item'>
                <Link to='/appointment?id=123' className='nav-links' onClick={closeMobileMenu}>
                  Appointment
                </Link>
              </li>
            )}

            {state.data && (
              <li className='nav-item'>
                <Link to='/patient' className='nav-links' onClick={closeMobileMenu}>
                  Profile
                </Link>
              </li>
            )}

            <li>
              <Link
                to={`/${state.data ? '' : 'login'}`}
                className='nav-links-mobile'
                onClick={signOut}
              >
                {state.data && !state.isLoading ? <div>Sign Out</div> : <div>Sign In</div>}
              </Link>
            </li>
          </ul>
          {button && (
            <Link to={`/${state.data ? '' : 'login'}`} className='btn-signup' onClick={signOut}>
              {state.data && !state.isLoading ? <div>Sign Out</div> : <div>Sign In</div>}
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
