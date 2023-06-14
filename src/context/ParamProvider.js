import { useState } from 'react';
import ParamContext from './ParamContext';

const ParamProvider = ({ children }) => {
  const [lensParams, setLensParams] = useState({
    thetaE: 1.0,
    axisRatio: 0.75,
    positionAngle: 0.0,
    x0: 0.0,
    y0: 0.0,
  });

  const [sourceParams, setSourceParams] = useState({
    sersicRadius: 0.4,
    axisRatio: 0.9,
    positionAngle: 0.0,
    x0: 0.0,
    y0: 0.0,
  });

  return (
    <ParamContext.Provider
      value={{ lensParams, setLensParams, sourceParams, setSourceParams }}
    >
      {children}
    </ParamContext.Provider>
  );
};

export default ParamProvider;
