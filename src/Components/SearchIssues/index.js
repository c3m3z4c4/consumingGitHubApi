import React, { useState, useEffect } from 'react'

const SearchIssues = () => {

    const [search, setSearch] = useState('');
    const [text, setText] = useState("")
    const [resultado, setResultado] = useState([]);

    useEffect(() => {

        const fetchingData = async () => {
            const data = await fetch(`https://api.github.com/search/issues?q=${search}`)
            const issues = await data.json();
            console.log(issues.items)
            return issues.items
            
        }
        fetchingData().then((response)=>{setResultado(response.items)});
    }, [search])

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(text)
    }

    const handleChange = e => { setText(e.target.value) }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="Search" onChange={handleChange}></input>
            </form>
            <div>
                <ul>
                    {resultado ? resultado.map((el) => (<li key={el.id}><span>{el.title}, {el.labels}</span></li>)) : <span>{resultado} </span>}
                </ul>
            </div>
        </div>
    );
}

export default SearchIssues;
