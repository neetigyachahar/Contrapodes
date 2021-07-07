import { FC } from 'react'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
const MAX_LENGTH = 16
export interface EllipsisProps {
    children: string
    maxLength?: number
    mobileViewOnly?: boolean
}
const Ellipsis: FC<EllipsisProps> = ({
    children,
    maxLength = MAX_LENGTH,
    mobileViewOnly = false
}) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    if (!children) return null
    const isEllipsisReqrd = children.length > maxLength
    let ellipsisedChilren = children;
    if ((isEllipsisReqrd && isMobile) ||
        (isEllipsisReqrd && !isMobile && !mobileViewOnly))
        ellipsisedChilren = `${children.substr(0, maxLength)}…`
    return (
        <>{ellipsisedChilren}</>)
}
export default Ellipsis