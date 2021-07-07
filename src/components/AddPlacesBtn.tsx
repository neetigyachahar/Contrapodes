import { FC } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import {
    Box,
    TextField,
    InputAdornment
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(({ palette, breakpoints }: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        link: {
            display: 'block',
            width: '100%',
            maxWidth: breakpoints.values['md'],
            textDecoration: 'none'
        },
        searchBtn: {
            cursor: 'pointer',
            '& ::-webkit-input-placeholder': {
                color: palette.getContrastText('#ffffff')
            },
            '& :disabled': {
                cursor: 'pointer',
                pointerEvents: 'all !important'
            }
        }
    })
)

const AddPlacesBtn: FC = () => {
    const classes = useStyles()

    return (
        <Box m={2} className={classes.container}>
            <Link to="/AddPlaces" className={classes.link}>
                <TextField
                    className={classes.searchBtn}
                    variant="outlined"
                    placeholder="Search places..."
                    fullWidth
                    disabled
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Link>
        </Box>
    )
}

export default AddPlacesBtn