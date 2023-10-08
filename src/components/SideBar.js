import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logOut } from '../store/toolkit/slices/generalSlice';
import { Link } from 'react-router-dom';
import history from '../history';
import { Link as LinkScroll } from 'react-scroll';
import { animateScroll as ScrollToTop } from 'react-scroll';
import { FaTimes } from 'react-icons/fa';
import '../assets/styles/SideBar.css';

function SideBar({ isOpen, toggle }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const status = useSelector((state) => state.general.status);

  const [location, setLocation] = useState(history.location.pathname);

  let recentUser = useSelector((state) => state.general.user);
  if (recentUser === null || recentUser === undefined) {
    recentUser = {};
  }
  const { _id, role } = recentUser;

  const handleLogOut = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    return history.listen((location) => {
      setLocation(location.pathname);
    });
  }, [location]);

  return (
    <aside
      className={`sideBar__container 
      ${isOpen ? 'sideBar__container--show' : 'sideBar__container--hide'}`}
      onClick={toggle}
      data-testid='sideBar'>
      <div className='sideBar__container--icon' onClick={toggle}>
        <div className='sideBar__container--closeIcon'>
          <FaTimes />
        </div>
      </div>
      <div className='sideBar__container--wrapper'>
        {location === '/' && (
          <ul className='sideBar__container--menu'>
            <li
              className='sideBar__container--link'
              onClick={() => ScrollToTop.scrollToTop()}>
              {t('navBar.about')}
            </li>
            <li>
              <LinkScroll
                onClick={toggle}
                smooth={true}
                duration={1000}
                className='sideBar__container--link'
                to='info'>
                {t('navBar.info')}
              </LinkScroll>
            </li>
            <li>
              <LinkScroll
                onClick={toggle}
                smooth={true}
                duration={1000}
                className='sideBar__container--link'
                to='helpUs'>
                {t('navBar.help')}
              </LinkScroll>
            </li>
          </ul>
        )}

        <div className='sideBar__container--btnWrap'>
          {status === 'AUTHENTICATED' && (
            <Link
              className='sideBar__container--route'
              to={`/${_id}/profile`}
              data-testid='profile2'>
              {t('footer.profile')}
            </Link>
          )}
        </div>
        <div className='sideBar__container--btnWrap'>
          {status === 'AUTHENTICATED' && role === 'user' ? (
            <Link
              className='sideBar__container--route'
              to='/foundations'
              data-testid='foundations2'>
              {t('navBar.foundations')}
            </Link>
          ) : (
            status === 'AUTHENTICATED' &&
            role === 'foundation' && (
              <Link
                className='sideBar__container--route'
                to={`/foundations/${_id}/pets`}
                data-testid='pets2'>
                {t('navBar.pets')}
              </Link>
            )
          )}
          {status === 'AUTHENTICATED' && role === 'admin' && (
            <Link className='sideBar__container--route' to='/admin/users'>
              {t('navBar.users')}
            </Link>
          )}
        </div>
        <div className='sideBar__container--btnWrap'>
          {status === 'AUTHENTICATED' && (
            <Link
              className='sideBar__container--route'
              to='/'
              onClick={handleLogOut}
              data-testid='logout2'>
              {t('navBar.logOut')}
            </Link>
          )}
        </div>

        <div className='sideBar__container--btnWrap'>
          {status === 'AUTHENTICATED' && role === 'admin' ? (
            <Link className='sideBar__container--route' to='/admin'>
              {t('navBar.foundations')}
            </Link>
          ) : (
            status === 'NOT_AUTHENTICATED' && (
              <Link
                className='sideBar__container--route'
                to='/login'
                data-testid='login2'>
                {t('navBar.logIn')}
              </Link>
            )
          )}
        </div>
        <div className='sideBar__container--btnWrap'>
          {status === 'NOT_AUTHENTICATED' && (
            <Link
              className='sideBar__container--route'
              to='/signup'
              data-testid='signup2'>
              {t('navBar.signUp')}
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
