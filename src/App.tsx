import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { HomePage } from './pages/HomePage';
import { LiveDemoPage } from './pages/LiveDemoPage';
import { PipelinePage } from './pages/PipelinePage';
import { ResultsPage } from './pages/ResultsPage';
import { DataPage } from './pages/DataPage';
import { TeamPage } from './pages/TeamPage';
import { ProgressPage } from './pages/ProgressPage';
import { AboutEthicsPage } from './pages/AboutEthicsPage';

export const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="demo" element={<LiveDemoPage />} />
          <Route path="pipeline" element={<PipelinePage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="data" element={<DataPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="about" element={<AboutEthicsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
