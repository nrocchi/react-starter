import PropTypes from 'prop-types'
import {Outlet} from 'react-router-dom'
import {LayoutPublicStyled} from './LayoutStyled'
import Footer from '../footer/Footer'
import {LayoutPublicProps} from './LayoutsTypes'
import Navbar from '../navbar/Navbar'

const LayoutPublic = ({children}: LayoutPublicProps) => (
  <>
    <Navbar logo={+true} darkmode={+true} language={+true} />
    <LayoutPublicStyled logo={+true} darkmode={+true} language={+true}>
      {children || <Outlet />}
    </LayoutPublicStyled>
    <Footer sidebar={+false} />
  </>
)

LayoutPublic.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default LayoutPublic
