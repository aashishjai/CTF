import React, { useState } from 'react';

const SQLInjectionGame: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchItems = () => {
    // Simulated vulnerable SQL query
    const query = `SELECT * FROM items WHERE name = '${searchTerm}'`;

    // Simulated virtual database
    const itemsDatabase = {
      'Item 1': 10,
      'Item 2': 5,
      'Item 3': 3,
    };

    try {
      const results = executeQuery(query, itemsDatabase);
      setSearchResults(results);
      setErrorMessage('');
    } catch (error:any) {
      setSearchResults([]);
      setErrorMessage(error.message);
    }
  };

  const executeQuery = (query: string, database: { [key: string]: any }) => {
    // Validate and parse the query
    if (!query.includes('SELECT') || !query.includes('FROM') || !query.includes('WHERE')) {
      throw new Error('Invalid query.');
    }

    // Extract the condition from the query
    const conditionMatch = query.match(/WHERE\s+(.+)$/i);
    if (!conditionMatch || conditionMatch.length < 2) {
      throw new Error('Invalid query condition.');
    }
    const condition = conditionMatch[1].trim();

    // Evaluate the condition and return the filtered results
    const filteredResults: string[] = [];
    for (const item in database) {
      if (eval(`item ${condition}`)) {
        filteredResults.push(item);
      }
    }
    return filteredResults;
  };

  return (
    <div>
      <h1>SQL Injection Game</h1>
      <p>Search for an item:</p>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={searchItems}>Search</button>
      {errorMessage && <p>{errorMessage}</p>}
      {searchResults.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {searchResults.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h2>Game Objective:</h2>
        <p>Your goal is to retrieve sensitive information by exploiting the SQL query.</p>
        <p>Try to craft an input that bypasses the query and retrieves all items.</p>
        <p>Think creatively and experiment with different input combinations!</p>
      </div>
    </div>
  );
};

export default SQLInjectionGame;
