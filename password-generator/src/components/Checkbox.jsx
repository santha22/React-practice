const Checkbox = ({ title, state, onChage }) => {
    return (
        <div>
            <input type='checkbox' onChange={onChage} checked={state} />
            <label>{title}</label>
        </div>
    )
}

export default Checkbox;