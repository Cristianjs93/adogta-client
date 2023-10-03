import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import Dog from '../assets/images/23919-error-doggy.json';

import '../assets/styles/AboutSection.css';

const AboutSection = () => {
  const activeUser = useSelector((state) => state.general.user);
  const { t } = useTranslation();

  return (
    <>
      <div className='aboutContainer'>
        <div className='aboutContainer__wrapper'>
          <div className='aboutContainer__wrapper--textWrapper'>
            <div className='aboutContainer__wrapper--topLine'>
              {t('aboutSection.adopt.partner')}
            </div>
            <h1 className='aboutContainer__wrapper--heading'>
              {t('aboutSection.adopt.difficult')}
            </h1>
            <p className='aboutContainer__wrapper--subtitle'>
              {t('aboutSection.adopt.info')}
            </p>
            {activeUser ? (
              <Link
                className='aboutContainer__wrapper--btnWrap'
                to={
                  activeUser.role === 'user' || activeUser.role === null
                    ? '/foundations'
                    : activeUser.role === 'foundation'
                    ? `/foundations/${activeUser._id}/pets`
                    : activeUser.role === 'admin' &&
                      `/${activeUser._id}/profile`
                }>
                <button className='aboutContainer__wrapper--button'>
                  {activeUser.role === 'user' || activeUser.role === null
                    ? t('navBar.foundations')
                    : activeUser.role === 'foundation'
                    ? t('navBar.pets')
                    : activeUser.role === 'admin' && 'PROFILE'}
                </button>
              </Link>
            ) : (
              <Link className='aboutContainer__wrapper--btnWrap' to='/signup'>
                <button className='aboutContainer__wrapper--button'>
                  {t('aboutSection.adopt.me')}
                </button>
              </Link>
            )}
          </div>

          <div className='aboutContainer__wrapper--imgWrap'>
            <Player autoplay loop src={Dog} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
