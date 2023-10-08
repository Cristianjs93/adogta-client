import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';
import { animateScroll as ScrollToTop } from 'react-scroll';
import history from '../history';
import {
  FaFacebook,
  FaTwitterSquare,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';
import '../assets/styles/Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const status = useSelector((state) => state.general.status);
  let recentUser = useSelector((state) => state.general.user);
  if (recentUser === null || recentUser === undefined) {
    recentUser = {};
  }
  const { role, _id } = recentUser;

  const [location, setLocation] = useState(history.location.pathname);

  useEffect(() => {
    return history.listen((location) => {
      setLocation(location.pathname);
    });
  }, [location]);

  return (
    <footer className='footer' data-testid='footer'>
      <div className='footer__wrapper'>
        <div className='footer__wrapper--social-links'>
          <ul>
            <li className='footer__wrapper--social-items'>
              <a
                href='https://www.facebook.com/'
                target='_blank'
                rel='noreferrer'
                aria-label='Facebook'
                data-testid='facebook'>
                <FaFacebook />
              </a>
            </li>
            <li className='footer__wrapper--social-items'>
              <a
                href='https://www.twitter.com/'
                target='_blank'
                rel='noreferrer'
                aria-label='twitter'
                data-testid='twitter'>
                <FaTwitterSquare />
              </a>
            </li>
            <li className='footer__wrapper--social-items'>
              <a
                href='https://www.instagram.com/'
                target='_blank'
                rel='noreferrer'
                aria-label='instagram'
                data-testid='instagram'>
                <FaInstagram />
              </a>
            </li>
            <li className='footer__wrapper--social-items'>
              <a
                href='https://www.linkedin.com/'
                target='_blank'
                rel='noreferrer'
                aria-label='LinkedIn'
                data-testid='linkedin'>
                <FaLinkedin />
              </a>
            </li>
          </ul>
        </div>

        <div className='footer__wrapper--quick-links'>
          <ul>
            <li className='footer__wrapper--quick-items'>
              {status === 'AUTHENTICATED' ? (
                role === 'user' ? (
                  <Link className='footer__wrapper--navLinks' to='/foundations'>
                    {t('navBar.foundations')}
                  </Link>
                ) : (
                  role === 'foundation' && (
                    <Link
                      className='navBar__container--navLinks2'
                      to={`/foundations/${_id}/pets`}>
                      {t('navBar.pets')}
                    </Link>
                  )
                )
              ) : (
                (status === 'NOT_AUTHENTICATED' || status === 'LOADING') &&
                location === '/' && (
                  <div
                    className='footer__wrapper--navLinks'
                    onClick={() => ScrollToTop.scrollToTop()}>
                    {t('navBar.about')}
                  </div>
                )
              )}
              {status === 'AUTHENTICATED' && role === 'admin' && (
                <Link className='footer__wrapper--navLinks' to='/'>
                  {t('footer.home')}
                </Link>
              )}
            </li>
            <li className='footer__wrapper--quick-items'>
              {(status === 'NOT_AUTHENTICATED' || status === 'LOADING') &&
              location === '/' ? (
                <LinkScroll
                  className='footer__wrapper--navLinks'
                  to='info'
                  smooth={true}
                  duration={1000}>
                  {t('navBar.info')}
                </LinkScroll>
              ) : (
                status === 'NOT_AUTHENTICATED' &&
                location !== '/' && (
                  <Link className='footer__wrapper--navLinks' to='/'>
                    {t('footer.home')}
                  </Link>
                )
              )}
            </li>
            <li className='footer__wrapper--quick-items'>
              {status === 'AUTHENTICATED' ? (
                <Link
                  className='footer__wrapper--navLinks'
                  to={`/${_id}/profile`}>
                  {t('footer.profile')}
                </Link>
              ) : (
                status === 'NOT_AUTHENTICATED' &&
                location === '/' && (
                  <LinkScroll
                    className='footer__wrapper--navLinks'
                    to='helpUs'
                    smooth={true}
                    duration={1000}>
                    {t('navBar.help')}
                  </LinkScroll>
                )
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className='footer__outer-footer'>
        {t('footer.copyrigth', {
          copyrigth: String.fromCharCode(169),
        })}
      </div>
    </footer>
  );
};
export default Footer;
