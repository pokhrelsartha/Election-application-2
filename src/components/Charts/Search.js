import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchQueryChange = (newValue) => {
    setSearchQuery(newValue);
  };

  useEffect(() => {
    const search = () => {
      axios.get('http://52.42.106.142:8001/electionfinal/election/wondata')
        .then((response) => {
          const filteredResults = response.data.filter((election) =>
            election.constname.toLowerCase().includes(searchQuery.toLowerCase())// or startsWith() ??
          );
          setSearchResults(filteredResults);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    };

    const debounceTimeout = setTimeout(() => {
      search();
    }, 5);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchQuery]);

  const options = searchResults.map((election) => ({
    label: election.constname + '-' + election.constkey,
  }));

  return (
    <div>
      <Select
        options={options}
        value={searchQuery}
        onChange={handleSearchQueryChange}
        placeholder="Search by constituency name"
        isClearable
        onInputChange={handleSearchQueryChange}
      />
    </div>
  );
}

export default Search;