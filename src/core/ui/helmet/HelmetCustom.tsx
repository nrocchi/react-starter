import PropTypes from 'prop-types'
import {APP_NAME} from 'src/core/constants/Constants'
import {Helmet} from 'react-helmet-async'
import {useTranslation} from 'react-i18next'
import {HelmetCustomProps} from './HelmetCustomTypes'

const HelmetCustom = ({title}: HelmetCustomProps) => {
  const {t} = useTranslation()

  return (
    <Helmet>
      <title>
        {title && `${title} | `}
        {APP_NAME}
      </title>
    </Helmet>
  )
}

HelmetCustom.propTypes = {
  title: PropTypes.string,
}

export default HelmetCustom
