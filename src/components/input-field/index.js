import React from 'react'

import TextField from './text-field'
import NumericField from './numeric-field'
import DropdownField from './dropdown-field'

export default class InputField extends React.PureComponent {
    renderField = () => {
      const { field, handleChange, error, value } = this.props
      const type = field.fieldAttribute.type

        switch (type) { 
            case 'text':
                return (
                    <TextField
                        field={field}
                        handleChange={handleChange}
                        error={error}
                        value={value}
                    />
                )
            
            case 'numeric':
                return(
                    <NumericField
                        field={field}
                        handleChange={handleChange}
                        error={error}
                        value={value}
                  />
                )

            case 'dropdown':
                return(
                    <DropdownField
                        field={field}
                        handleChange={handleChange}
                        error={error}
                        value={value}
                    />
                )

            default:
                // Default no support field
                return (
                    <NoField
                    field={field}
                    handleChange={handleChange}
                    error={error}
                    value={value}
                    />
                )
        }
    }
    render () {
        return this.renderField()
    }
}