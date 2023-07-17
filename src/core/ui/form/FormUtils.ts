import {FieldError} from 'react-hook-form'
import {t} from 'i18next'

// validation examples
// const validation = yup.object().shape({
// /!\ case checkbox : null = error.message = translation key
// checkbox: yup.boolean().test('checkbox', null, (value) => value === true),
// editor: yup
//   .string()
//   .matches(/^((?!<p><br><\/p>).)*$/)
//   .required(),
// email: yup.string().email().max(255).required(),
// password: yup
// .string()
// .nullable()
// .transform((v, o) => (o === '' ? null : v))
// .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/, {
//   name: 'password',
// })
// .required(),
// radioGroup: yup.string().test('button', (value) => value !== ''),
// rating: yup.number().test('rating', (value) => value !== 0),
// select: yup.string().required(),
// selectMultiple: yup
//   .array()
//   .test('required', (value) => value.length > 0),
// switch: yup.boolean().test('button', (value) => value === true),
// terms: yup.boolean().test('checkbox', 'terms', (value) => value === true),
// slider: yup.number().test('slider', (value) => value >= 10 && value <= 90),
// slider2: yup
//   .array()
//   .test(
//     'slider',
//     (value: number[]) =>
//       value[0] >= 10 && value[0] <= 90 && value[1] >= 10 && value[1] <= 90,
//   ),
// upload: yup.array().nullable(true).required(),
// })

export const getErrorMessage = (
  error: FieldError,
  minValidation: number | null = null,
  maxValidation: number | null = null,
): string | null => {
  switch (error.type) {
    case 'button':
      return t(`* This button is required.`)
    case 'checkbox':
      return t('* This box is required.')
    case 'terms':
      return t('You must agree to our terms and conditions.')
    case 'date':
      return t('The date provided should be a valid date.')
    case 'email':
      return t('The email provided should be a valid email address.')
    case 'min':
      return t('This field must be at least {{value}} characters.', {
        value: minValidation,
      })
    case 'max':
      return t('This field must be at most {{value}} characters.', {
        value: maxValidation,
      })
    case 'password':
      return t(
        'Your password must contain at least 1 lowercase, 1 uppercase alphabetical character, 1 numeric character and 8 characters or longer.',
      )
    case 'rating':
      return t('* This rating is required.')
    case 'slider':
      return t('You must provide a value between {{start}} and {{end}}.', {
        start: minValidation,
        end: maxValidation,
      })
    case 'required':
      return t('* This field is required.')
    default:
      return t(error.message)
  }
}

export const getLabel = (value: string): string | null =>
  t('text.capitalize', {
    value,
  })

export const getPlaceholder = (
  value: string,
  multiple?: boolean,
): string | null =>
  `${multiple ? t('placeholder_other') : t('placeholder_one')} ${t(
    'text.lowercase',
    {
      value,
    },
  )}`
