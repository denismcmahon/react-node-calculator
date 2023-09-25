import './Button.css';

function Button({ label, size }) {
    return (
        <div 
            className='button'
            data-size={size}
        >
            {label}
        </div>
    )
}

export default Button;