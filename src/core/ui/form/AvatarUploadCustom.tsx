import PropTypes from 'prop-types'
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Divider,
  FormHelperText,
  IconButton,
  Tooltip,
} from '@mui/material'
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import {Controller} from 'react-hook-form'
import {Trans, useTranslation} from 'react-i18next'
import {useState, useCallback, MouseEvent} from 'react'
import {FileRejection, useDropzone} from 'react-dropzone'
import {getErrorMessage} from './FormUtils'
import {AvatarUploadCustomProps} from './FormTypes'
import LabelCustom from './LabelCustom'
import {UploadButtonStyled, UploadDeleteIconStyled} from './FormStyled'

const AvatarUploadCustom = <T,>({
  accept = 'image/jpeg, image/png', // MIME TYPES
  color = 'primary',
  control,
  error,
  label,
  maxSize = 3000000,
  minSize = 0,
  name,
  noLabel = false,
  required = false,
  setValue,
  sx,
  user,
  watch,
}: AvatarUploadCustomProps<T>) => {
  const {t} = useTranslation()
  const [uploadErrors, setUploadErrors] = useState<Array<FileRejection>>(null)

  // DRAG & DROP CALLBACK FUNCTION
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      // WE CREATE THE BASE64
      const reader = new FileReader()
      reader.readAsDataURL(acceptedFiles[0])
      reader.onloadend = () => {
        // WE SET THE VALUE OF REACT HOOK FORM WITH THE BASE64
        setValue(name, reader.result, {shouldValidate: true})
      }
    }

    // ***** HANDLE ERRORS *****
    // NO FILE REJECTIONS = NO ERRORS
    if (!fileRejections.length) {
      setUploadErrors(null)
    } else {
      // FILE REJECTIONS = UPLOAD ERRORS
      // Self filtering to remove the duplicate error messages
      fileRejections = fileRejections.filter(
        (value: FileRejection, index: number, self: FileRejection[]) =>
          index ===
          self.findIndex(
            (fileRejection) =>
              fileRejection.errors[0].code === value.errors[0].code,
          ),
      )

      setUploadErrors(fileRejections)
    }
  }, [])

  // REMOVE A FILE
  // WE SET THE VALUE OF REACT HOOK FORM WITH NULL
  const handleDelete = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    setUploadErrors(null)
    setValue(name, null, {shouldValidate: true})
  }

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept,
    minSize,
    maxSize,
  })

  return (
    <Box sx={sx}>
      <LabelCustom
        error={error}
        label={label}
        name={name}
        noLabel={noLabel}
        required={required}
      />

      <Controller
        name={name}
        control={control}
        render={({field: {onChange}}) => (
          <>
            <Box sx={{mb: 3}}>
              <Badge
                overlap="circular"
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                badgeContent={
                  <Tooltip title={t('Upload')} arrow>
                    <UploadButtonStyled color={color} {...getRootProps()}>
                      <input {...getInputProps({onChange})} />
                      <IconButton>
                        <CloudUploadTwoToneIcon />
                      </IconButton>
                    </UploadButtonStyled>
                  </Tooltip>
                }>
                <Badge
                  invisible={!watch(name)}
                  overlap="circular"
                  anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                  badgeContent={
                    <Tooltip title={t('Delete')} arrow>
                      <UploadDeleteIconStyled
                        color="error"
                        onClick={(e) => handleDelete(e)}>
                        <DeleteTwoToneIcon />
                      </UploadDeleteIconStyled>
                    </Tooltip>
                  }>
                  <Avatar
                    {...getRootProps()}
                    sx={{width: 150, height: 150, fontSize: 50}}
                    variant="circular"
                    imgProps={{loading: 'lazy'}}
                    alt={user?.firstname}
                    src={watch(name) ? watch(name) : user?.firstname}
                  />
                </Badge>
              </Badge>
            </Box>
          </>
        )}
      />
      {watch(name) && acceptedFiles.length > 0 && (
        <>
          <Alert
            sx={{
              py: 0,
              mt: 2,
            }}
            severity="success">
            <Trans i18nKey="uploaded" count={1}>
              You have uploaded 1 file!
            </Trans>
          </Alert>
        </>
      )}
      {uploadErrors?.map((uploadError, index) => (
        <Box key={index}>
          <Alert
            sx={{
              py: 0,
              mt: 2,
            }}
            severity="error">
            {t(uploadError.errors[0].message)}
          </Alert>
          {index === uploadErrors.length - 1 ? (
            <Divider
              sx={{
                mt: 2,
              }}
            />
          ) : null}
        </Box>
      ))}
      {Boolean(error) && (
        <FormHelperText error>{getErrorMessage(error)}</FormHelperText>
      )}
    </Box>
  )
}

AvatarUploadCustom.propTypes = {
  accept: PropTypes.string,
  color: PropTypes.oneOf([
    'error',
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    PropTypes.string,
  ]),
  error: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  name: PropTypes.string.isRequired,
  noLabel: PropTypes.bool,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  user: PropTypes.object,
  watch: PropTypes.func.isRequired,
}

export default AvatarUploadCustom
