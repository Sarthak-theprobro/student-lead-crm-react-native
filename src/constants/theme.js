export const COLORS = {
  // Primary Colors with Gradients
  primary: "#6366F1",
  primaryLight: "#818CF8",
  primaryDark: "#4F46E5",
  primaryGradient: ["#6366F1", "#8B5CF6"],

  // Accent Colors
  accent: "#EC4899",
  accentLight: "#F472B6",

  // Status Colors
  success: "#10B981",
  successLight: "#34D399",
  warning: "#F59E0B",
  warningLight: "#FBBF24",
  error: "#EF4444",
  errorLight: "#F87171",
  info: "#3B82F6",
  infoLight: "#60A5FA",

  // Lead Status Colors with Gradients
  new: "#3B82F6",
  newGradient: ["#3B82F6", "#60A5FA"],
  contacted: "#8B5CF6",
  contactedGradient: ["#8B5CF6", "#A78BFA"],
  qualified: "#F59E0B",
  qualifiedGradient: ["#F59E0B", "#FBBF24"],
  converted: "#10B981",
  convertedGradient: ["#10B981", "#34D399"],
  lost: "#EF4444",
  lostGradient: ["#EF4444", "#F87171"],

  // Lead Priority/Temperature
  hot: "#EF4444",
  warm: "#F59E0B",
  cold: "#3B82F6",

  // Neutrals
  background: "#F9FAFB",
  backgroundDark: "#F3F4F6",
  surface: "#FFFFFF",
  surfaceHover: "#F9FAFB",
  border: "#E5E7EB",
  borderLight: "#F3F4F6",

  // Glass Effect
  glass: "rgba(255, 255, 255, 0.7)",
  glassDark: "rgba(255, 255, 255, 0.1)",

  // Text
  text: "#111827",
  textSecondary: "#6B7280",
  textLight: "#9CA3AF",
  textExtraLight: "#D1D5DB",

  // Overlays
  overlay: "rgba(0, 0, 0, 0.5)",
  overlayLight: "rgba(0, 0, 0, 0.3)",
  shadowColor: "#000",

  // Skeleton Loading
  skeleton: "#E5E7EB",
  skeletonHighlight: "#F3F4F6",
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 28,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
  },
  overline: {
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
};

export const SHADOWS = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  small: {
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  colored: (color) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  }),
};

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
};

export const ANIMATION = {
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 0.5,
  },
  timing: {
    duration: 300,
  },
  quick: {
    duration: 150,
  },
  slow: {
    duration: 500,
  },
};

export const GRADIENTS = {
  primary: ["#6366F1", "#8B5CF6"],
  success: ["#10B981", "#34D399"],
  warning: ["#F59E0B", "#FBBF24"],
  error: ["#EF4444", "#F87171"],
  info: ["#3B82F6", "#60A5FA"],
  sunset: ["#F59E0B", "#EC4899"],
  ocean: ["#3B82F6", "#8B5CF6"],
  forest: ["#10B981", "#3B82F6"],
};

// Lead Temperature/Priority Scoring
export const getLeadTemperature = (lead) => {
  const now = new Date();
  const createdDate = new Date(lead.createdAt);
  const daysSinceCreated = Math.floor(
    (now - createdDate) / (1000 * 60 * 60 * 24)
  );

  // Hot: New leads or Qualified within 3 days
  if (
    (lead.status === "new" || lead.status === "qualified") &&
    daysSinceCreated <= 3
  ) {
    return { temp: "hot", color: COLORS.hot, label: "🔥 Hot" };
  }

  // Warm: Contacted or moderate age
  if (
    lead.status === "contacted" ||
    (daysSinceCreated > 3 && daysSinceCreated <= 7)
  ) {
    return { temp: "warm", color: COLORS.warm, label: "⚡ Warm" };
  }

  // Cold: Older leads or lost
  return { temp: "cold", color: COLORS.cold, label: "❄️ Cold" };
};

// Lead Score (0-100)
export const calculateLeadScore = (lead) => {
  let score = 50; // Base score

  const now = new Date();
  const createdDate = new Date(lead.createdAt);
  const daysSinceCreated = Math.floor(
    (now - createdDate) / (1000 * 60 * 60 * 24)
  );

  // Status scoring
  switch (lead.status) {
    case "new":
      score += 20;
      break;
    case "contacted":
      score += 15;
      break;
    case "qualified":
      score += 30;
      break;
    case "converted":
      score = 100;
      break;
    case "lost":
      score = 0;
      break;
  }

  // Recency scoring
  if (daysSinceCreated <= 1) score += 20;
  else if (daysSinceCreated <= 3) score += 10;
  else if (daysSinceCreated <= 7) score += 5;
  else if (daysSinceCreated > 14) score -= 10;

  // Notes bonus
  if (lead.notes && lead.notes.length > 10) score += 5;

  return Math.max(0, Math.min(100, score));
};
