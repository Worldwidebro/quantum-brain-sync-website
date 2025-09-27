
// AIBOSSOS + IZA OS Backend Integration Configuration
// Generated: 2025-09-22 22:36:37

export const IZA_OS_CONFIG = {
  // Backend API Configuration
  backend: {
    baseUrl: "http://localhost:8000",
    endpoints: {
      health: "/health",
      ecosystem: "/api/ecosystem",
      agents: "/api/agents",
      workflows: "/api/workflows",
      analytics: "/api/analytics",
      revenue: "/api/revenue",
      businesses: "/api/businesses"
    },
    timeout: 10000,
    retryAttempts: 3
  },
  
  // Supabase Configuration
  supabase: {
    url: "https://your-project.supabase.co",
    anonKey: "your-supabase-anon-key",
    projectId: "4383b1b1-0162-4d6d-bfab-bd32e945273a"
  },
  
  // Stripe Configuration
  stripe: {
    publishableKey: "pk_test_your-stripe-key",
    products: [
      {
        name: "IZA OS Basic",
        price: 2900,
        priceId: "price_basic_monthly"
      },
      {
        name: "IZA OS Pro",
        price: 9900,
        priceId: "price_pro_monthly"
      },
      {
        name: "IZA OS Enterprise",
        price: 29900,
        priceId: "price_enterprise_monthly"
      }
    ]
  },
  
  // Ecosystem Metrics
  ecosystem: {
    value: "$2.84B+",
    totalAgents: 1800,
    totalWorkflows: 156,
    automationLevel: "98%",
    activeBusinesses: 312,
    monthlyRevenue: "$1.72M"
  }
};

// API Service Class
export class IZAOSApiService {
  constructor() {
    this.baseUrl = IZA_OS_CONFIG.backend.baseUrl;
    this.timeout = IZA_OS_CONFIG.backend.timeout;
  }
  
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };
    
    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }
  
  // Health check
  async getHealth() {
    return this.makeRequest(IZA_OS_CONFIG.backend.endpoints.health);
  }
  
  // Ecosystem status
  async getEcosystemStatus() {
    return this.makeRequest(IZA_OS_CONFIG.backend.endpoints.ecosystem);
  }
  
  // Get AI agents
  async getAgents() {
    return this.makeRequest(IZA_OS_CONFIG.backend.endpoints.agents);
  }
  
  // Get workflows
  async getWorkflows() {
    return this.makeRequest(IZA_OS_CONFIG.backend.endpoints.workflows);
  }
  
  // Get analytics
  async getAnalytics() {
    return this.makeRequest(IZA_OS_CONFIG.backend.endpoints.analytics);
  }
  
  // Get revenue data
  async getRevenue() {
    return this.makeRequest(IZA_OS_CONFIG.backend.endpoints.revenue);
  }
  
  // Get businesses
  async getBusinesses() {
    return this.makeRequest(IZA_OS_CONFIG.backend.endpoints.businesses);
  }
}

// Export the service instance
export const izaOSApi = new IZAOSApiService();
