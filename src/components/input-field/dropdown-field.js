import React from 'react'
import { Dropdown } from 'semantic-ui-react'

import Field from './field'

export default class DropdownField extends React.PureComponent {
  render () {
    const { handleChange, value, error = { error } } = this.props
    const { name, displayName, fieldAttribute, required } = this.props.field
    return (
      <Field
        field={
          <Dropdown
            id={name}
            name={name}
            placeholder={displayName}
            options={fieldAttribute.choices.map(choice => {
              return {
                key: choice.value,
                value: choice.value,
                text: choice.name
              }
            })}
            onChange={(e, { name, value }) => handleChange(name, value)}
            value={
              value ? value : fieldAttribute.multipleSelectionAllowed ? [] : ''
            }
            multiple={fieldAttribute.multipleSelectionAllowed}
            selection
            search
            fluid
          />
        }
        label={displayName}
        required={required}
        error={error}
      />
    )
  }
}
