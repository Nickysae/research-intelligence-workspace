import React, { useState, useEffect } from 'react';
import { Sidebar, ActiveNav } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { ProjectView, ProjectTabKey } from './components/project/ProjectView';
import { LandingPage } from './components/landing/LandingPage';
import { MyResearchView } from './components/dashboard/MyResearchView';
import { NewResearchModal } from './components/modals/NewResearchModal';
import { AddSourceModal } from './components/modals/AddSourceModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { AuthModal } from './components/modals/AuthModal';
import { HelpModal } from './components/modals/HelpModal';
import { Project, Source, User } from './types';
import { StorageService, INITIAL_PROJECTS } from './db/storage';

const AUTH_STATUS_KEY = 'RESEARCH_AI_IS_LOGGED_IN';

export type AppView = 'landing' | 'workspace';

export const App: React.FC = () => {
  const [appView, setAppView] = useState<AppView>(() => {
    const isAuth = localStorage.getItem(AUTH_STATUS_KEY) === 'true';
    return isAuth ? 'workspace' : 'landing';
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [currentUser, setCurrentUser] = useState<User>(StorageService.getUser());
  const [activeNav, setActiveNav] = useState<ActiveNav>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projectTab, setProjectTab] = useState<ProjectTabKey>('Overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isNewResearchOpen, setIsNewResearchOpen] = useState(false);
  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Initialize data from local storage
  useEffect(() => {
    const loadedUser = StorageService.getUser();
    const loadedProjects = StorageService.getProjects(loadedUser.id);
    setProjects(loadedProjects);
    setCurrentUser(loadedUser);
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setProjects(StorageService.getProjects(user.id));
    setSelectedProjectId(null);
    setAppView('workspace');
    localStorage.setItem(AUTH_STATUS_KEY, 'true');
  };

  const handleLogout = () => {
    setSelectedProjectId(null);
    setAppView('landing');
    localStorage.setItem(AUTH_STATUS_KEY, 'false');
  };

  const handleLoadSampleData = () => {
    const sampleProjects: Project[] = INITIAL_PROJECTS.map((p, idx) => ({
      ...p,
      id: `proj_${currentUser.id}_${idx + 1}_${Date.now()}`,
      userId: currentUser.id,
      title: `${p.title} (Contoh)`
    }));
    sampleProjects.forEach(p => StorageService.saveProject(p));
    setProjects(StorageService.getProjects(currentUser.id));
  };

  const currentProject = projects.find(p => p.id === selectedProjectId);

  const handleUpdateProject = (updated: Project) => {
    StorageService.saveProject(updated);
    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleProjectCreated = (newProject: Project) => {
    const projectWithUser: Project = {
      ...newProject,
      userId: currentUser.id
    };
    StorageService.saveProject(projectWithUser);
    setProjects(prev => [projectWithUser, ...prev]);
    setSelectedProjectId(projectWithUser.id);
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

  const handleUserUpdated = (updatedUser: User) => {
    setCurrentUser(updatedUser);
  };

  // Quick action from dashboard
  const handleQuickAction = (action: 'add_source' | 'notebooklm' | 'visualization') => {
    if (projects.length === 0) {
      setIsNewResearchOpen(true);
      return;
    }
    const targetId = selectedProjectId || projects[0].id;
    setSelectedProjectId(targetId);
    if (action === 'add_source') {
      setProjectTab('Sources');
      setIsAddSourceOpen(true);
    } else if (action === 'notebooklm') {
      setProjectTab('NotebookLM');
      setActiveNav('notebooklm');
    } else if (action === 'visualization') {
      setProjectTab('Visualization');
      setActiveNav('visualization');
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
        { 
          label: 'Home', 
          onClick: () => {
            setSelectedProjectId(null);
            setActiveNav('home');
          } 
        },
        { 
          label: 'My Research', 
          onClick: () => {
            setSelectedProjectId(null);
            setActiveNav('my-research');
          } 
        },
        { label: currentProject.title }
      ];
    }
    if (activeNav === 'my-research') {
      return [
        { 
          label: 'Home', 
          onClick: () => {
            setSelectedProjectId(null);
            setActiveNav('home');
          } 
        },
        { label: 'My Research' }
      ];
    }
    return undefined;
  };

  // 1. Landing Page (login + guide + about)
  if (appView === 'landing') {
    return (
      <LandingPage
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  // 3. Main Research Workspace View
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FAFAFA]">
      {/* Sidebar navigation */}
      <Sidebar
        activeNav={activeNav}
        currentUser={currentUser}
        setActiveNav={(nav) => {
          setActiveNav(nav);
          if (nav === 'home') {
            setSelectedProjectId(null);
          } else if (nav === 'my-research') {
            setSelectedProjectId(null);
          } else if (nav === 'workspace') {
            if (projects.length > 0) {
              if (!selectedProjectId) setSelectedProjectId(projects[0].id);
              setProjectTab('Overview');
            } else {
              setIsNewResearchOpen(true);
            }
          } else if (nav === 'sources') {
            if (projects.length > 0) {
              if (!selectedProjectId) setSelectedProjectId(projects[0].id);
              setProjectTab('Sources');
            } else {
              setIsNewResearchOpen(true);
            }
          } else if (nav === 'notebooklm') {
            if (projects.length > 0) {
              if (!selectedProjectId) setSelectedProjectId(projects[0].id);
              setProjectTab('NotebookLM');
            } else {
              setIsNewResearchOpen(true);
            }
          } else if (nav === 'visualization') {
            if (projects.length > 0) {
              if (!selectedProjectId) setSelectedProjectId(projects[0].id);
              setProjectTab('Visualization');
            } else {
              setIsNewResearchOpen(true);
            }
          }
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          breadcrumbs={getBreadcrumbs()}
          currentUser={currentUser}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenHelp={() => setIsHelpOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          {selectedProjectId && currentProject ? (
            <ProjectView
              project={currentProject}
              onUpdateProject={handleUpdateProject}
              onOpenAddSource={() => setIsAddSourceOpen(true)}
              onBackToDashboard={() => {
                setSelectedProjectId(null);
                setActiveNav('home');
              }}
              initialTab={projectTab}
            />
          ) : activeNav === 'my-research' ? (
            <MyResearchView
              projects={filteredProjects}
              onSelectProject={(id) => {
                setSelectedProjectId(id);
                setProjectTab('Overview');
                setActiveNav('workspace');
              }}
              onNewResearch={() => setIsNewResearchOpen(true)}
              onLoadSampleData={handleLoadSampleData}
            />
          ) : (
            <Dashboard
              projects={filteredProjects}
              currentUser={currentUser}
              onSelectProject={(id) => {
                setSelectedProjectId(id);
                setProjectTab('Overview');
                setActiveNav('workspace');
              }}
              onNewResearch={() => setIsNewResearchOpen(true)}
              onQuickAction={handleQuickAction}
              onLoadSampleData={handleLoadSampleData}
              onViewAll={() => setActiveNav('my-research')}
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

      {(currentProject || projects.length > 0) && (
        <AddSourceModal
          isOpen={isAddSourceOpen}
          onClose={() => setIsAddSourceOpen(false)}
          project={currentProject || projects[0]}
          onSourceAdded={handleSourceAdded}
        />
      )}

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onUserUpdated={handleUserUpdated}
      />

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        onNewResearch={() => setIsNewResearchOpen(true)}
        onLoadSample={handleLoadSampleData}
      />
    </div>
  );
};

export default App;
