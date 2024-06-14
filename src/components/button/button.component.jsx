import './button.styles.scss'
/**
 * Easier Refactoring: If the class names need to change (e.g., google-sign-in to btn-google-sign-in), you only need to update the mapping object, not every component that uses the class.
 * Controlled Values: Using a mapping object ensures that only valid class names are used. If you directly use buttonType, there's a risk of typos or invalid values being passed, leading to broken or missing styles.
 * Centralized Mapping: By defining the mappings in one place (BUTTON_TYPE_CLASSES), it's easier to see and manage which button types are available and what classes they correspond to.
 */
const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({children, buttonType, ...otherProps}) => {
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
            {children}
        </button>
    )
}

export default Button;