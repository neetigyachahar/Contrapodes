import { FC } from 'react'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Theme, makeStyles } from "@material-ui/core/styles"
import {
    Box,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Typography
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TrendingFlatOutlinedIcon from '@material-ui/icons/TrendingFlatOutlined'
import Ellipsis from '../hoc/Ellipsis'
import MapSnippet from './MapSnippet'

export interface MapPairProps {
    place: google.maps.places.PlaceResult,
    antipode: google.maps.places.PlaceResult
}

const useStyles = makeStyles(({ spacing, palette, breakpoints }: Theme) => ({
    lstItem: {
        '& .MuiListItemAvatar-root': {
            minWidth: spacing(5)
        },
        [breakpoints.down('sm')]: {
            maxWidth: spacing(38)
        }
    },
    avatar: {
        width: spacing(4),
        height: spacing(4)
    },
    arrow: {
        color: palette.grey[700],
        fontSize: 'large',
        margin: spacing(0, 2),
        width: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [breakpoints.down('sm')]: {
            margin: spacing(0, 1),
            fontSize: 'medium'
        }
    },
    maps: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        [breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    }
}))

const MapPair: FC<MapPairProps> = ({ place, antipode }) => {
    const classes = useStyles()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Accordion
            TransitionProps={{ unmountOnExit: true }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <ListItem
                    dense
                    disableGutters
                    className={classes.lstItem}
                >
                    <ListItemAvatar >
                        <Avatar
                            alt={place.name}
                            src={place.icon}
                            className={classes.avatar}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Typography>
                            <Ellipsis mobileViewOnly >
                                {place.name ?? ''} 
                            </Ellipsis>
                        </Typography>}
                        {... (!isMobile ? {
                            secondary: <Box>
                                <Box>{place.formatted_address ?? ''}</Box>
                                <Box>
                                    {place.geometry?.location?.lat().toFixed(6)},&nbsp;
                                    {place.geometry?.location?.lng().toFixed(6)}
                                </Box>
                            </Box>
                        } : {})}
                    />
                </ListItem>
                <Box className={classes.arrow} >
                    <TrendingFlatOutlinedIcon />
                </Box>
                <ListItem
                    dense
                    disableGutters
                    style={{ width: '100%' }}
                    className={classes.lstItem}
                >
                    <ListItemAvatar>
                        <Avatar
                            alt={antipode.name}
                            src={antipode.icon}
                            className={classes.avatar}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Typography>
                            <Ellipsis mobileViewOnly >
                                {antipode.name ?? ''}
                            </Ellipsis>
                        </Typography>}
                        {... (!isMobile ? {
                            secondary: <Box>
                                <Box>{antipode.formatted_address ?? ''}</Box>
                                <Box>
                                    {antipode.geometry?.location?.lat().toFixed(6)},&nbsp;
                                    {antipode.geometry?.location?.lng().toFixed(6)}
                                </Box>
                            </Box>
                        } : {})}
                    />
                </ListItem>
            </AccordionSummary>
            <AccordionDetails>
                <Box className={classes.maps}>
                    <MapSnippet places={[place]} />
                    <MapSnippet places={[antipode]} />
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}
export default MapPair