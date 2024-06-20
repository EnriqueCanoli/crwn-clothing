import { BaseButton, GoogleSignInButton, InvertedButton } from './button.styles.jsx'
/**
 * Easier Refactoring: If the class names need to change (e.g., google-sign-in to btn-google-sign-in), you only need to update the mapping object, not every component that uses the class.
 * Controlled Values: Using a mapping object ensures that only valid class names are used. If you directly use buttonType, there's a risk of typos or invalid values being passed, leading to broken or missing styles.
 * Centralized Mapping: By defining the mappings in one place (BUTTON_TYPE_CLASSES), it's easier to see and manage which button types are available and what classes they correspond to.
 */
export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}

/**This is an example of using an object in JS with dynamic keys.
 * [] this notatio, in JS allows you to use the value of a variable as the key in an object
 * [buttonType] is used to access the value in this object using the key stored in the buttonType
 * An arrow function with an expression directly after the arrow, it implicitly returns the result of that expression.
 * This is called an implicit return.
 */

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => 
    ({
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,

    }[buttonType]);

const Button = ({children, buttonType, ...otherProps}) => {
    const CustomButton = getButton(buttonType);
    return(
        <CustomButton {...otherProps}>
            {children}
        </CustomButton>
    )
}

export default Button;