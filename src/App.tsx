import {SnackbarProvider} from 'notistack'
import {HelmetProvider} from 'react-helmet-async'
import {ThemeProviderCustom} from 'src/core/theme/ThemeContext'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'

import {CssBaseline, Zoom} from '@mui/material'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './core/auth/AuthContext'
import {SidebarProvider} from './core/components/sidebar/SidebarContext'
import {LanguageProvider} from './core/language/LanguageContext'
import {AppProvider} from './core/store/AppContext'
import ScrollTop from './core/hooks/useScrollTop'
import RoutesCustom from './core/router/RoutesCustom'
import 'nprogress/nprogress.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const App = () => (
  <ThemeProviderCustom>
    <SnackbarProvider
      maxSnack={10}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      preventDuplicate={true}
      TransitionComponent={Zoom}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <HelmetProvider>
            <SidebarProvider>
              <BrowserRouter>
                <LanguageProvider>
                  <AppProvider>
                    <ScrollTop />
                    <CssBaseline />
                    <RoutesCustom />
                  </AppProvider>
                </LanguageProvider>
              </BrowserRouter>
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </SidebarProvider>
          </HelmetProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SnackbarProvider>
  </ThemeProviderCustom>
)

export default App
