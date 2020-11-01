import React from 'react'
import { DateInput } from 'semantic-ui-calendar-react'

import Field from './field'

export default class DateField extends React.PureComponent {
  render () {
    const { value, handleChange, error } = this.props
    const { name, displayName, required } = this.props.field
    return (
      <Field
        field={
          <DateInput
            id={name}
            name={name}
            placeholder={displayName}
            value={value ? value : ''}
            onChange={(e, { name, value }) => handleChange(name, value)}
            iconPosition='left'
          />
        }
        label={displayName}
        required={required}
        error={error}
      />
    )
  }
}
