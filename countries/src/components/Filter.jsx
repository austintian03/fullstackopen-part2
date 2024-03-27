const Filter = ( { searchTerm, onChange } ) => {
    return (
        <div>
            find countries <input value={searchTerm} onChange={onChange} />
        </div>
    )
}

export default Filter