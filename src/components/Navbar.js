import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logOut } from '../store/toolkit/slices/generalSlice';
import { Link } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';
import LanguageSelector from './LanguageSelector';
import history from '../history';
import profile from '../assets/images/profile.png';
import { FaBars } from 'react-icons/fa';
import { MdPets } from 'react-icons/md';
import { animateScroll as ScrollToTop } from 'react-scroll';
import '../assets/styles/Navbar.css';

function Navbar({ toggle }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  let recentUser = useSelector((state) => state.general.user);
  if (recentUser === null || recentUser === undefined) {
    recentUser = {};
  }

  const general = useSelector((state) => state.general);

  const status = useSelector((state) => state.general.status);

  const { photoUrl, name, _id, role } = recentUser;

  const [isMobile, setIsMobile] = useState('');

  const [location, setLocation] = useState(history.location.pathname);

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        const ismobile = window.innerWidth < 768;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    return history.listen((location) => {
      setLocation(location.pathname);
    });
  }, [location]);

  return (
    <>
      <nav className='navBar' data-testid='navBar'>
        <button onClick={() => console.log(general)}>General</button>
        <div className='navBar__container'>
          <Link className='navBar__container--logo' to='/' data-testid='adogta'>
            <MdPets className='navBar__container--pet' />
            ADOGTA
          </Link>

          {status === 'AUTHENTICATED' ? (
            <Link
              className='navBar__container--profilePicWrapper1'
              to={!isMobile && `/${_id}/profile`}>
              <img
                onClick={toggle}
                className='navBar__container--profilePic1'
                src={
                  !!photoUrl && photoUrl !== 'undefined' ? photoUrl : profile
                }
                alt={name}
              />
            </Link>
          ) : (
            <div className='navBar__container--mobileIcon'>
              <FaBars onClick={toggle} />
            </div>
          )}
          {location === '/' && (
            <ul className='navBar__container--navMenu'>
              <li
                className='navBar__container--navItem'
                onClick={() => ScrollToTop.scrollToTop()}>
                <div className='navBar__container--navLinks'>
                  {t('navBar.about')}
                </div>
              </li>
              <li className='navBar__container--navItem'>
                <LinkScroll
                  className='navBar__container--navLinks'
                  to='info'
                  smooth={true}
                  duration={1000}
                  data-testid='info'>
                  {t('navBar.info')}
                </LinkScroll>
              </li>
              <li className='navBar__container--navItem'>
                <LinkScroll
                  className='navBar__container--navLinks'
                  to='helpUs'
                  smooth={true}
                  duration={1000}>
                  {t('navBar.help')}
                </LinkScroll>
              </li>
            </ul>
          )}

          <ul className='navBar__container--navMenu2'>
            <li
              className={
                status === 'AUTHENTICATED'
                  ? 'navBar__container--navMenu2--hide'
                  : 'navBar__container--navItem2'
              }>
              <Link
                className='navBar__container--navLinks2'
                to='/login'
                data-testid='login'>
                {t('navBar.logIn')}
              </Link>
            </li>{' '}
            <li
              className={
                status === 'AUTHENTICATED' && role === 'foundation'
                  ? 'navBar__container--navItem2'
                  : 'navBar__container--navMenu2--hide'
              }>
              <Link
                className='navBar__container--navLinks2'
                to={`/foundations/${_id}/pets`}
                data-testid='pets'>
                {t('navBar.pets')}
              </Link>
            </li>
            <li
              className={
                status === 'AUTHENTICATED' && role === 'admin'
                  ? 'navBar__container--navItem2'
                  : 'navBar__container--navMenu2--hide'
              }>
              <Link className='navBar__container--navLinks2' to='/admin'>
                {t('navBar.foundations')}
              </Link>
            </li>
            <li
              className={
                status === 'AUTHENTICATED' && role === 'user'
                  ? 'navBar__container--navItem2'
                  : 'navBar__container--navMenu2--hide'
              }>
              <Link
                className='navBar__container--navLinks2'
                to='/foundations'
                data-testid='foundations'>
                {t('navBar.foundations')}
              </Link>
            </li>
            <li
              className={
                status === 'AUTHENTICATED' && role === 'admin'
                  ? 'navBar__container--navItem2'
                  : 'navBar__container--navMenu2--hide'
              }>
              <Link className='navBar__container--navLinks2' to='/admin/users'>
                {t('navBar.users')}
              </Link>
            </li>
            <li
              className={
                status === 'AUTHENTICATED'
                  ? 'navBar__container--navItem2'
                  : 'navBar__container--navMenu2--hide'
              }>
              <Link
                className='navBar__container--navLinks2'
                to='/'
                onClick={handleLogOut}>
                {t('navBar.logOut')}
              </Link>
            </li>
          </ul>

          <nav className='navBar__container--nav'>
            {status === 'AUTHENTICATED' ? (
              <Link
                className='navBar__container--profilePicWrapper'
                to={`/${_id}/profile`}>
                <img
                  className='navBar__container--profilePic'
                  src={
                    !!photoUrl && photoUrl !== 'undefined' ? photoUrl : profile
                  }
                  alt={name}
                />
              </Link>
            ) : (
              <Link
                className='navBar__container--navBtnLink'
                to='/signup'
                data-testid='signup'>
                {t('navBar.signUp')}
              </Link>
            )}

            <LanguageSelector />
          </nav>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
