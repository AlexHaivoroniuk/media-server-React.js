import React, { Fragment } from 'react';
import styles from './Input.scss';
import PropTypes from 'prop-types';

const Input = props => {
  const inputStyles = [styles.InputElement];
  let inputElements = {
    text: (
      <input
        className={inputStyles.join(' ')}
        value={props.value}
        {...props.elConfig}
        placeholder={props.placeholder}
        autoComplete="on"
        onChange={props.changed}
      />
    ),
    password: (
      <input
        type={props.type}
        className={inputStyles.join(' ')}
        value={props.value}
        {...props.elConfig}
        placeholder={props.placeholder}
        autoComplete="on"
        onChange={props.changed}
      />
    ),
    textarea: (
      <textarea
        className={inputStyles.join(' ')}
        value={props.value}
        placeholder={props.placeholder}
        {...props.elConfig}
        autoComplete="on"
        onChange={props.changed}
      />
    ),
    select: (
      <select
        className={inputStyles.join(' ')}
        value={props.value}
        {...props.elConfig}
        autoComplete="on"
        onChange={props.changed}
      >
        <option disabled value>
          {props.placeholder}
        </option>
        {props.options !== undefined
          ? props.options.map((el, idx) => (
              <option value={el.value} key={idx}>
                {el.displayValue}
              </option>
            ))
          : null}
      </select>
    ),
    checkbox: (
      <Fragment>
        <input
          type={props.type}
          value={props.value}
          {...props.elConfig}
          autoComplete="on"
          onChange={props.changed}
        />
        <span className={styles.Checkmark} />
      </Fragment>
    ),
    range: (
      <div className={styles.SliderContainer}>
        <input
          type={props.type}
          className={styles.Slider}
          value={props.value}
          min={props.min}
          max={props.max}
          {...props.elConfig}
          autoComplete="on"
          onChange={props.changed}
        />
      </div>
    )
  };
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>
        {props.label}
        {inputElements[props.type]}
      </label>
    </div>
  );
};

export default Input;

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  placeholder: PropTypes.string,
  changed: PropTypes.func.isRequired,
  min: PropTypes.string,
  max: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      displayValue: PropTypes.string.isRequired
    })
  ),
  elConfig: PropTypes.object
};
