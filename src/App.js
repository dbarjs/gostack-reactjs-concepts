import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then(function (response) {
      setRepositories([...response.data]);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: " ReactJS",
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    if (response.status === 204) {
      const repositoryIndex = repositories.findIndex((r) => r.id === id);
      if (repositoryIndex > -1) {
        const arr = [...repositories];
        arr.splice(repositoryIndex, 1);
        setRepositories(arr);
      }
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
