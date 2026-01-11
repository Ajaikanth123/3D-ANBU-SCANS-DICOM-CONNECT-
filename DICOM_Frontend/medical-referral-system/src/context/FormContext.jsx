import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getSampleDataForBranch } from '../data/sampleData';

const FormContext = createContext();

const BRANCHES_STORAGE_KEY = 'anbu_branches';

const DEFAULT_BRANCHES = [
  { id: 'ANBU-SLM-LIC', branchName: 'ANBU – Salem (LIC Colony)', city: 'Salem', address: '', phone: '' },
  { id: 'ANBU-SLM-GUG', branchName: 'ANBU – Salem (Gugai)', city: 'Salem', address: '', phone: '' },
  { id: 'ANBU-RMD', branchName: 'ANBU – Ramanathapuram', city: 'Ramanathapuram', address: '', phone: '' },
  { id: 'ANBU-HSR', branchName: 'ANBU – Hosur', city: 'Hosur', address: '', phone: '' },
];

// Helper to get branches from localStorage
const getBranchesFromStorage = () => {
  try {
    const stored = localStorage.getItem(BRANCHES_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading branches:', error);
  }
  return DEFAULT_BRANCHES;
};

// Export for components that need branch list
export const BRANCHES = getBranchesFromStorage().map(b => ({
  id: b.id,
  name: b.branchName
}));

const getStorageKey = (branchId) => `manageForms_${branchId}`;

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }) => {
  const [currentBranch, setCurrentBranch] = useState(() => {
    try {
      return localStorage.getItem('selectedBranch') || null;
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  });

  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [branches, setBranches] = useState(() => getBranchesFromStorage());

  // Refresh branches from storage (for when ManageBranches updates them)
  useEffect(() => {
    const handleStorageChange = () => {
      setBranches(getBranchesFromStorage());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Load forms when branch changes
  useEffect(() => {
    if (currentBranch) {
      setIsLoading(true);
      const storageKey = getStorageKey(currentBranch);
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          setForms(JSON.parse(stored));
        } else {
          // Initialize with sample data for this branch
          const sampleData = getSampleDataForBranch(currentBranch);
          localStorage.setItem(storageKey, JSON.stringify(sampleData));
          setForms(sampleData);
        }
      } catch (error) {
        console.error('Error loading/saving forms:', error);
        // Fallback to sample data in memory if storage fails
        setForms(getSampleDataForBranch(currentBranch));
      }
      setIsLoading(false);
    } else {
      setForms([]);
    }
  }, [currentBranch]);

  // Save forms when they change (including when forms are deleted)
  // Skip saving during initial load to prevent overwriting with stale data
  useEffect(() => {
    if (currentBranch && !isLoading) {
      const storageKey = getStorageKey(currentBranch);
      try {
        localStorage.setItem(storageKey, JSON.stringify(forms));
      } catch (error) {
        console.error('Error saving forms:', error);
      }
    }
  }, [forms, currentBranch, isLoading]);

  const selectBranch = (branchId) => {
    const currentBranches = getBranchesFromStorage();
    const branchExists = currentBranches.some(b => b.id === branchId);
    if (branchExists) {
      setCurrentBranch(branchId);
      try {
        localStorage.setItem('selectedBranch', branchId);
      } catch (error) {
        console.error('Error saving selected branch:', error);
      }
    }
  };

  // Helper to get display name
  const getBranchName = (id) => {
    const currentBranches = getBranchesFromStorage();
    const branch = currentBranches.find(b => b.id === id);
    return branch ? branch.branchName : id;
  };

  // Refresh branches list
  const refreshBranches = () => {
    setBranches(getBranchesFromStorage());
  };

  const addForm = (formData) => {
    if (!currentBranch) return null;

    const newForm = {
      ...formData,
      id: uuidv4(),
      branch: currentBranch,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setForms((prev) => [...prev, newForm]);
    return newForm;
  };

  const updateForm = (id, formData) => {
    setForms((prev) =>
      prev.map((form) =>
        form.id === id
          ? { ...form, ...formData, branch: form.branch, updatedAt: new Date().toISOString() }
          : form
      )
    );
  };

  const deleteForm = (id) => {
    setForms((prev) => prev.filter((form) => form.id !== id));
  };

  const getFormById = (id) => {
    return forms.find((form) => form.id === id);
  };

  return (
    <FormContext.Provider
      value={{
        forms,
        currentBranch,
        branches: branches.map(b => ({ id: b.id, name: b.branchName })),
        selectBranch,
        addForm,
        updateForm,
        deleteForm,
        getFormById,
        getBranchName,
        refreshBranches,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
