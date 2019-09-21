import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Loader = () => {
  const [isMobile, setIfMobile] = useState(false);

  useEffect(() => {
    if (window.screen.width <= 480) {
      setIfMobile(true);
    }
    window.scrollTo(null, 0);
  }, []);

  return (
    <SkeletonTheme color="#0f1214" highlightColor="#181d20">
      <div className="container__wrapper w-100">
        <div className="back__button">
          <Skeleton width={50} /> 
        </div>
        <div className="view">
          <div className="view__poster" style={{background: 'none'}}>
            <Skeleton width={'100%'} height={'100%'}/>
          </div>
          <div className="view__details">
              <br/>
              <Skeleton width={isMobile ? '100%' : 400} height={50}/><br/>
              <Skeleton width={180} height={20}/><br/>
              <Skeleton width={150} height={20}/><br/>
              <p>
                <Skeleton count={4} />
              </p>
              <br/><br/>
              <div className="view__actions">
                <Skeleton width={220} height={60}/>
                &nbsp;&nbsp;
                <Skeleton width={220} height={60}/>
              </div>
            </div>     
        </div>
      </div>
      <div className="movie__casts">
        <div className="movie__casts-content">
          <div className="movie__casts-wrapper">
            <div className="movie__casts-header">
              <Skeleton width={isMobile ? '100%' : 400} height={50}/><br/>
            </div>
            <div className="movie__casts-grid">
              <Skeleton width={isMobile ? 150 : 180} height={isMobile ? 250 : 270} />
              <Skeleton width={isMobile ? 150 : 180} height={isMobile ? 250 : 270} />
              <Skeleton width={isMobile ? 150 : 180} height={isMobile ? 250 : 270} />
              <Skeleton width={isMobile ? 150 : 180} height={isMobile ? 250 : 270} />
              <Skeleton width={isMobile ? 150 : 180} height={isMobile ? 250 : 270} />
              <Skeleton width={isMobile ? 150 : 180} height={isMobile ? 250 : 270} />
              <Skeleton width={isMobile ? 150 : 180} height={isMobile ? 250 : 270} />
              <Skeleton width={isMobile ? 150 : 180} height={isMobile ? 250 : 270} />
            </div>
            <br/>
            <br/>
            <Skeleton width={220} height={60}/>
          </div>
          <div className="movie__details">
            <div className="movie__details-genre">
              <Skeleton width={70} height={15}/><br/>
              <p>
                <Skeleton width={30} height={10}/>
              </p>
            </div>
            <div className="movie__homepage">
              <Skeleton width={70} height={15}/><br/>
              <p>
                <Skeleton width={30} height={10}/>
              </p>
            </div>
            <div className="movie__details-release">
              <Skeleton width={70} height={15}/><br/>
              <p>
                <Skeleton width={30} height={10}/>
              </p>
            </div>
            <div className="movie__details-status">
              <Skeleton width={70} height={15}/><br/>
              <p>
                <Skeleton width={30} height={10}/>
              </p>
            </div>
            <div className="movie__details-rating">
              <Skeleton width={70} height={15}/><br/>
                  <p>
                    <Skeleton width={30} height={10}/>
                  </p>
            </div>
            <div className="movie__details-budget">
              <Skeleton width={70} height={15}/><br/>
                  <p>
                    <Skeleton width={30} height={10}/>
                  </p>
            </div>
            <div className="movie__details-keywords">
              <Skeleton width={70} height={15}/><br/>
                <p>
                  <Skeleton width={30} height={10}/>
                </p>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default Loader;
