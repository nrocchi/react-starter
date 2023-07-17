import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  List,
  ListItem,
  Typography,
  useTheme,
} from '@mui/material'
import {useTranslation} from 'react-i18next'
import {useRef, useState} from 'react'
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone'
import {ButtonSelectMultipleProps, ButtonSelectOption} from './ButtonTypes'
import PopoverCustom from '../popover/PopoverCustom'
import Scrollbar from '../scrollbar/Scrollbar'

const ButtonSelectMultiple = ({
  all = false,
  allValue = 'All',
  color = 'primary',
  datas,
  handleSelect,
  size = 'medium',
  defaultValue,
  sx,
  variant = 'contained',
}: ButtonSelectMultipleProps) => {
  const {t} = useTranslation()
  const theme = useTheme()
  const ref = useRef<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [selected, setSelected] =
    useState<Array<ButtonSelectOption>>(defaultValue)

  return (
    <>
      <Button
        color={color}
        endIcon={<ExpandMoreTwoToneIcon fontSize="small" />}
        onClick={() => setOpen(true)}
        ref={ref}
        size={size}
        sx={sx}
        variant={variant}>
        <Typography width={{xs: 210, sm: 240}} noWrap fontWeight="bold">
          {!selected.length
            ? t(allValue)
            : selected
                .map((option: ButtonSelectOption) =>
                  t(
                    option.name
                      ? option.name
                      : option.value
                      ? option.value
                      : option.code,
                  ),
                )
                .join(', ')}
        </Typography>
      </Button>
      <PopoverCustom
        onClose={() => setOpen(false)}
        open={open}
        anchorEl={ref.current}>
        <Scrollbar autoHeightMax="250px" autoHeight>
          <List>
            {all ? (
              <ListItem
                button
                selected={!!allValue && !selected.length}
                onClick={() => {
                  handleSelect([])
                  setSelected([])
                  setOpen(false)
                }}>
                {t(allValue)}
              </ListItem>
            ) : null}
            {datas?.map((data: ButtonSelectOption) => (
              <ListItem
                sx={{height: 37}}
                button
                selected={
                  typeof selected === 'string'
                    ? false
                    : !!selected.find((option) => option.id === data.id)
                }
                key={data.id ? data.id : data.code}
                onClick={() => {
                  if (
                    !selected.find(
                      (option: ButtonSelectOption) => option.id === data.id,
                    )
                  ) {
                    setSelected((previous) => [...previous, data])
                  } else {
                    setSelected(
                      selected.filter(
                        (option: ButtonSelectOption) => option.id !== data.id,
                      ),
                    )
                  }
                }}>
                <Checkbox
                  size="small"
                  checked={
                    typeof selected === 'string'
                      ? false
                      : !!selected.find((option) => option.id === data.id)
                  }
                />
                {t(data.name ? data.name : data.value ? data.value : data.code)}
              </ListItem>
            ))}
          </List>
        </Scrollbar>
        <Divider />
        <Box
          sx={{
            p: 0.5,
            textAlign: 'center',
            background: theme.colors.alpha.black[5],
          }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => {
              handleSelect(selected)
              setOpen(false)
            }}>
            {t('Send')}
          </Button>
        </Box>
      </PopoverCustom>
    </>
  )
}

ButtonSelectMultiple.propTypes = {
  all: PropTypes.bool,
  allValue: PropTypes.string,
  color: PropTypes.oneOf([
    'inherit',
    'primary',
    'secondary',
    'success',
    'error',
    'info',
    'warning',
    'pink',
    PropTypes.string,
  ]),
  datas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      code: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  defaultValue: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      code: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  handleSelect: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large', PropTypes.string]),
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  variant: PropTypes.oneOf(['contained', 'outlined', 'text', PropTypes.string]),
}

export default ButtonSelectMultiple
