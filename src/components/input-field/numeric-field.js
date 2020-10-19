import React from 'react'
import { Form } from 'semantic-ui-react'

import Field from './field'

export default class NumericField extends React.PureComponent {
  render () {
    const { handleChange, error = {error}} = this.props
    const { name, displayName, fieldAttribute, required, } = this.props.field
    const { max, min } = fieldAttribute
    return (
      <Field
        field={
          <Form.Input
            type='number'
            id={name}
            name={name}
            placeholder={displayName}
            maxvalue={max}
            minvalue={min}
            onChange={(e, { name, value }) => handleChange(name, value)}
          />
        }
        label={displayName}
        required={required}
        error={error}
      />
    )
  }
}
