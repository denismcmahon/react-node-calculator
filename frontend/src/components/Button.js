import './Button.css';

function Button({ onClick, label, size }) {
    return (
        <div 
            onClick={onClick}
            className='button'
            data-size={size}
            data-label={label}
        >
            {label}
        </div>
    )
}

export default Button;