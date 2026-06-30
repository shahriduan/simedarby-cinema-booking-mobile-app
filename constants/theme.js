import { MD3DarkTheme } from 'react-native-paper';

export default {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,

    // Overide default colors
    primary: '#2563EB',
    background: '#0A0F1E',
    surface: '#131929',
    surfaceVariant: '#1C2438',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    outline: '#2A3550'
  },
}