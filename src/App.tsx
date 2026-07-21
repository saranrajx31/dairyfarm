import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from './components/ui/ToastContainer';

// Public Landing Page Components
import { Navbar } from './components/landing/Navbar';
import { HeroSection } from './components/landing/HeroSection';
import { AboutSection } from './components/landing/AboutSection';
import { FeaturesSection } from './components/landing/FeaturesSection';
import { ProductsSection } from './components/landing/ProductsSection';
import { WhyChooseUsSection } from './components/landing/WhyChooseUsSection';
import { ProcessTimeline } from './components/landing/ProcessTimeline';
import { TestimonialsSection } from './components/landing/TestimonialsSection';
import { BlogSection } from './components/landing/BlogSection';
import { Footer } from './components/landing/Footer';
import { AuthModal } from './components/landing/AuthModal';

// Admin Dashboard Components
import { Sidebar } from './components/dashboard/Sidebar';
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { OverviewTab } from './components/dashboard/OverviewTab';
import { AnimalsTab } from './components/dashboard/AnimalsTab';
import { MilkProductionTab } from './components/dashboard/MilkProductionTab';
import { CustomersTab } from './components/dashboard/CustomersTab';
import { SalesTab } from './components/dashboard/SalesTab';
import { EmployeesTab } from './components/dashboard/EmployeesTab';
import { HealthTab } from './components/dashboard/HealthTab';
import { BreedingTab } from './components/dashboard/BreedingTab';
import { ExpensesTab } from './components/dashboard/ExpensesTab';
import { ReportsTab } from './components/dashboard/ReportsTab';
import { SettingsTab } from './components/dashboard/SettingsTab';

const MainLayout: React.FC = () => {
  const { currentView, activeTab } = useApp();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const renderDashboardTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'animals':
        return <AnimalsTab />;
      case 'milk':
        return <MilkProductionTab />;
      case 'customers':
        return <CustomersTab />;
      case 'sales':
        return <SalesTab />;
      case 'employees':
        return <EmployeesTab />;
      case 'health':
        return <HealthTab />;
      case 'breeding':
        return <BreedingTab />;
      case 'expenses':
        return <ExpensesTab />;
      case 'reports':
        return <ReportsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  if (currentView === 'dashboard') {
    return (
      <div className="flex min-h-screen bg-[#FFFDF8] dark:bg-[#0B1313] text-slate-900 dark:text-white font-sans transition-colors">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="p-6 md:p-8 flex-1 overflow-y-auto max-w-7xl w-full mx-auto space-y-6">
            {renderDashboardTab()}
          </main>
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF8] dark:bg-[#0B1313] text-slate-900 dark:text-white font-sans transition-colors selection:bg-[#0D8F87] selection:text-white">
      <Navbar onOpenAuth={() => setIsAuthModalOpen(true)} />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <ProductsSection />
        <WhyChooseUsSection />
        <ProcessTimeline />
        <TestimonialsSection />
        <BlogSection />
      </main>
      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
