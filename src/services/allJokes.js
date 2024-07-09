export const getAllJokes = async () => {
  const response = await fetch('http://localhost:8088/jokes');
  const jokes = await response.json();
  return jokes;
};
