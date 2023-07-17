import PropTypes from 'prop-types'
import {Box, Card, Divider, useTheme} from '@mui/material'
import {CardCustomProps} from './CardTypes'

const CardCustom = ({
  header,
  headerBgColor,
  headerGradient,
  headerPadding = 2,
  content,
  contentBgColor,
  contentGradient,
  contentPadding = 2,
  fullHeight = true,
  footer,
  footerBgColor,
  footerGradient,
  footerPadding = 2,
  sx,
  sxContent,
  sxFooter,
  sxHeader,
}: CardCustomProps) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: fullHeight ? '100%' : 'auto',
        ...sx,
      }}>
      {header ? (
        <>
          <Box
            sx={{
              background: headerGradient,
              bgcolor: headerBgColor || theme.colors.alpha.black[5],
              p: headerPadding,
              ...sxHeader,
            }}>
            {header}
          </Box>
          <Divider />
        </>
      ) : null}
      {content ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            background: contentGradient,
            bgcolor: contentBgColor || theme.colors.alpha.white[100],
            p: contentPadding,
            ...sxContent,
          }}>
          {content}
        </Box>
      ) : null}
      {footer ? (
        <>
          <Divider />
          <Box
            sx={{
              background: footerGradient,
              bgcolor: footerBgColor || theme.colors.alpha.black[5],
              p: footerPadding,
              ...sxFooter,
            }}>
            {footer}
          </Box>
        </>
      ) : null}
    </Card>
  )
}

CardCustom.propTypes = {
  header: PropTypes.element,
  headerBgColor: PropTypes.string,
  headerGradient: PropTypes.string,
  headerPadding: PropTypes.number,
  content: PropTypes.element,
  contentBgColor: PropTypes.string,
  contentGradient: PropTypes.string,
  contentPadding: PropTypes.number,
  fullHeight: PropTypes.bool,
  footer: PropTypes.element,
  footerBgColor: PropTypes.string,
  footerGradient: PropTypes.string,
  footerPadding: PropTypes.number,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  sxContent: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  sxFooter: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  sxHeader: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
}

export default CardCustom
