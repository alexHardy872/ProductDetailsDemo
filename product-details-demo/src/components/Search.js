const Search = ({executeSearch}) => {

    const onSearch = (e) => {
        executeSearch(e.target.value);
    }
    return(
        <div className='search-box'>
            <input
            className='search-bar' 
            type='text' 
            placeholder='SEARCH HERE...'
            onChange={(e) => onSearch(e)}/>
        </div>
    )
}

export default Search