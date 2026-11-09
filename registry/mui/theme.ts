import { createTheme } from '@mui/material/styles';

/**
 * UI Farm tokens mapped onto a Material UI theme.
 *
 *   import { ThemeProvider } from '@mui/material/styles';
 *   import CssBaseline from '@mui/material/CssBaseline';
 *   import { uiFarmTheme } from './theme';
 *
 *   <ThemeProvider theme={uiFarmTheme}><CssBaseline />…</ThemeProvider>
 *
 * The palette is the same one the Tailwind and CSS builds use, so a screen
 * built with MUI components and one built with UI Farm components match.
 */
const tokens = {
  dark: {
    background: '#020817',
    paper: '#0f172a',
    surfaceMuted: '#1e293b',
    text: '#f8fafc',
    textSecondary: '#94a3b8',
    divider: 'rgba(148, 163, 184, 0.15)',
    primary: '#3b82f6',
    secondary: '#0ea5e9',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  light: {
    background: '#ffffff',
    paper: '#f8fafc',
    surfaceMuted: '#f1f5f9',
    text: '#0f172a',
    textSecondary: '#64748b',
    divider: 'rgba(15, 23, 42, 0.1)',
    primary: '#2563eb',
    secondary: '#0284c7',
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
  },
};

const base = {
  shape: { borderRadius: 12 },
  typography: {
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
    button: { textTransform: 'none' as const, fontWeight: 500 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, paddingInline: 20, paddingBlock: 9 },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small' as const, variant: 'outlined' as const },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { borderRadius: 12 } },
    },
    MuiPaper: {
      styleOverrides: { rounded: { borderRadius: 16 } },
    },
    MuiTableCell: {
      styleOverrides: {
        head: { textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.06em' },
      },
    },
  },
};

export const uiFarmTheme = createTheme({
  ...base,
  palette: {
    mode: 'dark',
    primary: { main: tokens.dark.primary },
    secondary: { main: tokens.dark.secondary },
    success: { main: tokens.dark.success },
    warning: { main: tokens.dark.warning },
    error: { main: tokens.dark.error },
    background: { default: tokens.dark.background, paper: tokens.dark.paper },
    text: { primary: tokens.dark.text, secondary: tokens.dark.textSecondary },
    divider: tokens.dark.divider,
  },
});

export const uiFarmLightTheme = createTheme({
  ...base,
  palette: {
    mode: 'light',
    primary: { main: tokens.light.primary },
    secondary: { main: tokens.light.secondary },
    success: { main: tokens.light.success },
    warning: { main: tokens.light.warning },
    error: { main: tokens.light.error },
    background: { default: tokens.light.background, paper: tokens.light.paper },
    text: { primary: tokens.light.text, secondary: tokens.light.textSecondary },
    divider: tokens.light.divider,
  },
});
