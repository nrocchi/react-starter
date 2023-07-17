import {useRef, useState} from 'react'
import {Tooltip, Box, List, ListItem, ListItemText} from '@mui/material'
import frFlag from 'country-flag-icons/string/3x2/FR'
import gbFlag from 'country-flag-icons/react/3x2/GB'
import {FR, GB} from 'country-flag-icons/react/3x2'
import {useTranslation} from 'react-i18next'
import {useLanguage} from 'src/core/language/LanguageContext'
import PopoverCustom from 'src/core/ui/popover/PopoverCustom'
import {
  IconButtonStyled,
  ImageStyled,
  LanguageTitleStyled,
} from '../NavbarStyled'

const Language = () => {
  const ref = useRef<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const {getLanguage, changeLanguage} = useLanguage()
  const {t} = useTranslation()

  return (
    <>
      <Tooltip arrow title={t('Language switcher')}>
        <IconButtonStyled ref={ref} onClick={() => setOpen(true)}>
          {getLanguage.split('-')[0] === 'fr' ? (
            <FR title="France" />
          ) : (
            <GB title="Great Britain" />
          )}
        </IconButtonStyled>
      </Tooltip>
      <PopoverCustom
        onClose={() => setOpen(false)}
        open={open}
        anchorEl={ref.current}>
        <Box
          sx={{
            maxWidth: 240,
          }}>
          <LanguageTitleStyled color="text.primary">
            {t('Change the language')}
          </LanguageTitleStyled>
          <List
            sx={{
              p: 2,
            }}
            component="nav">
            <ListItem
              button
              selected={getLanguage.split('-')[0] === 'fr'}
              onClick={() => {
                changeLanguage({language: 'fr'})
                setOpen(false)
              }}>
              <FR title="France" width={20} />
              <ListItemText
                sx={{
                  pl: 1,
                }}
                primary={t('French')}
              />
            </ListItem>
            <ListItem
              button
              selected={getLanguage.split('-')[0] === 'en'}
              onClick={() => {
                changeLanguage({language: 'en'})
                setOpen(false)
              }}>
              <GB title="Great Britain" width={20} />
              <ListItemText
                sx={{
                  pl: 1,
                }}
                primary={t('English')}
              />
            </ListItem>
          </List>
        </Box>
      </PopoverCustom>
    </>
  )
}

export default Language
