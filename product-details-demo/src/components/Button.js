import {Link} from 'react-router-dom'

const Button = ({text}) => {
    return (
        <div className='inline'>
            <Link to={'/'+text}>
                <button className='big-btn pointer'>{text}</button>
            </Link>
        </div>
    )
}

export default Button