"use client";

import React, { useState } from 'react';
import { X, Calculator, Database, Upload, FileText, Info, Save, RefreshCw } from 'lucide-react';

const InputDrawer = ({ isOpen, onClose, category, metrics, color }) => {
  const [activeTab, setActiveTab] = useState('manual');
  const [showInfo, setShowInfo] = useState(false);
  const [formData, setFormData] = useState({});
  const [calculatedKPIs, setCalculatedKPIs] = useState({});
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [calculating, setCalculating] = useState(false);

  const getCategoryInfo = () => {
    const info = {
      'Financial Metrics': 'Track your company\'s financial health including revenue, costs, and profitability metrics. Updated monthly or quarterly.',
      'Product / Tech Metrics': 'Monitor product performance, user engagement, and technical reliability. Data from various product analytics tools.',
      'Marketing Metrics': 'Measure campaign effectiveness, user acquisition, and engagement across marketing channels.',
      'Sales Metrics': 'Track sales performance, pipeline health, and revenue generation metrics.',
      'Customer Metrics': 'Monitor customer satisfaction, support quality, and retention metrics.',
      'Operations Metrics': 'Track operational efficiency, productivity, and quality control metrics.'
    };
    return info[category] || 'Input and manage metrics for this section';
  };

  const getMetricInputFields = (metric) => {
    const fields = {
      'Revenue': ['Monthly Income', 'Product Revenue', 'Service Revenue'],
      'Customer Acquisition Cost': ['Marketing Spend', 'Number of New Customers'],
      'Customer Lifetime Value': ['Average Purchase Value', 'Customer Lifespan'],
      'Burn Rate': ['Total Monthly Expenses', 'Fixed Costs', 'Variable Costs'],
      'Gross Profit Margin': ['Revenue', 'Cost of Goods Sold'],
      'Net Profit Margin': ['Revenue', 'Total Costs', 'Taxes'],
      'DAU / MAU': ['Daily Active Users', 'Monthly Active Users'],
      'Feature Adoption': ['Users Using Feature', 'Total Users'],
      'Bug Rate': ['Number of Bugs', 'Total Features'],
      'Deployment Frequency': ['Number of Deployments', 'Time Period'],
      'Website Traffic': ['Total Visitors', 'Unique Visitors'],
      'Conversion Rate': ['Conversions', 'Total Visitors'],
      'Sales Growth Rate': ['Current Period Sales', 'Previous Period Sales'],
      'Win Rate': ['Deals Won', 'Total Deals'],
      'Customer Retention Rate': ['Retained Customers', 'Total Customers'],
      'Response Time': ['Total Response Time', 'Number of Responses']
    };
    return fields[metric.title] || ['Value'];
  };

  const getApiIntegrations = (category) => {
    const integrations = {
      'Financial Metrics': ['Stripe', 'QuickBooks', 'Xero'],
      'Product / Tech Metrics': ['Mixpanel', 'Firebase', 'GitHub', 'Jira'],
      'Marketing Metrics': ['Google Analytics', 'Facebook Ads', 'LinkedIn Ads'],
      'Sales Metrics': ['Salesforce', 'HubSpot', 'Pipedrive'],
      'Customer Metrics': ['Intercom', 'Zendesk', 'Typeform'],
      'Operations Metrics': ['Monday.com', 'Asana', 'ClickUp']
    };
    return integrations[category] || [];
  };

  const handleInputChange = (metricTitle, field, value) => {
    setFormData(prev => ({
      ...prev,
      [metricTitle]: {
        ...prev[metricTitle],
        [field]: value
      }
    }));
  };  const calculateMetrics = async () => {
    setCalculating(true);
    try {
      // First validate the required fields
      const missingFields = [];
      Object.entries(formData).forEach(([metric, fields]) => {
        const requiredFields = getMetricInputFields({ title: metric });
        requiredFields.forEach(field => {
          if (!fields[field] && fields[field] !== 0) {
            missingFields.push(`${metric} - ${field}`);
          }
        });
      });

      if (missingFields.length > 0) {
        alert(`Please fill in all required fields:\n${missingFields.join('\n')}`);
        return;
      }

      // Process the data for KPI calculations
      const processedData = Object.entries(formData).reduce((acc, [metric, fields]) => {
        // Convert all values to numbers and store them
        Object.entries(fields).forEach(([field, value]) => {
          acc[field.toLowerCase().replace(/\s+/g, '_')] = Number(value);
        });
        return acc;
      }, {});

      // Make API call to calculate KPIs
      const response = await fetch('/api/metrics/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          data: processedData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to calculate KPIs');
      }

      const { kpis } = await response.json();
      setCalculatedKPIs(kpis);
    } catch (error) {
      console.error('Error calculating metrics:', error);
      alert('Failed to calculate metrics. Please try again.');
    } finally {
      setCalculating(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Calculate metrics first if not already calculated
      if (Object.keys(calculatedKPIs).length === 0) {
        await calculateMetrics();
      }

      await saveMetricData(category, {
        rawData: formData,
        kpis: calculatedKPIs,
        updatedAt: new Date().toISOString()
      });
      onClose();
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleApiSync = async (integration) => {
    setSyncing(true);
    try {
      const data = await syncWithAPI(integration, category);
      // Update the local form data with the synced values
      setFormData(prev => ({
        ...prev,
        ...data.data
      }));
      alert(`Successfully synced data from ${integration}`);
    } catch (error) {
      console.error('Error syncing:', error);
      alert('Failed to sync data. Please try again.');
    } finally {
      setSyncing(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      await uploadMetricsFile(file, category);
      alert('File uploaded successfully!');
      onClose();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    }
  };
  
  if (!isOpen) return null;
  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl z-50 overflow-y-auto" style={{zIndex:'1000000000000000000000000'}}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold" style={{ color }}>
              Input Controls - {category}
            </h3>
            <button
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <Info size={16} />
            </button>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {showInfo && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            {getCategoryInfo()}
          </div>
        )}

        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 p-3 border rounded-lg transition-colors ${
              activeTab === 'manual' ? 'bg-gray-50 border-gray-300' : 'hover:bg-gray-50'
            }`}
          >
            <Calculator className="mx-auto mb-2" />
            <span className="text-sm">Manual</span>
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`flex-1 p-3 border rounded-lg transition-colors ${
              activeTab === 'api' ? 'bg-gray-50 border-gray-300' : 'hover:bg-gray-50'
            }`}
          >
            <Database className="mx-auto mb-2" />
            <span className="text-sm">API</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 p-3 border rounded-lg transition-colors ${
              activeTab === 'upload' ? 'bg-gray-50 border-gray-300' : 'hover:bg-gray-50'
            }`}
          >
            <Upload className="mx-auto mb-2" />
            <span className="text-sm">Upload</span>
          </button>
        </div>

        <div className="space-y-6">
          {activeTab === 'manual' && (
            <div className="space-y-4">
              {metrics?.map((metric) => (
                <div key={metric.title} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">{metric.title}</h4>
                  {getMetricInputFields(metric).map((field) => (
                    <div key={field} className="mb-3">
                      <label className="text-sm text-gray-600 mb-1 block">{field}</label>
                      <input
                        type="text"
                        placeholder={`Enter ${field.toLowerCase()}`}
                        className="w-full p-2 border rounded-md"
                        value={formData[metric.title]?.[field] || ''}
                        onChange={(e) => handleInputChange(metric.title, field, e.target.value)}
                      />
                    </div>
                  ))}
                  <div className="mt-2">
                    <label className="text-sm text-gray-600 mb-1 block">Date Range</label>
                    <div className="flex space-x-2">
                      <input type="date" className="flex-1 p-2 border rounded-md" />
                      <input type="date" className="flex-1 p-2 border rounded-md" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-4">
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Available Integrations</h4>
                <p className="text-sm text-blue-800">Connect your tools to auto-sync data</p>
              </div>
              {getApiIntegrations(category).map((integration) => (
                <div key={integration} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{integration}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Auto-sync {category.toLowerCase()} data
                      </p>
                    </div>
                    <button
                      onClick={() => handleApiSync(integration)}
                      className="flex items-center space-x-1 text-blue-500 hover:text-blue-600"
                      disabled={syncing}
                    >
                      <RefreshCw size={16} className={syncing ? 'animate-spin' : ''} />
                      <span>{syncing ? 'Syncing...' : 'Sync'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <Upload className="mx-auto mb-3 text-gray-400" size={32} />
                <p className="text-sm text-gray-600 mb-2">
                  Drag & drop CSV/Excel file or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  Supported formats: .csv, .xlsx
                </p>
                <input type="file" className="hidden" accept=".csv,.xlsx" />
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h5 className="text-sm font-medium text-blue-900 mb-2">Template Guide</h5>
                <p className="text-xs text-blue-800 mb-2">
                  Download our template files to ensure your data is formatted correctly:
                </p>
                <button className="text-xs text-blue-600 hover:text-blue-700 flex items-center">
                  <FileText size={12} className="mr-1" />
                  Download {category} Template
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 pt-4 border-t">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputDrawer;
