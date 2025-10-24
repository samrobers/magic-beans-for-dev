// Core routing configuration for Desert Outpost
// Handles navigation between different apps

export const APP_ROUTES = {
  CHART_SALOON: "/chart-saloon",
  DITCH_RIDER_ACADEMY: "/ditch-rider-academy",
  TRADING_POST: "/trading-post",
  SHERIFFS_OFFICE: "/sheriffs-office",
};

export const APP_CONFIG = {
  "chart-saloon": {
    name: "The Chart Saloon",
    icon: "🍺",
    description: "Create stunning charts and visualizations",
    framework: "React",
    status: "open",
    subtext: "Where data comes to drink",
  },
  "ditch-rider-academy": {
    name: "Ditch Rider Academy",
    icon: "🌊",
    description: "Master Angular pipes and data flow",
    framework: "Angular",
    status: "open",
    subtext: "Channel data through the digital frontier",
  },
  "trading-post": {
    name: "Trading Post",
    icon: "🏪",
    description: "Data exchange and API integration",
    framework: "Vue",
    status: "coming-soon",
    subtext: "Trade your data goods",
  },
  "sheriffs-office": {
    name: "Sheriff's Office",
    icon: "🏛️",
    description: "Admin dashboard and settings",
    framework: "Vanilla JS",
    status: "coming-soon",
    subtext: "Keep the peace in your data",
  },
};

export function getAppComponent(appName) {
  switch (appName) {
    case "chart-saloon":
      return () => import("../../apps/chart-saloon/index.jsx");
    case "ditch-rider-academy":
      return () => import("../../apps/ditch-rider-academy/index.js");
    case "trading-post":
      return () => import("../../apps/trading-post/index.js");
    case "sheriffs-office":
      return () => import("../../apps/sheriffs-office/index.js");
    default:
      return null;
  }
}
