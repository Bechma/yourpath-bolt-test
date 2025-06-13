import { config } from '@tamagui/config/v3'
import { createTamagui } from '@tamagui/core'

const appConfig = createTamagui({
  ...config,
  themes: {
    ...config.themes,
    // Custom theme overrides
    light: {
      ...config.themes.light,
      background: '#ffffff',
      backgroundHover: '#f8f9fa',
      backgroundPress: '#f1f3f4',
      backgroundFocus: '#e8f0fe',
      color: '#1a1a1a',
      colorHover: '#333333',
      colorPress: '#000000',
      colorFocus: '#1a73e8',
      borderColor: '#e0e0e0',
      borderColorHover: '#d0d0d0',
      borderColorPress: '#c0c0c0',
      borderColorFocus: '#1a73e8',
      placeholderColor: '#9e9e9e',
    },
    dark: {
      ...config.themes.dark,
      background: '#121212',
      backgroundHover: '#1e1e1e',
      backgroundPress: '#2a2a2a',
      backgroundFocus: '#1a73e8',
      color: '#ffffff',
      colorHover: '#e0e0e0',
      colorPress: '#ffffff',
      colorFocus: '#ffffff',
      borderColor: '#333333',
      borderColorHover: '#444444',
      borderColorPress: '#555555',
      borderColorFocus: '#1a73e8',
      placeholderColor: '#757575',
    },
  },
})

export default appConfig

export type Conf = typeof appConfig

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}