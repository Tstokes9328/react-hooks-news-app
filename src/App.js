import React, { Component, useState, useEffect } from 'react';

const App = () => {
  //state
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('react');
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react');
  const [loading, setLoading] = useState(false);

  //methods
  const fetchNews = () => {
    //set loading to true to give a loading effect
    setLoading(true);
    //this will fetch news from hacker news api
    fetch(url)
      .then(result => result.json())
      .then(data => (setNews(data.hits), setLoading(false)))
      .catch(error => console.log(error));
  };

  const handleChange = (event) => {
    //this will update the searchQuery on state to whatever is typed in to the input field in the form
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };

  const showLoading = () => { { return loading ? <h2>Loading...</h2> : '' } };

  const searchForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange} />
        <button>Search</button>
      </form>
    )
  };

  const showNews = () => {
    return news.map((element, index) => (<p key={index}>{element.title}</p>))
  };

  //lifecycle hooks
  //the second argument is an array of items from state telling the useEffect to only fire when there is a change for thos items in state
  useEffect(() => {
    fetchNews();
  }, [url]);

  //return jsx
  return (
    <div>
      <h2>News</h2>
      {showLoading()}
      {searchForm()}
      {showNews()}
    </div>
  )
};

export default App;
