import {Avatar, Box, IconButton, styled, Switch, TextField} from '@mui/material'
import {
  TextEditorStyledProps,
  TextFieldStyledProps,
  UploadAvatarStyledProps,
  UploadBoxStyledProps,
  UploadButtonStyledProps,
} from './FormTypes'

export const UploadBoxStyled = styled(Box)<UploadBoxStyledProps>(
  ({theme, color}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    outline: 'none',
    background: theme.colors.alpha.black[5],
    borderRadius: theme.general.borderRadius,
    border: `1px dashed ${theme.colors.alpha.black[30]}`,
    transition: theme.transitions.create(['border', 'background']),
    padding: theme.spacing(3),

    '&:hover': {
      background: theme.colors.alpha.white[100],
      borderColor: theme.colors[color].main,
    },
  }),
)

export const UploadAvatarStyled = styled(Avatar)<UploadAvatarStyledProps>(
  ({theme, bgcolor, color}) => ({
    backgroundColor: bgcolor || theme.colors[color].lighter,
    color: color ? theme.colors[color].main : theme.colors.alpha.trueWhite[100],
    width: '50px',
    height: '50px',
  }),
)

export const UploadButtonStyled = styled(Box)<UploadButtonStyledProps>(
  ({theme, color}) => ({
    '.MuiIconButton-root': {
      borderRadius: '100%',
      boxShadow: theme.colors.shadows[color],
      background: theme.colors[color].main,
      color: theme.colors.alpha.trueWhite[100],
      padding: theme.spacing(2),

      '&:hover': {
        background: theme.colors[color].dark,
      },
    },
  }),
)

export const UploadDeleteIconStyled = styled(IconButton)(({theme}) => ({
  borderRadius: '100%',
  background: theme.colors.error.main,
  color: theme.colors.alpha.trueWhite[100],
  padding: theme.spacing(1),

  '&:hover': {
    background: theme.colors.error.dark,
  },
}))

export const SwitchStyled = styled(Switch)(({theme}) => ({
  width: 46,
  height: 34,
  padding: theme.spacing(1, 0, 1, 0),
  '& .MuiSwitch-switchBase': {
    margin: '1px 0',
    padding: 0,
    transform: 'translateX(0px)',
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.colors.alpha.trueWhite,
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      },
    },
    '& .MuiSwitch-track': {
      opacity: 0.5,
    },
    '&.Mui-checked': {
      transform: 'translateX(14px)',
      width: 32,
      height: 32,
      backgroundColor: theme.palette.primary.main,
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}))

export const TextFieldStyled = styled(TextField)<TextFieldStyledProps>(
  ({theme, color}) => ({
    '.Mui-focused:hover fieldset': {
      borderColor: theme.colors[color].main,
    },
  }),
)

export const TextEditorStyled = styled(Box)<TextEditorStyledProps>(
  ({theme, color, error}) => ({
    marginTop: '16px',
    marginBottom: '8px',

    '& .quill': {
      marginTop: '8px',
    },

    '& .ql-editor': {
      minHeight: '200px',
      '&:focus': {
        borderColor: error ? theme.colors.error.main : theme.colors[color].main,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderBottomLeftRadius: theme.general.borderRadius,
        borderBottomRightRadius: theme.general.borderRadius,
      },
    },

    '& .ql-container.ql-snow': {
      borderColor: theme.colors.alpha.black[30],
      borderBottomLeftRadius: theme.general.borderRadius,
      borderBottomRightRadius: theme.general.borderRadius,
      fontSize: '14px',
    },

    '& .ql-toolbar.ql-snow': {
      borderColor: theme.colors.alpha.black[30],
      borderTopLeftRadius: theme.general.borderRadius,
      borderTopRightRadius: theme.general.borderRadius,

      '& button:hover, button:focus': {
        '& .ql-stroke': {
          fill: 'none',
          stroke: theme.colors[color].main,
        },

        '& .ql-fill': {
          fill: theme.colors[color].main,
          stroke: 'none',
        },

        '& .ql-picker': {
          color: theme.colors[color].main,
        },
      },

      '& button.ql-active': {
        '& .ql-stroke': {
          fill: 'none',
          stroke: theme.colors[color].main,
        },

        '& .ql-fill': {
          fill: theme.colors[color].main,
          stroke: 'none',
        },

        '& .ql-picker': {
          color: theme.colors[color].main,
        },
      },

      '& .ql-picker-label:hover': {
        color: theme.colors[color].main,
        '& .ql-stroke': {
          fill: 'none',
          stroke: theme.colors[color].main,
        },
      },

      '& .ql-picker-label.ql-active': {
        color: theme.colors[color].main,
        '& .ql-stroke': {
          fill: 'none',
          stroke: theme.colors[color].main,
        },
      },

      '& .ql-picker-item:hover': {
        color: theme.colors[color].main,
      },
    },

    '&:hover': {
      '& .ql-toolbar.ql-snow, .ql-container.ql-snow': {
        borderColor: theme.colors.alpha.black[50],
      },
    },

    '& .ql-snow a': {
      color: theme.colors[color].main,
    },
  }),
)
