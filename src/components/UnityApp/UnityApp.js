import React, { useState, useEffect, useCallback } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import './UnityApp.css';

const UnityApp = (props) => {
  const {
    unityProvider,
    sendMessage,
    isLoaded,
    loadingProgression,
    addEventListener,
    removeEventListener,
  } = useUnityContext({
    loaderUrl: props.loaderUrl,
    dataUrl: props.dataUrl,
    frameworkUrl: props.frameworkUrl,
    codeUrl: props.codeUrl,
  });

  // For loading the Unity canvas
  const [showUnity, setShowUnity] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loadingPercentage = Math.round(loadingProgression * 100);

  function handleClick() {
    setIsLoading(true);
    setShowUnity(true);
  }

  const dummyLensParamsCallback = useCallback(
    (thetaE, axisRatio, positionAngle, x0, y0) => {},
    []
  );

  const dummySourceParamsCallback = useCallback(
    (rSersic, nSersic, axisRatio, positionAngle, x0, y0) => {},
    []
  );

  // For updating parameters coming from Unity
  useEffect(() => {
    if (isLoaded) {
      const callback = props.lensParamsCallback
        ? props.lensParamsCallback
        : dummyLensParamsCallback;
      addEventListener('SetLensParams', callback);
      return () => removeEventListener('SetLensParams', callback);
    }
  }, [
    addEventListener,
    removeEventListener,
    props.lensParamsCallback,
    dummyLensParamsCallback,
    isLoaded,
  ]);

  // For updating parameters coming from Unity
  useEffect(() => {
    if (isLoaded) {
      const callback = props.sourceParamsCallback
        ? props.sourceParamsCallback
        : dummySourceParamsCallback;
      addEventListener('SetSourceParams', callback);
      return () => removeEventListener('SetLensParams', callback);
    }
  }, [
    addEventListener,
    removeEventListener,
    props.sourceParamsCallback,
    dummySourceParamsCallback,
    isLoaded,
  ]);

  // For sending browser values to Unity
  useEffect(() => {
    if (props.paramMethods && isLoaded) {
      for (let index = 0; index < props.paramMethods.length; index++) {
        const element = props.paramMethods[index];
        if (props.params[element.name]) {
          sendMessage(
            props.gameObject,
            element.method,
            props.params[element.name]
          );
        }
      }
    }
  }, [
    props.gameObject,
    props.params,
    props.paramMethods,
    isLoaded,
    sendMessage,
  ]);

  return (
    <div id={`unity-app-${props.id}`} className='unity-app'>
      <div className='unity-player'>
        {isLoading && !isLoaded && (
          <div className='loading-overlay'>
            <p>Loading... ({loadingPercentage}%)</p>
          </div>
        )}
        {showUnity ? (
          <Unity unityProvider={unityProvider} className='unity' />
        ) : (
          <button onClick={handleClick}>
            <FontAwesomeIcon icon={faCirclePlay} size='2x' />
          </button>
        )}
      </div>
    </div>
  );
};

export default UnityApp;
