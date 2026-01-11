import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormProvider, useFormContext } from './context/FormContext';
import Layout from './components/Layout/Layout';
import BranchSelector from './components/BranchSelector/BranchSelector';
import CreateForm from './pages/CreateForm';
import ManageForms from './pages/ManageForms';
import ManageBranches from './pages/ManageBranches';
import ViewForm from './pages/ViewForm';
import EditForm from './pages/EditForm';
import DentalChartInteractive from './components/DentalChartInteractive';
import './App.css';

const AppContent = () => {
  const { currentBranch } = useFormContext();

  if (!currentBranch) {
    return <BranchSelector />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CreateForm />} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="/manage" element={<ManageForms />} />
          <Route path="/branches" element={<ManageBranches />} />
          <Route path="/view/:id" element={<ViewForm />} />
          <Route path="/edit/:id" element={<EditForm />} />
        </Routes>
      </Layout>
    </Router>
  );
};

function App() {
  return (
    <FormProvider>
      <AppContent />
    </FormProvider>
  );
}

export default App;
