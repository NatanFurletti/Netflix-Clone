// src/App.tsx
import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* Header */}
      <header className="netflix-header">
        <div className="netflix-logo">NETFLIX</div>
        <button className="btn-netflix">Entrar</button>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div
          className="hero-background"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1920')`,
          }}
        />
        <div className="hero-gradient" />
        <div className="hero-content">
          <h1 className="hero-title">
            Filmes, séries e muito mais. Sem limites.
          </h1>
          <p className="hero-description">
            Assista onde quiser. Cancele quando quiser.
          </p>
          <div className="hero-buttons">
            <button className="btn-netflix">Vamos lá</button>
            <button className="btn-secondary">Saiba mais</button>
          </div>
        </div>
      </section>

      {/* Movie Rows */}
      <section className="py-8">
        <div className="movie-row">
          <h2 className="row-title">Em alta</h2>
          <div className="movies-container">
            {/* Cards de filmes irão aqui */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
