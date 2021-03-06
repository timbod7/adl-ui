import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { TypedFieldState, useTypedFieldState } from "../lib/fields/hooks";
import {STRING_FIELD, NUMBER_FIELD, BOOLEAN_FIELD, intFieldFns, NON_EMPTY_STRING_FIELD, JSON_FIELD} from "../lib/fields/primitive";

storiesOf("Primitive Fields", module)
  .add("String", () => {
    const fs = useTypedFieldState(STRING_FIELD);
    return renderTypedField(fs);
  })
  .add("Number", () => {
    const fs = useTypedFieldState(NUMBER_FIELD);
    return renderTypedField(fs);
  })
  .add("Boolean", () => {
    const fs = useTypedFieldState(BOOLEAN_FIELD);
    return renderTypedField(fs);
  })
  .add("Integer (1-5)", () => {
    const fs = useTypedFieldState(intFieldFns(1,5));
    return renderTypedField(fs);
  })
  .add("Json", () => {
    const fs = useTypedFieldState(JSON_FIELD);
    return renderTypedTextArea(fs);
  })
  .add("Simple Form", () => {
    const name = useTypedFieldState(NON_EMPTY_STRING_FIELD);
    const age = useTypedFieldState(intFieldFns(1,120));

    let message = "content ok";
    if (!name.isValid()) {
      message = "Name: " + name.validationError();
    } else if (!age.isValid()) {
      message = "Age: " + age.validationError();
    }
    return (
      <div>
        <div>
          <div>Name</div>
          <div>{renderRawTypedField(name)}</div>
        </div>
        <div>
          <div>Age</div>
          <div>{renderRawTypedField(age)}</div>
        </div>
        <p>{message}</p>
      </div>
    );
  });

/** Render a typed field with any validation error */
function renderTypedField<T>(fs: TypedFieldState<T>) {
  const validationError =  fs.validationError();
  const errlabel = validationError !== "" ? <StyledError>{validationError}</StyledError> : null;
  return (
  <div>
    <StyledInput value={fs.text} onChange={ev => fs.setText(ev.target.value)}/>
    {errlabel}
  </div>
  );
}
/** Render a typed multiline text area */
function renderTypedTextArea<T>(fs: TypedFieldState<T>) {
  const validationError =  fs.validationError();
  const errlabel = validationError !== "" ? <StyledError>{validationError}</StyledError> : null;
  return (
  <div>
    <StyledTextArea rows={10} cols={40} value={fs.text} onChange={ev => fs.setText(ev.target.value)}/>
    {errlabel}
  </div>
  );
}
/** Render a raw typed field */
function renderRawTypedField<T>(fs: TypedFieldState<T>) {
  return  <StyledInput value={fs.text} onChange={ev => fs.setText(ev.target.value)}/>;
}

const StyledInput = styled.input`
padding: 8px;
border: 1px solid #000;
font-size: 14px;
font-family: sans-serif;
border-radius: 4px;
`;
  
const StyledError = styled.div`
padding-left: calc(2* 8px);
font-family: sans-serif;
font-size: 14px;
color: #b71c1c;
`;

const StyledTextArea = styled.textarea`
padding: 8px;
border: 1px solid #000;
font-size: 14px;
font-family: sans-serif;
border-radius: 4px;
`;
