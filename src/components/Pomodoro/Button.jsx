

const Button = ({ title, _callback, activeClass }) => {
    return (
        <button className={activeClass} onClick={_callback}>{title}</button>
    )

}
export default Button