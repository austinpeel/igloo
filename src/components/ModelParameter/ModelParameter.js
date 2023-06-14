import './ModelParameter.css';

const ModelParameter = ({
  id,
  text,
  onChangeHandler,
  onSubmitHandler,
  value,
}) => {
  return (
    <div className='input-field'>
      <label htmlFor={`${id}`}>{text}</label>
      <input
        type='text'
        id={`${id}`}
        name={`${id}`}
        onChange={onChangeHandler}
        onKeyDownCapture={onSubmitHandler}
        value={value}
      />
    </div>
  );
};

export default ModelParameter;
