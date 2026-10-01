import { useState } from 'react';
import obDaviLogo from '../../assets/brand/ob-davi-logo.svg';
import poweredBy from '../../assets/brand/powered-by-onblank.svg';

const sources = [
  'Excel',
  'CSV / TSV',
  'JSON',
  'Parquet',
  'Arrow',
  'PDF',
  'SQLite',
  'DuckDB',
  'PostgreSQL',
  'MySQL',
  'SQL Server',
];

export function App() {
  const [projectPath, setProjectPath] = useState<string | null>(null);

  async function createProject() {
    const path = await window.obDavi.chooseProjectToCreate();
    if (path) setProjectPath(path);
  }

  async function openProject() {
    const path = await window.obDavi.chooseProjectToOpen();
    if (path) setProjectPath(path);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-box">
          <img src={obDaviLogo} alt="OB-DaVi" />
        </div>
        <nav>
          {[
            'Home',
            'Data',
            'Model',
            'Prepare',
            'Pivots',
            'Visuals',
            'Dashboards',
            'Export',
            'Settings',
          ].map((item, i) => (
            <button className={i === 0 ? 'nav-item active' : 'nav-item'} key={item}>
              {item}
            </button>
          ))}
        </nav>
        <div className="powered">
          <img src={poweredBy} alt="Powered by onBlank" />
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div>
            <p className="eyebrow">Local-first data workspace</p>
            <h1>{projectPath ? 'Project ready' : 'Welcome to OB-DaVi'}</h1>
          </div>
          <span className="offline-pill">Local project</span>
        </header>

        {!projectPath ? (
          <section className="welcome-grid">
            <article className="hero-card">
              <h2>Build dashboards from your own data.</h2>
              <p>
                Import files or connect to a database, snapshot the data into a portable .obdavi
                project, prepare it, relate it and visualize it.
              </p>
              <div className="actions">
                <button className="primary" onClick={createProject}>
                  Create project
                </button>
                <button className="secondary" onClick={openProject}>
                  Open .obdavi
                </button>
              </div>
            </article>
            <article className="source-card">
              <h3>v1 data sources</h3>
              <div className="source-grid">
                {sources.map((source) => (
                  <span key={source}>{source}</span>
                ))}
              </div>
              <p className="hint">
                Database connections are explicit import/refresh sources. Current snapshots stay
                usable offline.
              </p>
            </article>
          </section>
        ) : (
          <section className="workspace-grid">
            <article className="canvas-placeholder">
              <p className="eyebrow">Dashboard canvas</p>
              <h2>No visualizations yet</h2>
              <p>Import a source, prepare datasets and drag fields into a visual.</p>
              <code>{projectPath}</code>
            </article>
            <aside className="fields-placeholder">
              <h3>Data</h3>
              <p>Datasets and stable field identities will appear here.</p>
              <h3>Visual</h3>
              <p>Choose chart type, axes, series, filters and formatting.</p>
            </aside>
          </section>
        )}
      </main>
    </div>
  );
}
