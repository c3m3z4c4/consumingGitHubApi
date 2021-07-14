import React, { useState, useEffect } from 'react'

const SearchIssues = () => {

    const [search, setSearch] = useState('bug');
    const [text, setText] = useState('')
    const [resultado, setResultado] = useState([]);
    let arreglo = [];
    
    useEffect( () => {
        getData();
    },[])

    const getData = async () => {
        const url = `https://api.github.com/search/issues?q=${search}`;
        const resp = await fetch(url);
        const data = await resp.json();
        const issues = await data.items.map( issue => {
            arreglo.push({
                id: issue.id, 
                title: issue.title, 
                labels:issue.labels
            })
        })
        console.log(arreglo)
        setResultado(arreglo)
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        getData()
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
                    {resultado.length > 1 ? resultado?.map((item) => (<li key={item.id}><span>{item.title}, {item.labels}</span></li>)) : <span>No Results</span>}
                </ul>
            </div>
        </div>
    );
}

export default SearchIssues;
