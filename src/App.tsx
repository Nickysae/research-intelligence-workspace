import React, { useState, useEffect } from 'react';
import { Sidebar, ActiveNav } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { ProjectView } from './components/project/ProjectView';
import { NewResearchModal } from './components/modals/NewResearchModal';
import { AddSourceModal } from './components/modals/AddSourceModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { Project, Source } from './types';
import { StorageService } from './db/storage';

export const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeNav, setActiveNav] = useState<ActiveNav>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isNewResearchOpen, setIsNewResearchOpen] = useState(false);
  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Initialize data from local storage
  useEffect(() => {
    const loaded = StorageService.getProjects();
    setProjects(loaded);
  }, []);

  const currentProject = projects.find(p => p.id === selectedProjectId);

  const handleUpdateProject = (updated: Project) => {
    StorageService.saveProject(updated);
    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleProjectCreated = (newProject: Project) => {
    setProjects(prev => [newProject, ...prev]);
    setSelectedProjectId(newProject.id);
  };

  const handleSourceAdded = (newSource: Source) => {
    if (!currentProject) return;
    const updated: Project = {
      ...currentProject,
      sources: [newSource, ...currentProject.sources],
      stats: {
        ...currentProject.stats,
        validatedSources: currentProject.sources.filter(s => s.validationStatus === 'Validated').length + (newSource.validationStatus === 'Validated' ? 1 : 0)
      }
    };
    handleUpdateProject(updated);
  };

  // Quick action from dashboard
  const handleQuickAction = (action: 'add_source' | 'notebooklm' | 'visualization') => {
    if (projects.length > 0) {
      setSelectedProjectId(projects[0].id);
      if (action === 'add_source') {
        setIsAddSourceOpen(true);
      }
    }
  };

  // Filtered projects by search query
  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.keyInfo.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Breadcrumbs calculation
  const getBreadcrumbs = () => {
    if (selectedProjectId && currentProject) {
      return [
        { label: 'My Research', onClick: () => setSelectedProjectId(null) },
        { label: currentProject.title }
      ];
    }
    return undefined;
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FAFAFA]">
      {/* Sidebar navigation */}
      <Sidebar
        activeNav={activeNav}
        setActiveNav={(nav) => {
          setActiveNav(nav);
          if (nav === 'home' || nav === 'my-research') {
            setSelectedProjectId(null);
          } else if (projects.length > 0 && !selectedProjectId) {
            setSelectedProjectId(projects[0].id);
          }
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          breadcrumbs={getBreadcrumbs()}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          {selectedProjectId && currentProject ? (
            <ProjectView
              project={currentProject}
              onUpdateProject={handleUpdateProject}
              onOpenAddSource={() => setIsAddSourceOpen(true)}
              onBackToDashboard={() => setSelectedProjectId(null)}
            />
          ) : (
            <Dashboard
              projects={filteredProjects}
              onSelectProject={(id) => setSelectedProjectId(id)}
              onNewResearch={() => setIsNewResearchOpen(true)}
              onQuickAction={handleQuickAction}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <NewResearchModal
        isOpen={isNewResearchOpen}
        onClose={() => setIsNewResearchOpen(false)}
        onProjectCreated={handleProjectCreated}
      />

      {currentProject && (
        <AddSourceModal
          isOpen={isAddSourceOpen}
          onClose={() => setIsAddSourceOpen(false)}
          project={currentProject}
          onSourceAdded={handleSourceAdded}
        />
      )}

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default App;
