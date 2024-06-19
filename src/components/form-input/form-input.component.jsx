import { FormInputLabel, Input, Group } from './form-input.styles';
/**
 * spread operator  In the context of your React component, it is used to collect all the remaining props that are not explicitly destructured, and then spread them onto an element.
 */
const FormInput = ({ label, ...otherProps }) => {
    return (
        <Group>
            <Input {...otherProps} />
            {label && (
                <FormInputLabel shrink={otherProps.value.length}>
                    {label}
                </FormInputLabel>
            )}
        </Group>
    );
};


export default FormInput;