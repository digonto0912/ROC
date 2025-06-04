"use client";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/metrics";

// Helper function to get auth token
const getAuthHeaders = async () => {
  // TODO: Implement getting Firebase auth token
  // const user = auth.currentUser;
  // const token = user ? await user.getIdToken() : null;

  return {
    "Content-Type": "application/json",
    // ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Get latest metrics data
export const getLatestMetrics = async (category) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}?category=${category}`, {
      method: "GET",
      headers: {
        ...headers,
        'Accept': 'application/json'
      }
    });    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Server response:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(errorData.error || 'Failed to fetch metrics');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting latest metrics:", error);
    throw error;
  }
};

// Save new metric data
export const saveMetricData = async (category, metricData) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        category,
        metrics: metricData,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save metric data");
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error("Error saving metric data:", error);
    throw error;
  }
};

// Update existing metric data
export const updateMetricData = async (id, updatedData) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}?id=${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update metric");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating metric:", error);
    throw error;
  }
};

// Delete metric data
export const deleteMetric = async (id) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}?id=${id}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to delete metric");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting metric:", error);
    throw error;
  }
};

// Upload file and save metrics
export const uploadMetricsFile = async (file, category) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }

    const { fileUrl, parsedData } = await response.json();

    // Save the metric data
    await saveMetricData(category, {
      data: parsedData,
      fileUrl,
      uploadedAt: new Date().toISOString(),
    });

    return fileUrl;
  } catch (error) {
    console.error("Error uploading metrics file:", error);
    throw error;
  }
};

// Sync with external API
export const syncWithAPI = async (integration, category) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(
      `${API_BASE_URL}/integrations/${integration}?category=${category}`,
      {
        method: "POST",
        headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to sync with ${integration}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error syncing with API:", error);
    throw error;
  }
};
