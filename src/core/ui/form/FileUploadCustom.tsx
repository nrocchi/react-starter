import PropTypes from 'prop-types'
import {
  Alert,
  Box,
  Divider,
  FormHelperText,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone'
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone'
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfTwoTone'
import InsertDriveFileTwoToneIcon from '@mui/icons-material/InsertDriveFileTwoTone'
import {Controller} from 'react-hook-form'
import {Trans, useTranslation} from 'react-i18next'
import {useState, useCallback, MouseEvent, useEffect} from 'react'
import {FileRejection, FileWithPath, useDropzone} from 'react-dropzone'
import formatBytes from 'src/core/utils/bytes'
import {getErrorMessage} from './FormUtils'
import {FileCustom, FileUploadCustomProps} from './FormTypes'
import ImageResponsive from '../image_responsive/ImageResponsive'
import LabelCustom from './LabelCustom'
import {UploadAvatarStyled, UploadBoxStyled} from './FormStyled'

const FileUploadCustom = <T,>({
  accept = 'image/jpeg, image/png, application/pdf', // MIME TYPES
  color = 'primary',
  control,
  error,
  label,
  maxFiles = 2,
  maxSize = 3000000,
  minSize = 0,
  multiple = false,
  name,
  noLabel = false,
  required = false,
  setValue,
  sx,
  watch,
}: FileUploadCustomProps<T>) => {
  const {t} = useTranslation()
  const theme = useTheme()
  const [files, setFiles] = useState<Array<FileCustom>>(watch(name))
  const [uploadErrors, setUploadErrors] = useState<Array<FileRejection>>(null)
  const [loaded, setLoaded] = useState<boolean>(false)

  // DRAG & DROP CALLBACK FUNCTION
  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      // ***** NO ACCEPTED FILES *****
      // ADD MODE : WE SET THE VALUE OF REACT HOOK FORM AND THE FILES STATE TO NULL
      // EDIT MODE : WE KEEP THE CURRENT VALUE OF REACT HOOK FORM AND
      //             WE SET THE FILES STATE WITH THE CURRENT VALUE OF REACT HOOK FORM
      //             (WATCH(NAME) FOR THE JS VALIDATION)
      if (!acceptedFiles.length) {
        setFiles(files || null)
        setValue(name, files || null, {shouldValidate: true})
      } else if (multiple) {
        // ***** ACCEPTED FILES WITH MULTIPLE UPLOAD *****
        // WE LOOP ON THE ACCEPTED FILES DRAGGED FROM REACT DROPZONE (TYPE: FILE JS)
        // AND WE CREATE OUR CUSTOM FILES ARRAY TO UPLOAD
        const filesCustom: Array<FileCustom> = []

        acceptedFiles.forEach((file: FileWithPath) => {
          const fileCustom: FileCustom = {
            base64: null,
            name: '',
            path: '',
            preview: '',
            size: 0,
          }

          // WE SET ALL THE INFOS FROM THE FILE TYPE JS
          // AND WE CREATE THE BLOB PREVIEW
          fileCustom.name = file.name
          fileCustom.path = file.path
          fileCustom.size = file.size
          fileCustom.preview = URL.createObjectURL(file)

          // WE CREATE THE BASE64
          setLoaded(false)
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onloadend = () => {
            fileCustom.base64 = reader.result
            setLoaded(true)
          }

          // WE PUSH OUR CUSTOM FILE TO OUR CUSTOM FILES ARRAY
          filesCustom.push(fileCustom)
        })

        // FOR MULTIPLE UPLOAD WE CONCAT OUR NEW CUSTOM FILES ARRAY TO THE CURRENT FILES STATE
        // OR IF FILES STATE IS EMPTY WE ONLY SET THE NEW CUSTOM FILES ARRAY
        const newFiles =
          (!!files?.length && [...files].concat(filesCustom)) || filesCustom

        // WE SET THE FILES STATE
        // AND THE VALUE OF REACT HOOK FORM TO HANDLE THE FORM VALIDATION
        setFiles(newFiles)
        setValue(name, newFiles, {shouldValidate: true})
      } else {
        // ***** ACCEPTED FILES WITH SINGLE UPLOAD *****
        // WE CREATE OUR CUSTOM FILES TO UPLOAD BASED ON THE ACCEPTED FILES
        // DRAGGED FROM REACT DROPZONE (TYPE: FILE JS)
        const fileCustom: FileCustom = {
          base64: null,
          name: '',
          path: '',
          preview: '',
          size: 0,
        }

        // WE SET ALL THE INFOS FROM THE FILE TYPE JS
        // AND WE CREATE THE BLOB PREVIEW
        fileCustom.name = acceptedFiles[0].name
        fileCustom.path = acceptedFiles[0].path
        fileCustom.size = acceptedFiles[0].size
        fileCustom.preview = URL.createObjectURL(acceptedFiles[0])

        // WE CREATE THE BASE64
        const reader = new FileReader()
        reader.readAsDataURL(acceptedFiles[0])
        reader.onloadend = () => {
          fileCustom.base64 = reader.result
          setLoaded(true)
        }

        // WE SET THE FILES STATE WITH OUR CUSTOM FILE
        // AND WE SET THE VALUE OF REACT HOOK FORM TO HANDLE THE FORM VALIDATION
        setFiles([fileCustom])
        setValue(name, [fileCustom], {shouldValidate: true})
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
    },
    [files],
  )

  // WE UPDATE THE VALUE OF REACT HOOK FORM WHEN THE BASE64 IS LOADED
  // CAUSE THE FILEREADER IS ASYNCHRONOUS
  useEffect(() => {
    if (files) {
      setValue(name, files, {shouldValidate: true})
    }
  }, [loaded])

  // CUSTOM FUNCTION FOR THE REACT DROPZONE VALIDATOR
  const fileExistsValidator = (file: File) => {
    const existingFile = files?.find((item) => item.name === file.name)
    if (existingFile) {
      return {
        code: 'file-exists',
        message: 'File already exists.',
      }
    }
    return null
  }

  // REMOVE A FILE AND HIS PREVIEW FROM THE FILES STATE
  const handleDelete = (
    e: MouseEvent<HTMLButtonElement>,
    file: FileCustom,
  ): void => {
    e.preventDefault()
    setUploadErrors(null)

    const newFiles = [...files]
    newFiles.splice(newFiles.indexOf(file), 1)

    if (newFiles.length > 0) {
      setFiles(newFiles)
      setValue(name, newFiles, {shouldValidate: true})
    } else {
      setFiles(null)
      setValue(name, null, {shouldValidate: true})
    }
  }

  // DISPLAY THE FILES PREVIEW
  const thumbs = files?.map((file) => {
    const ext = file.name && file.name.substr(file.name.lastIndexOf('.') + 1)
    return (
      <ListItem disableGutters key={file.name}>
        {ext === 'jpg' || ext === 'jpeg' || ext === 'png' ? (
          <ImageResponsive
            maxWidth={50}
            src={file.preview}
            alt={file.name}
            sx={{
              marginRight: 2,
              borderRadius: theme.general.borderRadius,
            }}
          />
        ) : ext === 'pdf' ? (
          <UploadAvatarStyled color={color} variant="rounded" sx={{mr: 2}}>
            <PictureAsPdfTwoToneIcon />
          </UploadAvatarStyled>
        ) : (
          <UploadAvatarStyled color={color} variant="rounded" sx={{mr: 2}}>
            <InsertDriveFileTwoToneIcon />z
          </UploadAvatarStyled>
        )}
        <ListItemText primary={file.name} />
        {file.size && (
          <Box mr={2}>
            <b>{formatBytes(file.size)}</b>
          </Box>
        )}
        <Tooltip title={t('Delete')} arrow>
          <IconButton color="error" onClick={(e) => handleDelete(e, file)}>
            <DeleteTwoToneIcon />
          </IconButton>
        </Tooltip>
      </ListItem>
    )
  })

  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    accept,
    minSize,
    maxSize,
    maxFiles,
    multiple,
    validator: fileExistsValidator,
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
            <UploadBoxStyled {...getRootProps()} color={color}>
              <input {...getInputProps({onChange})} />
              {isDragAccept && (
                <>
                  <UploadAvatarStyled
                    bgcolor={theme.colors.success.light}
                    variant="rounded">
                    <CheckTwoToneIcon />
                  </UploadAvatarStyled>
                  <Typography
                    sx={{
                      mt: 2,
                    }}>
                    {t('You can drop your files here')}
                  </Typography>
                </>
              )}
              {isDragReject && (
                <>
                  <UploadAvatarStyled
                    bgcolor={theme.colors.error.light}
                    variant="rounded">
                    <CloseTwoToneIcon />
                  </UploadAvatarStyled>
                  <Typography
                    sx={{
                      mt: 2,
                    }}>
                    {t('Some files are not allowed')}
                  </Typography>
                </>
              )}
              {!isDragActive && (
                <>
                  <UploadAvatarStyled color={color} variant="rounded">
                    <CloudUploadTwoToneIcon />
                  </UploadAvatarStyled>
                  <Typography
                    sx={{
                      mt: 2,
                    }}>
                    {t('You can drag & drop your files here')}
                  </Typography>
                </>
              )}
            </UploadBoxStyled>
          </>
        )}
      />
      {files?.length > 0 && (
        <>
          <Alert
            sx={{
              py: 0,
              mt: 2,
            }}
            severity="success">
            <Trans i18nKey="uploaded" count={files?.length}>
              You have uploaded 1 file!
            </Trans>
          </Alert>
          <Divider
            sx={{
              mt: 2,
            }}
          />
          {thumbs && <List disablePadding>{thumbs}</List>}
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

FileUploadCustom.propTypes = {
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
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  noLabel: PropTypes.bool,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  watch: PropTypes.func.isRequired,
}

export default FileUploadCustom
