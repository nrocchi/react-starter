import PropTypes from 'prop-types'
import {Button, List, ListItem} from '@mui/material'
import {useTranslation} from 'react-i18next'
import {useRef, useState} from 'react'
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone'
import {ButtonSelectOption, ButtonSelectProps} from './ButtonTypes'
import PopoverCustom from '../popover/PopoverCustom'
import Scrollbar from '../scrollbar/Scrollbar'

const ButtonSelect = ({
  all = false,
  allValue = 'All',
  color = 'primary',
  datas,
  handleSelect,
  size = 'medium',
  defaultValue,
  sx,
  variant = 'contained',
}: ButtonSelectProps) => {
  const {t} = useTranslation()
  const ref = useRef<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<ButtonSelectOption>(defaultValue)

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
        {t(
          selected.name
            ? selected.name
            : selected.value
            ? selected.value
            : selected.code,
        )}
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
                selected={selected === allValue}
                onClick={() => {
                  handleSelect(null)
                  setSelected(t(allValue))
                  setOpen(false)
                }}>
                {t(allValue)}
              </ListItem>
            ) : null}
            {datas?.map((data: ButtonSelectOption) => (
              <ListItem
                button
                selected={data.id === selected.id}
                key={data.id ? data.id : data.code}
                onClick={() => {
                  handleSelect(data)
                  setSelected(data)
                  setOpen(false)
                }}>
                {t(data.name ? data.name : data.value ? data.value : data.code)}
              </ListItem>
            ))}
          </List>
        </Scrollbar>
      </PopoverCustom>
    </>
  )
}

ButtonSelect.propTypes = {
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
  defaultValue: PropTypes.shape({
    id: PropTypes.number,
    code: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
  }),
  handleSelect: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large', PropTypes.string]),
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  variant: PropTypes.oneOf(['contained', 'outlined', 'text', PropTypes.string]),
}

export default ButtonSelect
