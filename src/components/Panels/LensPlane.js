import { useState, useEffect, useContext, useCallback } from 'react';
import './Panel.css';
import UnityApp from '../UnityApp/UnityApp';
import ParamContext from '../../context/ParamContext';
import ModelParameter from '../ModelParameter/ModelParameter';

const LensPlane = () => {
  // Access parameter context
  const { lensParams, setLensParams } = useContext(ParamContext);

  const [stringThetaE, setStringThetaE] = useState('');
  const [stringAxisRatio, setStringAxisRatio] = useState('');
  const [stringPositionAngle, setStringPositionAngle] = useState('');
  const [stringX0, setStringX0] = useState('');
  const [stringY0, setStringY0] = useState('');

  function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
  }

  const onChangeHandler = (event) => {
    switch (event.target.name) {
      case 'thetaE':
        setStringThetaE(event.target.value);
        break;
      case 'axisRatio':
        setStringAxisRatio(event.target.value);
        break;
      case 'positionAngle':
        setStringPositionAngle(event.target.value);
        break;
      case 'x0':
        setStringX0(event.target.value);
        break;
      case 'y0':
        setStringY0(event.target.value);
        break;
      default:
        break;
    }
  };

  const onSubmitHandler = (event) => {
    if (event.keyCode === 13) {
      try {
        let value = parseFloat(event.target.value);
        switch (event.target.name) {
          case 'thetaE':
            value = clamp(value, 0, 4);
            setStringThetaE(value.toFixed(2));
            // setThetaE(value);
            setLensParams({ ...lensParams, thetaE: value });
            break;
          case 'axisRatio':
            value = clamp(value, 0, 1);
            setStringAxisRatio(value.toFixed(2));
            // setAxisRatio(value);
            setLensParams({ ...lensParams, axisRatio: value });
            break;
          case 'positionAngle':
            value = clamp(value, 0, 360);
            setStringPositionAngle(value.toFixed(2));
            // setPositionAngle(value);
            setLensParams({ ...lensParams, positionAngle: value });
            break;
          case 'x0':
            value = clamp(value, -4, 4);
            setStringX0(value.toFixed(2));
            // setX0(value);
            setLensParams({ ...lensParams, x0: value });
            break;
          case 'y0':
            value = clamp(value, -4, 4);
            setStringY0(value.toFixed(2));
            // setY0(value);
            setLensParams({ ...lensParams, y0: value });
            break;
          default:
            break;
        }
      } catch (error) {
        console.log('Error: could not parse value');
      }
    }
  };

  useEffect(() => {
    setStringThetaE(lensParams.thetaE.toFixed(2));
  }, [lensParams.thetaE]);

  useEffect(() => {
    setStringAxisRatio(lensParams.axisRatio.toFixed(2));
  }, [lensParams.axisRatio]);

  useEffect(() => {
    setStringPositionAngle(lensParams.positionAngle.toFixed(2));
  }, [lensParams.positionAngle]);

  useEffect(() => {
    setStringX0(lensParams.x0.toFixed(2));
  }, [lensParams.x0]);

  useEffect(() => {
    setStringY0(lensParams.y0.toFixed(2));
  }, [lensParams.y0]);

  // For updating parameters coming from Unity
  const handleSetLensParams = useCallback(
    (thetaE, axisRatio, positionAngle, x0, y0) => {
      const newLensParams = { thetaE, axisRatio, positionAngle, x0, y0 };
      setLensParams(newLensParams);
    },
    [setLensParams]
  );

  return (
    <div className='plane-container'>
      <div className='model-parameters'>
        <p>Lens</p>
        <ModelParameter
          id='thetaE'
          text='Theta E'
          onChangeHandler={onChangeHandler}
          onSubmitHandler={onSubmitHandler}
          value={stringThetaE}
        />
        <ModelParameter
          id='axisRatio'
          text='Axis ratio'
          onChangeHandler={onChangeHandler}
          onSubmitHandler={onSubmitHandler}
          value={stringAxisRatio}
        />
        <ModelParameter
          id='positionAngle'
          text='Position angle'
          onChangeHandler={onChangeHandler}
          onSubmitHandler={onSubmitHandler}
          value={stringPositionAngle}
        />
        <ModelParameter
          id='x0'
          text='x0'
          onChangeHandler={onChangeHandler}
          onSubmitHandler={onSubmitHandler}
          value={stringX0}
        />
        <ModelParameter
          id='y0'
          text='y0'
          onChangeHandler={onChangeHandler}
          onSubmitHandler={onSubmitHandler}
          value={stringY0}
        />
      </div>

      <UnityApp
        name='Lens Plane'
        id='lens-plane'
        loaderUrl='LensPlane/Build/LensPlane.loader.js'
        dataUrl='LensPlane/Build/LensPlane.data'
        frameworkUrl='LensPlane/Build/LensPlane.framework.js'
        codeUrl='LensPlane/Build/LensPlane.wasm'
        gameObject='Lens Square'
        params={lensParams}
        paramMethods={[
          { name: 'thetaE', method: 'SetThetaEFromBrowser' },
          { name: 'axisRatio', method: 'SetAxisRatioFromBrowser' },
          { name: 'positionAngle', method: 'SetPositionAngleFromBrowser' },
          { name: 'x0', method: 'SetCenterXFromBrowser' },
          { name: 'y0', method: 'SetCenterYFromBrowser' },
        ]}
        lensParamsCallback={handleSetLensParams}
      />
    </div>
  );
};

export default LensPlane;
