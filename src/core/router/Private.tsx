import {useState} from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import {useAuth} from 'src/core/auth/AuthContext'
import SignIn from 'src/pages/extra/auth/signin/SignIn'
import LayoutSignIn from 'src/core/components/layouts/LayoutSignIn'
import {PrivateProps} from './RouterTypes'

const Private = ({children}: PrivateProps) => {
  const location = useLocation()
  const auth = useAuth()
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null,
  )

  // If we are not authenticated
  // We set the requested location from the router in the local state
  // and we display the SignIn Component
  // so we can reconnect directly in the current route
  if (!auth.isAuthenticated && auth.isInitialized) {
    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname)
    }

    return (
      <LayoutSignIn>
        <SignIn />
      </LayoutSignIn>
    )
  }

  // If we have a requested location we navigate to this location
  // After we reconnect form the SignIn Component
  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null)
    return <Navigate to={requestedLocation} />
  }

  return <>{children}</>
}

Private.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Private
