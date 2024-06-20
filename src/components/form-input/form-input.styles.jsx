import styled, { css } from 'styled-components';

const subColor = 'grey';
const mainColor = 'black';

/**
 * The css fimctopm allows you to define a block of css styles once and reuse it across multiple stled components
 * By encapsulating related styles within a css block, your styled-components become more readable and easier to maintain
 */
const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;

/**
 * ${({ shrink }) => shrink && shrinkLabelStyles};
 * It allows you to dinamically inject CSS based on JavaScript expressions
 * shrink is a prop passed to the FormInputLabel component
 */
export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
  ${({ shrink }) => shrink && shrinkLabelStyles};
`;

/**
 * & refers to the current selector, which in this case is input
 * :focus is a pseudo-class in css that applies when an element is focused(eg clilced into or selected )
 * 
 *  &:focus ~ ${FormInputLabel}
 * 
 *  &:focus -> targets the input element when it is focused
 * ${FormInputLabel} -> it select the formInputLabel component
 * 
 *  Purpose, when the input element receive focus( &:focus ) this rule applies styles to the formInputLabel. 
 * It means if the <Input> is focused (for example, clicked on by the user),
 *  the FormInputLabel component that follows it (~ ${FormInputLabel}) will apply the styles defined in shrinkLabelStyles. 
 */
export const Input = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ ${FormInputLabel} {
    ${shrinkLabelStyles};
  }
`;

/**
 * The CSS rule input[type='password'] wiithin the Group styled component means that this specific style will be applied to 
 * all input elements of type password that are descendants of Group componet
 * 
 */
export const Group = styled.div`
  position: relative;
  margin: 45px 0;

  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;