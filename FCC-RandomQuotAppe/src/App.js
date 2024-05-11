import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  /** Quote state variable */
  const [ quote, setQuote ] = useState({})

  function getRandom() {
    return Math.floor(Math.random() * 102) + 1;
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      const json = await data.json();
      setQuote(json.quotes[ getRandom() ]);
    }
    fetchData()
      .catch(console.error);
  }, [])


  console.log(quote)


  return (
    <div id="quote-box">
      <div id="text">
        { quote.quote }
      </div>
      <a target="_blank" href='https://twitter.com/compose/post' id="tweet-quote"><i class="fa-brands fa-square-x-twitter"></i></a>
      <div id="author">
        - { quote.author }
      </div>
    </div>
  );
}
export default App;
