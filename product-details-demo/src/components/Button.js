import {Link} from 'react-router-dom'

const Button = ({text, action, big}) => {
    return (
        <div className='inline'>
            <Link to={'/'+action}>
                <button className={big ? 'big-btn btn' : 'norm-btn btn'}>{text}</button>
            </Link>
        </div>
    )
}

export default Button