import './App.css';
import Alert from './components/Alert/Alert';
import ParamProvider from './context/ParamProvider';
import LensPlane from './components/Panels/LensPlane';
import SourcePlane from './components/Panels/SourcePlane';
import ImagePlane from './components/Panels/ImagePlane';

function App() {
  return (
    <div className='app-container'>
      <Alert />
      <ParamProvider>
        <div className='panels'>
          <LensPlane />
          <SourcePlane />
          <ImagePlane />
        </div>
      </ParamProvider>
    </div>
  );
}

export default App;
