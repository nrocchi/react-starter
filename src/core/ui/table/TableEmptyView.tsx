import PropTypes from 'prop-types'
import {Card, Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'
import {TableEmptyViewProps} from './TableTypes'

const TableEmptyView = ({type}: TableEmptyViewProps) => {
  const {t} = useTranslation()

  return (
    <Card>
      <Typography
        sx={{
          py: 5,
        }}
        variant="h4"
        fontWeight="normal"
        color="text.secondary"
        align="center">
        {t(
          'Choose between table or grid view for displaying the {{ value }} list.',
          {value: t(type)},
        )}
      </Typography>
    </Card>
  )
}

TableEmptyView.propTypes = {
  type: PropTypes.string.isRequired,
}

export default TableEmptyView
