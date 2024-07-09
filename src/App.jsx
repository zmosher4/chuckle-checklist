import { useEffect, useState } from 'react';
import './App.css';
import { deleteJoke, postJoke, updateJoke } from './services/jokeService';
import { getAllJokes } from './services/allJokes';

export const App = () => {
  const [text, setText] = useState('');
  const told = false;
  const [allJokes, setAllJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const jokeObj = { text, told };
  const handleClick = () => {
    postJoke(jokeObj);
    setText('');
    setFetchTrigger(!fetchTrigger);
  };

  const handleUpdate = async (joke) => {
    await updateJoke(joke);
    setFetchTrigger(!fetchTrigger);
  };
  const handleDelete = async (joke) => {
    await deleteJoke(joke);
    setFetchTrigger(!fetchTrigger);
  };

  useEffect(() => {
    const fetchJokes = async () => {
      const jokes = await getAllJokes();
      setAllJokes(jokes);
    };
    fetchJokes();
  }, [fetchTrigger]);

  useEffect(() => {
    const untoldArr = allJokes.filter((joke) => !joke.told);
    setUntoldJokes(untoldArr);
    const toldArr = allJokes.filter((joke) => joke.told);
    setToldJokes(toldArr);
  }, [allJokes]);

  return (
    <div className="app-container">
      <div className="app-heading">
        <h1 className="app-heading-text">Cuckle Checklist</h1>
      </div>
      <h2>Add Joke</h2>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          value={text}
          placeholder="New One Liner"
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
        <button onClick={handleClick} className="joke-input-submit">
          Submit
        </button>
      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>
            Untold <span className="untold-count">{untoldJokes.length}</span>
          </h2>
          <ul>
            {untoldJokes.map((joke) => {
              return (
                <li key={joke.id} className="joke-list-item">
                  <p className="joke-list-item-text">{joke.text}</p>
                  <div className="joke-list-action-toggle">
                    <button onClick={() => handleUpdate(joke)}>Told</button>
                  </div>
                  <div className="joke-list-action-delete">
                    <button onClick={() => handleDelete(joke)}>Delete</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="joke-list-container">
          <h2>
            Told <span className="told-count">{toldJokes.length}</span>
          </h2>
          <ul>
            {toldJokes.map((joke) => {
              if (joke.text) {
                return (
                  <li key={joke.id} className="joke-list-item">
                    <p className="joke-list-item-text">{joke.text}</p>

                    <div className="joke-list-action-toggle">
                      <button onClick={() => handleUpdate(joke)}>Untell</button>
                    </div>
                    <div className="joke-list-action-delete">
                      <button onClick={() => handleDelete(joke)}>Delete</button>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
