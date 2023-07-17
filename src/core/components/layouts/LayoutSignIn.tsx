import PropTypes from 'prop-types'
import {Outlet} from 'react-router-dom'
import {Box, styled} from '@mui/material'
import {LayoutPublicStyled} from './LayoutStyled'
import Footer from '../footer/Footer'
import {LayoutPublicProps} from './LayoutsTypes'
import Navbar from '../navbar/Navbar'

const ImageStyled = styled(Box)(() => ({
  backgroundImage: `url(${'/images/pictures/img.jpg'})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top right -200px',
  height: '100%',
}))

const LayoutSignIn = ({children}: LayoutPublicProps) => (
  <>
    <Navbar logo={+true} darkmode={+true} language={+true} />
    <Box display="flex" flex={1}>
      <ImageStyled sx={{display: {xs: 'none', md: 'flex'}, flex: 1}} />
      <LayoutPublicStyled logo={+true} darkmode={+true} language={+true}>
        {children || <Outlet />}
      </LayoutPublicStyled>
    </Box>
    <Footer sidebar={+false} />
  </>
)

LayoutSignIn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default LayoutSignIn
