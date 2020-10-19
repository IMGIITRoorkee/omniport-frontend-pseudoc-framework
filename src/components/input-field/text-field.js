import React from 'react'
import { Form } from 'semantic-ui-react'

import Field from './field'

export default class TextField extends React.PureComponent {
  render () {
    const { handleChange, error = {error}} = this.props
    const { name, displayName, fieldAttribute, required, } = this.props.field
    const { maxLength } = fieldAttribute.maxLength
    return (
      <Field
        field={
          <Form.Input
            id={name}
            name={name}
            placeholder={displayName}
            maxLength={maxLength}
            onChange={(e, { name, value }) => handleChange(name, value)}
          />
        }
        label={displayName}
        error={error}
        required={required}
      />
    )
  }
}
