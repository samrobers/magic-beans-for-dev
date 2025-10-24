// Integration script to connect Angular app with main React outpost
// This will be used to embed the Angular app in the main application

const integrationConfig = {
  // Angular app will be served on a different port
  angularPort: 4200,
  reactPort: 5173,

  // Integration endpoints
  endpoints: {
    academy: "http://localhost:4200",
    mainApp: "http://localhost:5173",
  },

  // Communication between apps
  postMessage: {
    type: "ACADEMY_NAVIGATION",
    data: {
      route: "/ditch-rider-academy",
      title: "Ditch Rider Academy",
      description: "Learn Angular the Western Way",
    },
  },
};

// Export for use in main app
if (typeof module !== "undefined" && module.exports) {
  module.exports = integrationConfig;
}
