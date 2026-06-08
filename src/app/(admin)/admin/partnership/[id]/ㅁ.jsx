import React, { useEffect } from 'react';
import { ProjectProvider, useProjects } from './context/ProjectContext';
import { ProjectTabBar } from './components/dashboard/ProjectTabBar';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { storage } from './utils/storage';

const AppContent = () => {
  const { projects, addProject } = useProjects();

  useEffect(() => {
    const saved = storage.loadProjects();
    if (saved.length > 0 && projects.length === 0) {
      saved.forEach(p => addProject(p.name, p.baseUrl));
    }
  }, []);

  useEffect(() => {
    if (projects.length > 0) storage.saveProjects(projects);
  }, [projects]);

  return (
    <div style={{ background: '#0f1117', minHeight: '100vh', padding: '24px', color: '#ffffff' }}>
      <h2>SiteTrace: 바이브 코더를 위한 웹 서버 품질 관리 GUI 플랫폼</h2>
      <ProjectTabBar />
      <ErrorBoundary>
        <DashboardPage />
      </ErrorBoundary>
    </div>
  );
};

export default function App() {
  return (
    <ProjectProvider>
      <AppContent />
    </ProjectProvider>
  );
}