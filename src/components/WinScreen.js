import "./WinScreen.css";

const WinScreen = (props) => {
    return (
        <div className='winscreen-box'>
            <div className='box'>
                <span className='close-icon' onClick={props.handleClose}>x</span>
                {props.content}
            </div>
        </div>
    );
};

export default WinScreen;
