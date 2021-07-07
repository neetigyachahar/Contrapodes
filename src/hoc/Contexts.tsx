import { FC } from 'react'
import { PlacesProvider } from 'src/contexts/PlacesContext'
const Contexts: FC = ({ children }) => (
    <PlacesProvider>
        {children}
    </PlacesProvider>
)
export default Contexts