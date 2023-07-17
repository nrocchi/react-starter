import {Tooltip} from '@mui/material'
import {ChangeEventHandler, useContext} from 'react'
import {useTranslation} from 'react-i18next'
import {ThemeContext} from 'src/core/theme/ThemeContext'
import {DarkModeStyled} from '../NavbarStyled'

const DarkMode = () => {
  const {currentTheme, changeTheme} = useContext(ThemeContext)
  const {t} = useTranslation()

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (): void => {
    changeTheme(currentTheme === 'LightTheme' ? 'DarkTheme' : 'LightTheme')
  }

  return (
    <Tooltip
      arrow
      title={currentTheme === 'LightTheme' ? t('Dark mode') : t('Light mode')}>
      <DarkModeStyled
        checked={currentTheme !== 'LightTheme'}
        onChange={handleOnChange}
        color="primary"
      />
    </Tooltip>
  )
}

export default DarkMode
