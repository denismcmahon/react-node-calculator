import './Display.css';

function Display({ operations }) {
    return (
        <div className='display'>
            <div className='operation-display'>
                { operations }
            </div>
        </div>
    )
}

export default Display;