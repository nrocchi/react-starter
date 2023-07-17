import {lazy, LazyExoticComponent, Suspense} from 'react'
import {Route, Navigate, Routes} from 'react-router-dom'
import LayoutPublic from 'src/core/components/layouts/LayoutPublic'
import LayoutDashboard from 'src/core/components/layouts/LayoutDashboard'
import LayoutSignIn from 'src/core/components/layouts/LayoutSignIn'
import LoaderLogo from 'src/core/ui/loader/LoaderLogo'
import Private from './Private'

const SuspenseLoader = (Component: LazyExoticComponent<() => JSX.Element>) =>
  function (props: any) {
    return (
      <Suspense fallback={<LoaderLogo />}>
        <Component {...props} />
      </Suspense>
    )
  }

const SignInPage = SuspenseLoader(
  lazy(() => import('../../pages/extra/auth/signin/SignIn')),
)
const SignUpPage = SuspenseLoader(
  lazy(() => import('../../pages/extra/auth/signup/SignUp')),
)
const ForgotPasswordPage = SuspenseLoader(
  lazy(() => import('../../pages/extra/auth/forgot/ForgotPassword')),
)
const CreatePasswordPage = SuspenseLoader(
  lazy(() => import('../../pages/extra/auth/create/CreatePassword')),
)
const ResetPasswordPage = SuspenseLoader(
  lazy(() => import('../../pages/extra/auth/reset/ResetPassword')),
)
const UsersPage = SuspenseLoader(
  lazy(() => import('../../pages/management/users/Users')),
)
const EditProfilePage = SuspenseLoader(
  lazy(() => import('../../pages/extra/profile/EditProfile')),
)
const EditPasswordPage = SuspenseLoader(
  lazy(() => import('../../pages/extra/profile/EditPassword')),
)
const Error404Page = SuspenseLoader(
  lazy(() => import('../components/status/Error404')),
)
const HomePage = SuspenseLoader(
  lazy(() => import('../../pages/dashboards/home/Home')),
)
const ExamplePage = SuspenseLoader(
  lazy(() => import('../../pages/dashboards/example/Example')),
)

const RoutesCustom = () => (
  <Routes>
    <Route element={<LayoutSignIn />}>
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="create-password/:token" element={<CreatePasswordPage />} />
      <Route path="reset-password/:token" element={<ResetPasswordPage />} />
    </Route>
    <Route
      element={
        <Private>
          <LayoutDashboard />
        </Private>
      }>
      <Route path="/" element={<Navigate to="dashboards/home" replace />} />
      <Route path="dashboards/home" element={<HomePage />} />
      <Route path="dashboards/example" element={<ExamplePage />} />
      <Route path="edit-profile" element={<EditProfilePage />} />
      <Route path="edit-password" element={<EditPasswordPage />} />
      <Route path="management/users" element={<UsersPage />} />
    </Route>
    <Route element={<LayoutPublic />}>
      <Route path="*" element={<Navigate to="error-404" replace />} />
      <Route path="error-404" element={<Error404Page />} />
    </Route>
  </Routes>
)

export default RoutesCustom
