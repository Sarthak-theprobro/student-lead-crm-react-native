import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LeadContext = createContext();

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error("useLeads must be used within LeadProvider");
  }
  return context;
};

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load leads from storage on mount
  useEffect(() => {
    loadLeads();
  }, []);

  // Load leads from AsyncStorage
  const loadLeads = async () => {
    try {
      const storedLeads = await AsyncStorage.getItem("leads");
      if (storedLeads) {
        setLeads(JSON.parse(storedLeads));
      }
    } catch (error) {
      console.error("Error loading leads:", error);
    } finally {
      setLoading(false);
    }
  };

  // Save leads to AsyncStorage
  const saveLeads = async (newLeads) => {
    try {
      await AsyncStorage.setItem("leads", JSON.stringify(newLeads));
      setLeads(newLeads);
    } catch (error) {
      console.error("Error saving leads:", error);
    }
  };

  // Add new lead
  const addLead = async (leadData) => {
    const newLead = {
      id: Date.now().toString(),
      ...leadData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedLeads = [newLead, ...leads];
    await saveLeads(updatedLeads);
  };

  // Update existing lead
  const updateLead = async (id, updatedData) => {
    const updatedLeads = leads.map((lead) =>
      lead.id === id
        ? { ...lead, ...updatedData, updatedAt: new Date().toISOString() }
        : lead
    );
    await saveLeads(updatedLeads);
  };

  // Delete lead
  const deleteLead = async (id) => {
    const updatedLeads = leads.filter((lead) => lead.id !== id);
    await saveLeads(updatedLeads);
  };

  // Get lead by ID
  const getLeadById = (id) => {
    return leads.find((lead) => lead.id === id);
  };

  // Get leads by status
  const getLeadsByStatus = (status) => {
    return leads.filter((lead) => lead.status === status);
  };

  // Search leads
  const searchLeads = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(lowercaseQuery) ||
        lead.email.toLowerCase().includes(lowercaseQuery) ||
        lead.phone.includes(query) ||
        (lead.course && lead.course.toLowerCase().includes(lowercaseQuery))
    );
  };

  const value = {
    leads,
    loading,
    addLead,
    updateLead,
    deleteLead,
    getLeadById,
    getLeadsByStatus,
    searchLeads,
  };

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
};
