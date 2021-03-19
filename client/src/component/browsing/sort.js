import React from 'react'
import { TextField, MenuItem } from '@material-ui/core'


const SortComponent = (props) => {
    const [sort, setSort] =  React.useState('')

    const handelChange = (e) => {
      const value = e.target.value
      setSort(value)
      const newList1 = [...props.list].sort((a, b) => {
          switch (value) {
            case 'Age':
                return a.age - b.age
            case 'Location':
                return a.km - b.km
            case 'FameRating':
                return b.fameRating - a.fameRating
            case 'Tag':
                return b.tag - a.tag
            default:
                return undefined
          }
      })
      console.log(newList1)
      props.setList(newList1)
    }


  return (
    <React.Fragment>
      <TextField
        id='select'
        fullWidth
        label='Sort'
        value={sort || ''}
        select
        onClick={handelChange}
      >
        <MenuItem value='Age'>Age</MenuItem>
        <MenuItem value='Location'>Location</MenuItem>
        <MenuItem value='FameRating'>Fame Rating</MenuItem>
        <MenuItem value='Tag'>Tag</MenuItem>
      </TextField>
    </React.Fragment>
  )
}

export default SortComponent
