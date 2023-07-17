import {Link, Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'
import {FOOTER_LINK, FOOTER_LINK_TITLE} from 'src/core/constants/Constants'

const FooterLink = () => {
  const {t} = useTranslation()

  return (
    <Typography variant="subtitle1">
      {t('Crafted by')}{' '}
      <Link href={FOOTER_LINK} target="_blank" rel="noopener noreferrer">
        {FOOTER_LINK_TITLE}
      </Link>
    </Typography>
  )
}

export default FooterLink
