import './Panel.css';
import { useContext } from 'react';
import UnityApp from '../UnityApp/UnityApp';
import ParamContext from '../../context/ParamContext';

export default function ImagePlane() {
  // Access parameter context
  const { sourceParams, lensParams } = useContext(ParamContext);

  // Combine parameters into one object
  const params = {
    thetaE: lensParams.thetaE,
    lensQ: lensParams.axisRatio,
    lensPhi: lensParams.positionAngle,
    lensX0: lensParams.x0,
    lensY0: lensParams.y0,
    sersicRadius: sourceParams.sersicRadius,
    sourceQ: sourceParams.axisRatio,
    sourcePhi: sourceParams.positionAngle,
    sourceX0: sourceParams.x0,
    sourceY0: sourceParams.y0,
  };

  return (
    <div className='plane-container'>
      <UnityApp
        name='Image Plane'
        id='image-plane'
        loaderUrl='ImagePlane/Build/ImagePlane.loader.js'
        dataUrl='ImagePlane/Build/ImagePlane.data'
        frameworkUrl='ImagePlane/Build/ImagePlane.framework.js'
        codeUrl='ImagePlane/Build/ImagePlane.wasm'
        gameObject='Image Plane'
        params={params}
        paramMethods={[
          { name: 'thetaE', method: 'SetLensThetaEFromBrowser' },
          { name: 'lensQ', method: 'SetLensAxisRatioFromBrowser' },
          { name: 'lensPhi', method: 'SetLensPositionAngleFromBrowser' },
          { name: 'lensX0', method: 'SetLensCenterXFromBrowser' },
          { name: 'lensY0', method: 'SetLensCenterYFromBrowser' },
          { name: 'sersicRadius', method: 'SetSourceSersicRadiusFromBrowser' },
          { name: 'sourceQ', method: 'SetSourceAxisRatioFromBrowser' },
          { name: 'sourcePhi', method: 'SetSourcePositionAngleFromBrowser' },
          { name: 'sourceX0', method: 'SetSourceCenterXFromBrowser' },
          { name: 'sourceY0', method: 'SetSourceCenterYFromBrowser' },
        ]}
      />
    </div>
  );
}
