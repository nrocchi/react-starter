import {useState, useRef} from 'react'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import {useTranslation} from 'react-i18next'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'
import PopoverCustom from 'src/core/ui/popover/PopoverCustom'
import ModalCustom from '../modal/ModalCustom'

const TableBulkActions = ({data, mutation, onSuccess, toggleView}) => {
  const {t}: {t: any} = useTranslation()
  const ref = useRef<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)

  const handleDeleteAll = (): void => {
    data.map((item: Record<string, any>) =>
      mutation.mutate(item, {
        onSuccess,
        onSettled: async () => {
          setOpenDelete(false)
        },
      }),
    )
  }

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flex={1}
        pl={toggleView === 'grid' ? 1 : 3}
        pr={2}
        pt={2.79}
        pb={1.79}>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography variant="h5" color="text.secondary" mr={1} mb={1}>
            {t('Bulk actions')}:
          </Typography>
          <Button
            color="error"
            onClick={() => setOpenDelete(true)}
            sx={{
              mb: 1,
            }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained">
            {t('Delete')}
          </Button>
        </Box>
        <IconButton
          color="primary"
          onClick={() => setOpen(true)}
          ref={ref}
          sx={{
            ml: 2,
            mb: 1,
            p: 1,
          }}>
          <MoreVertTwoToneIcon />
        </IconButton>
        <PopoverCustom
          onClose={() => setOpen(false)}
          open={open}
          anchorEl={ref.current}>
          <List>
            <ListItem button onClick={() => setOpenDelete(true)}>
              {t('Bulk delete selected')}
            </ListItem>
          </List>
        </PopoverCustom>
      </Box>

      <ModalCustom
        open={openDelete}
        maxWidth="sm"
        onClose={() => setOpenDelete(false)}
        sx={{textAlign: 'center'}}>
        <>
          <Typography variant="h4" textAlign="center" sx={{mb: 3}}>
            {t('Do you want to permanently delete these users?')}
          </Typography>
          <Button
            color="error"
            size="large"
            variant="contained"
            sx={{
              display: {xs: 'block', sm: 'inline-flex'},
              mx: {xs: 'auto', sm: 2},
              mb: {xs: 2, sm: 0},
            }}
            startIcon={
              mutation.isLoading ? (
                <CircularProgress size="1rem" sx={{color: 'white'}} />
              ) : null
            }
            onClick={() => handleDeleteAll()}>
            {t('Delete')}
          </Button>
          <Button
            color="secondary"
            size="large"
            variant="outlined"
            sx={{
              display: {xs: 'block', sm: 'inline-flex'},
              mx: {xs: 'auto', sm: 2},
              mb: {xs: 0, sm: 0},
            }}
            onClick={() => setOpenDelete(false)}>
            {t('Cancel')}
          </Button>
        </>
      </ModalCustom>
    </>
  )
}

export default TableBulkActions
