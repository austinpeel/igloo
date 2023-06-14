import './Alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function Alert() {
  return (
    <div className='alert-container'>
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        size='1x'
        style={{ marginRight: '10px' }}
      />
      This page is under active development.
    </div>
  );
}
