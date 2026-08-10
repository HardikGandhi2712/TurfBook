function ButtonComponent({ onClickCallback, btnText, style }) {
    return (
        <button className={`action-btn ${style}`} onClick = {() => onClickCallback()} > {btnText} </button>
    );
}

export default ButtonComponent;