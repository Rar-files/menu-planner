import type { Config } from 'tailwindcss'
import { addDynamicIconSelectors } from '@iconify/tailwind'
import colors from 'tailwindcss/colors'

const theme = {
    primary: {
        light: colors.indigo[500],
        DEFAULT: colors.indigo[600],
        dark: colors.indigo[700],
    },
    secondary: {
        light: colors.amber[500],
        DEFAULT: colors.amber[600],
        dark: colors.amber[700],
    },
    text: {
        DEFAULT: '#161616',
        comments: '#545454',
        contrastText: '#fff',
    },
    bg: {
        DEFAULT: colors.zinc[900],
        box: colors.zinc[800],
    },
    docsMethod: {
        get: colors.green[500],
        post: colors.yellow[500],
        put: colors.blue[500],
        delete: colors.red[500],
    },
    success: colors.green[600],
    warn: colors.amber[600],
    error: colors.red[600],
}

const config: Config = {
    content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors: theme,
    },
    plugins: [
        // Iconify plugin
        addDynamicIconSelectors(),
    ],
}
export default config
