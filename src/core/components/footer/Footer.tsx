import PropTypes from 'prop-types'
import {memo} from 'react'
import FooterCopyright from './FooterCopyright'
import FooterLink from './FooterLink'
import {FooterStyled} from './FooterStyled'

const Footer = () => (
  <FooterStyled>
    <FooterCopyright />
    <FooterLink />
  </FooterStyled>
)

Footer.propTypes = {
  sidebar: PropTypes.number,
}

export default memo(Footer)
