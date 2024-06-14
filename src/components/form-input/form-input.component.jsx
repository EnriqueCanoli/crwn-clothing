import './form-input.styles.scss'
/**
 * spread operator  In the context of your React component, it is used to collect all the remaining props that are not explicitly destructured, and then spread them onto an element.
 */
const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className='group'>
            <input className='form-input' {...otherProps} />
            {
                label && (
                    <label className={`${otherProps.value.length ? 'shrikn' : ''} form-input-label`}>{label}</label>
                )
            }
            
        </div>

    )
}

export default FormInput;