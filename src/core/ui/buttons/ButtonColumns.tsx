import {useRef, useState} from 'react'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import {useTranslation} from 'react-i18next'
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone'
import {useApp} from 'src/core/store/AppContext'
import PopoverCustom from 'src/core/ui/popover/PopoverCustom'
import Scrollbar from 'src/core/ui/scrollbar/Scrollbar'
import {AppStateTable} from 'src/core/store/AppContextTypes'
import {ButtonSelectOption} from './ButtonTypes'

const ButtonColumns = ({
  datas,
  state,
  type,
}: {
  datas: Array<ButtonSelectOption>
  state: AppStateTable
  type: string
}) => {
  const theme = useTheme()
  const {t} = useTranslation()
  const {handleColumns} = useApp()
  const [open, setOpen] = useState<boolean>(false)
  const ref = useRef<HTMLButtonElement | null>(null)

  return (
    <>
      <Tooltip arrow title={t('Columns switcher')}>
        <IconButton
          sx={{
            background: alpha(theme.colors.primary.main, 0.1),
            '&:hover': {
              background: alpha(theme.colors.primary.main, 0.2),
            },
            mr: 1,
            py: 3,
            px: 1.5,
            height: 40,
          }}
          color="primary"
          ref={ref}
          onClick={() => setOpen(true)}>
          <TuneTwoToneIcon />
        </IconButton>
      </Tooltip>
      <PopoverCustom
        onClose={() => setOpen(false)}
        open={open}
        anchorEl={ref.current}>
        <Box
          sx={{
            p: 2,
            py: 1,
            background: theme.colors.alpha.black[5],
          }}>
          <Typography variant="h5">{t('Show columns')}</Typography>
          <Box display="flex" justifyContent="center" mt={1}>
            <Link
              display="flex"
              href="#"
              sx={{textAlign: 'center'}}
              onClick={() => {
                if (datas?.length !== state.columns.length) {
                  handleColumns(datas, type)
                } else {
                  handleColumns(null, type)
                }
              }}
              variant="caption">
              {datas?.length !== state.columns.length
                ? t('Show all')
                : t('Hide all')}
            </Link>
          </Box>
        </Box>
        <Divider />
        <Scrollbar autoHeightMax="250px" autoHeight>
          <List>
            {datas?.map((data: any) => (
              <ListItem
                sx={{height: 37}}
                button
                key={data.id ? data.id : data.code}
                onClick={() => {
                  handleColumns(data, type)
                }}>
                <Checkbox
                  size="small"
                  checked={
                    !!state.columns.find((column) => column.id === data.id)
                  }
                />
                {t(data.name ? data.name : data.value ? data.value : data.code)}
              </ListItem>
            ))}
          </List>
        </Scrollbar>
        <Divider />
        <Box m={1}>
          <Button
            color="secondary"
            onClick={() => {
              setOpen(false)
            }}
            fullWidth>
            {t('Close')}
          </Button>
        </Box>
      </PopoverCustom>
    </>
  )
}

export default ButtonColumns
