import React, { useState } from 'react';
import { SHA256 } from 'crypto-js';

const PasswordCracker: React.FC = () => {
  const [dictionary, setDictionary] = useState('');
  const [passwordHashes, setPasswordHashes] = useState('');
  const [crackedPasswords, setCrackedPasswords] = useState<string[]>([]);


  const crackPasswords = () => {
    const dictionaryWords = dictionary.split('\n');
    const hashes = passwordHashes.split('\n');
  
    const cracked: string[] = [];
  
    hashes.forEach((hash) => {
      const hashedWords = dictionaryWords.map((word) => SHA256(word).toString());
  
      const index = hashedWords.findIndex((hashedWord) => hashedWord === hash);
      if (index !== -1) {
        cracked.push(dictionaryWords[index]);
      }
    });
  
    setCrackedPasswords(cracked);
  };

  return (
    <div>
      <h1>Password Cracker</h1>
      <p>Enter the dictionary words:</p>
      <textarea
        value={dictionary}
        onChange={(e) => setDictionary(e.target.value)}
      ></textarea>
      <p>Enter the password hashes:</p>
      <textarea
        value={passwordHashes}
        onChange={(e) => setPasswordHashes(e.target.value)}
      ></textarea>
      <button onClick={crackPasswords}>Crack Passwords</button>
      <h2>Cracked Passwords:</h2>
      <ul>
        {crackedPasswords.map((password, index) => (
          <li key={index}>{password}</li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordCracker;
