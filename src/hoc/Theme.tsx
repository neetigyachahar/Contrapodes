import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/deepPurple'

import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
})

const Theme: React.FC = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default Theme