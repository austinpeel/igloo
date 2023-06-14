import './Panel.css';
import { useState, useEffect, useContext, useCallback } from 'react';
import UnityApp from '../UnityApp/UnityApp';
import ParamContext from '../../context/ParamContext';
import ModelParameter from '../ModelParameter/ModelParameter';

export default function SourcePlane() {
  // Access parameter context
  const { sourceParams, setSourceParams } = useContext(ParamContext);

  const [stringSersicR, setStringSersicR] = useState('');
  // const [stringSersicN, setStringSersicN] = useState('');
  const [stringAxisRatio, setStringAxisRatio] = useState('');
  const [stringPositionAngle, setStringPositionAngle] = useState('');
  const [stringX0, setStringX0] = useState('');
  const [stringY0, setStringY0] = useState('');

  // const [stringParams, setStringParams] = useState({
  //   sersicRadius: '0.5',
  //   axisRatio: '0.8',
  // });

  function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
  }

  const onChangeHandler = (event) => {
    switch (event.target.name) {
      case 'sersicRadius':
        setStringSersicR(event.target.value);
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
          case 'sersicRadius':
            value = clamp(value, 0, 3);
            setStringSersicR(value.toFixed(2));
            setSourceParams({ ...sourceParams, sersicRadius: value });
            break;
          case 'axisRatio':
            value = clamp(value, 0.1, 1);
            setStringAxisRatio(value.toFixed(2));
            setSourceParams({ ...sourceParams, axisRatio: value });
            break;
          case 'positionAngle':
            value = clamp(value, 0, 360);
            setStringPositionAngle(value.toFixed(2));
            setSourceParams({ ...sourceParams, positionAngle: value });
            break;
          case 'x0':
            value = clamp(value, -4, 4);
            setStringX0(value.toFixed(2));
            setSourceParams({ ...sourceParams, x0: value });
            break;
          case 'y0':
            value = clamp(value, -4, 4);
            setStringY0(value.toFixed(2));
            setSourceParams({ ...sourceParams, y0: value });
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
    setStringSersicR(sourceParams.sersicRadius.toFixed(2));
  }, [sourceParams]);

  useEffect(() => {
    setStringAxisRatio(sourceParams.axisRatio.toFixed(2));
  }, [sourceParams]);

  useEffect(() => {
    setStringPositionAngle(sourceParams.positionAngle.toFixed(2));
  }, [sourceParams.positionAngle]);

  useEffect(() => {
    setStringX0(sourceParams.x0.toFixed(2));
  }, [sourceParams.x0]);

  useEffect(() => {
    setStringY0(sourceParams.y0.toFixed(2));
  }, [sourceParams.y0]);

  // useEffect(() => {
  //   // setStringParams()
  //   // Object.keys(params.source).forEach((key) => {
  //   //   if (stringParams.hasOwnProperty(key)) {
  //   //     console.log(params.source[key]);
  //   //     const value = params.source[key].toFixed(2);
  //   //     setStringParams({ ...stringParams, key: value });
  //   //   }
  //   // });
  // }, [params.source]);

  // For updating parameters coming from Unity
  const handleSetSourceParams = useCallback(
    (sersicRadius, sersicIndex, axisRatio, positionAngle, x0, y0) => {
      setSourceParams({ sersicRadius, axisRatio, positionAngle, x0, y0 });
    },
    [setSourceParams]
  );

  return (
    <div className='plane-container'>
      <div className='model-parameters'>
        <ModelParameter
          id='sersicRadius'
          text='R Sersic'
          onChangeHandler={onChangeHandler}
          onSubmitHandler={onSubmitHandler}
          value={stringSersicR}
        />
        <ModelParameter
          id='axisRatio'
          text='Axis Ratio'
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
        name='Source Plane'
        id='source-plane'
        loaderUrl='SourcePlane/Build/SourcePlane.loader.js'
        dataUrl='SourcePlane/Build/SourcePlane.data'
        frameworkUrl='SourcePlane/Build/SourcePlane.framework.js'
        codeUrl='SourcePlane/Build/SourcePlane.wasm'
        gameObject='Source Square'
        params={sourceParams}
        paramMethods={[
          { name: 'sersicRadius', method: 'SetSersicRadiusFromBrowser' },
          { name: 'axisRatio', method: 'SetAxisRatioFromBrowser' },
          { name: 'positionAngle', method: 'SetPositionAngleFromBrowser' },
          { name: 'x0', method: 'SetCenterXFromBrowser' },
          { name: 'y0', method: 'SetCenterYFromBrowser' },
        ]}
        sourceParamsCallback={handleSetSourceParams}
      />
    </div>
  );
}
