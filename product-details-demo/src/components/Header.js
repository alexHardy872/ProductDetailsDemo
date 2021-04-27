import knownIds from '../references/knownIds'
import { Link} from 'react-router-dom'

const Header = () => {
    return (
        <div className="theme-red sticky-header">
            <Link to='/'>
            <img className='inline  mke-logo pointer' src={knownIds.logoSrc} alt='MKE TOOL'></img>
            </Link>
        </div>
    )
}

export default Header