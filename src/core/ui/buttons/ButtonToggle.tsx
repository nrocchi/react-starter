import {ToggleButtonGroup, ToggleButton} from '@mui/material'
import {useApp} from 'src/core/store/AppContext'
import {AppStateTable} from 'src/core/store/AppContextTypes'
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone'
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone'

const ButtonToggle = ({type, state}: {type: string; state: AppStateTable}) => {
  const {handleToggleView} = useApp()

  return (
    <ToggleButtonGroup
      value={state?.toggleView}
      exclusive
      onChange={(event, selected) => handleToggleView(event, selected, type)}>
      <ToggleButton disableRipple value="table">
        <TableRowsTwoToneIcon />
      </ToggleButton>
      <ToggleButton disableRipple value="grid">
        <GridViewTwoToneIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default ButtonToggle
