# React starter

React application using my [Express Starter](https://github.com/nrocchi/express-starter).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

- API Management with Axios
- Server state with React Query
- Client state with Context API & Redux Toolkit
- Router with React Router
- Forms with React Hook Form & Yup validation
- Real-time notifications with Socket.io
- Toast messages with Notistack
- Authentication with JWT Token
- Automatic re-connection with Refresh Token
- Users management with search, order, pagination and roles and statuses filters
- User invitation with mail or direct registration
- Multi languages with i18next & Browser language detector
- Custom MUI Theme with Styled Components
- Light & Dark mode
- Responsive charts with Apex Charts
- File upload drag and drop with React Dropzone
- Text editor with React Quill 
- Google Map integration
- Testing with React Testing Library
- Typescript integration
- and more features...

## Todo

- Write more tests for components with react-testing-library

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).\
Before installing, [download and install Node.js](https://nodejs.org/en/download/).\
Node.js 0.10 or higher is required.

### Cloning the repository

```shell
git clone https://github.com/nrocchi/react-starter.git
```

### Install packages

Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```shell
npm install
```

### Setup environment file

Create your `.env` local file based on the `.env.dist` file:\
Provide your api URL in the `.env` file.

```js
REACT_APP_API_URL=
# BUG FIXING FOR CRA/REACT-SCRIPTS & WEBPACK v5
GENERATE_SOURCEMAP=false
```

e.g. `REACT_APP_API_URL=http://localhost:4000`

### Start the application

Starting the app is done using the `npm run start` command:

```
npm run start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Sign In

You can use one of the 3 demo accounts:\
  - email: `superadmin@demo.com`
  - email: `admin@demo.com`
  - email: `user@demo.com`
  - password: `Password1`

## Available Scripts

In the project directory, you can run:

```
npm run test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```
npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```
npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Third-party libraries

- [Apex Charts](https://apexcharts.com/)
- [Axios](https://axios-http.com/fr/docs/intro)
- [Axios Mock Adapter](https://github.com/ctimmerm/axios-mock-adapter)
- [Country Flag Icons](https://gitlab.com/catamphetamine/country-flag-icons)
- [CLSX](https://github.com/lukeed/clsx)
- [Date FNS](https://date-fns.org/)
- [Date FNS Timezone](https://github.com/marnusw/date-fns-tz)
- [ESLint](https://eslint.org/docs/latest/)
- [Font Awesome](https://fontawesome.com/docs/web/use-with/react/)
- [Fontsource](https://fontsource.org/)
- [Google Maps React Wrapper](https://github.com/googlemaps/react-wrapper/)
- [I18next](https://www.i18next.com/)
- [I18next Browser Language Detector](https://github.com/i18next/i18next-browser-languageDetector)
- [JWT Decode](https://github.com/auth0/jwt-decode)
- [Lodash](https://lodash.com/docs/4.17.15)
- [Material Icons](https://mui.com/material-ui/material-icons/)
- [MUI](https://mui.com/)
- [Moment js](https://momentjs.com/docs/)
- [Notistack](https://notistack.com/getting-started)
- [NProgress](https://github.com/rstacruz/nprogress)
- [Prettier](https://prettier.io/)
- [React Countup](https://github.com/glennreyes/react-countup)
- [React Custom Scrollbars 2](https://github.com/RobPethick/react-custom-scrollbars-2)
- [React Dropzone](https://react-dropzone.js.org/)
- [React Helmet Async](https://github.com/staylor/react-helmet-async)
- [React Hook Form](https://react-hook-form.com/)
- [React-i18next](https://react.i18next.com/)
- [React Quill](https://github.com/zenoamaro/react-quill)
- [React Router](https://reactrouter.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Redux Toolkit](https://redux.js.org/introduction/getting-started)
- [Socket.io](https://socket.io/fr/docs/v4/client-api/)
- [Styled Components](https://styled-components.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Yup Validation](https://github.com/jquense/yup)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Contributors

The original author is [Nicolas Rocchi](https://github.com/nrocchi).