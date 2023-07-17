import React from 'react'
import {Theme} from '@mui/material'
import {LightTheme} from './LightTheme'
import {DarkTheme} from './DarkTheme'

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      gradients: {
        primary: string
        secondary: string
        success: string
        warning: string
        error: string
        info: string
        black: string
        green: string
        purple: string
        pink: string
        yellow: string
        brown: string
        blue1: string
        blue2: string
        blue3: string
        blue4: string
        blue5: string
        blue6: string
        orange1: string
        orange2: string
        orange3: string
        purple1: string
        purple3: string
        pink1: string
        pink2: string
        green1: string
        green2: string
        black1: string
        black2: string
      }
      shadows: {
        success: string
        error: string
        primary: string
        warning: string
        info: string
      }
      alpha: {
        white: {
          5: string
          10: string
          30: string
          50: string
          70: string
          100: string
        }
        trueWhite: {
          5: string
          10: string
          30: string
          50: string
          70: string
          100: string
        }
        black: {
          5: string
          10: string
          30: string
          50: string
          70: string
          100: string
        }
      }
      secondary: {
        lighter: string
        light: string
        main: string
        dark: string
      }
      primary: {
        lighter: string
        light: string
        main: string
        dark: string
      }
      success: {
        lighter: string
        light: string
        main: string
        dark: string
      }
      warning: {
        lighter: string
        light: string
        main: string
        dark: string
      }
      error: {
        lighter: string
        light: string
        main: string
        dark: string
      }
      info: {
        lighter: string
        light: string
        main: string
        dark: string
      }
      green: {
        lighter: string
        light: string
        main: string
        dark: string
      }
      pink: {
        lighter: string
        light: string
        main: string
        dark: string
      }
      purple: {
        lighter: string
        light: string
        main: string
        dark: string
      }
      yellow: {
        lighter: string
        light: string
        main: string
        dark: string
      }
      brown: {
        lighter: string
        light: string
        main: string
        dark: string
      }
    }
    general: {
      reactFrameworkColor: React.CSSProperties['color']
      borderRadiusSm: string
      borderRadiusMd: string
      borderRadius: string
      borderRadiusLg: string
      borderRadiusXl: string
    }
    sidebar: {
      background: React.CSSProperties['color']
      boxShadow: React.CSSProperties['color']
      width: string
      textColor: React.CSSProperties['color']
      dividerBg: React.CSSProperties['color']
      menuItemColor: React.CSSProperties['color']
      menuItemColorActive: React.CSSProperties['color']
      menuItemBg: React.CSSProperties['color']
      menuItemBgActive: React.CSSProperties['color']
      menuItemIconColor: React.CSSProperties['color']
      menuItemIconColorActive: React.CSSProperties['color']
      menuItemHeadingColor: React.CSSProperties['color']
    }
    header: {
      widthLogo: string
      heightLogo: string
      heightIcon: string
      background: React.CSSProperties['color']
      boxShadow: React.CSSProperties['color']
      textColor: React.CSSProperties['color']
    }
    headerPage: {
      boxShadow: React.CSSProperties['color']
    }
  }

  interface ThemeOptions {
    colors: Theme['colors']
    general: Theme['general']
    sidebar: Theme['sidebar']
    header: Theme['header']
    headerPage: Theme['headerPage']
  }

  interface Palette {
    gradients: {
      primary: string
      secondary: string
      success: string
      warning: string
      error: string
      info: string
      black: string
      green: string
      purple: string
      pink: string
      yellow: string
      brown: string
      blue1: string
      blue2: string
      blue3: string
      blue4: string
      blue5: string
      blue6: string
      orange1: string
      orange2: string
      orange3: string
      purple1: string
      purple3: string
      pink1: string
      pink2: string
      green1: string
      green2: string
      black1: string
      black2: string
    }
  }

  interface PaletteOptions {
    gradients: Palette['gradients']
  }

  interface BreakpointOverrides {
    // xxl: true
  }
}

const themeMap: {[key: string]: Theme} = {
  LightTheme,
  DarkTheme,
}

export function themeCreator(theme: string): Theme {
  return themeMap[theme]
}
