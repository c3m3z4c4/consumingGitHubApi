import React, { useState, useEffect } from 'react'

const SearchIssues = () => {

    const [search, setSearch] = useState('bug');
    const [text, setText] = useState('')
    const [resultado, setResultado] = useState({});
    
    useEffect( async () => {
        const url = `https://api.github.com/search/issues?q=${search}`;
        const resp =  await fetch(url);
        const data = await resp.json();
        console.log(data)
        setResultado(data);
    },[]) //Here we look forward to change the request depending or the bug placed in search state


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(text)
    }

    const handleChange = e => { setText(e.target.value) }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="Search" onChange={handleChange}></input>
            </form>
            <div>
                <ul>
                    {/* {resultado.length > 1 ? resultado?.map((item) => (<li key={item.id}><span>{item.title}, {item.labels}</span></li>)) : <span>No Results</span>} */}
                    {resultado.items?.map((item) => (<li key={`items-${item.id}`}><span>{item.title}, {item.labels}</span></li>))}
                </ul>
            </div>
        </div>
    );
}

export default SearchIssues;
