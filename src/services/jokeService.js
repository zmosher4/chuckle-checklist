export const postJoke = async (joke) => {
  const response = await fetch(`http://localhost:8088/jokes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(joke),
  });
};

export const updateJoke = async (joke) => {
  const editedJokeObj = { ...joke };
  if (!joke.told) {
    editedJokeObj.told = true;
  } else {
    editedJokeObj.told = false;
  }
  const response = await fetch(`http://localhost:8088/jokes/${joke.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedJokeObj),
  });
};

export const deleteJoke = async (joke) => {
  const response = await fetch(`http://localhost:8088/jokes/${joke.id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  });
};
