import React, { Fragment } from 'react';
import styles from './Input.scss';

const Input = (props) => {
    let inputElement = null;
    const inputStyles = [styles.InputElement]
    switch (props.type) {
        case ('text'):
            inputElement = (
                <input
                    className={inputStyles.join(' ')}
                    value={props.value}
                    {...props.elConfig}
                    placeholder={props.placeholder}
                    autoComplete="on"
                    onChange={props.changed}
                />
            )
            break;
        case ('textarea'):
            inputElement = (
                <textarea
                    className={inputStyles.join(' ')}
                    value={props.value}
                    placeholder={props.placeholder}
                    {...props.elConfig}
                    autoComplete="on"
                    onChange={props.changed}
                />
            )
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputStyles.join(' ')}
                    value={props.value}
                    {...props.elConfig}
                    autoComplete="on"
                    onChange={props.changed}
                >
                    <option disabled value>{props.placeholder}</option>
                    {
                        props.elConfig.options.map((el, idx) => (
                            <option
                                value={el.value}
                                key={idx}
                            >
                                {el.displayValue}
                            </option>
                        ))
                    }
                </select>
            )
            break;
        case ('checkbox'):
            inputElement = (
                <Fragment>
                    <input
                        type={props.type}
                        value={props.value}
                        {...props.elConfig}
                        autoComplete="on"
                        onChange={props.changed}
                    />
                    <span className={styles.Checkmark}></span>
                </Fragment>
            )
            break;
        case ('range'):
            inputElement = (
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
            break;

        default:
            inputElement = (
                <input
                    className={inputStyles.join(' ')}
                    autoComplete="on"
                    onChange={props.changed}
                />
            )
            break;
    }
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}
                {inputElement}
            </label>
        </div>
    )
}

export default Input
