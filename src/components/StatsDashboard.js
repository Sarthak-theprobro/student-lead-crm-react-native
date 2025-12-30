import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  SHADOWS,
  BORDER_RADIUS,
} from "../constants/theme";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - SPACING.md * 3) / 2;

export default function StatsDashboard({ leads }) {
  // Calculate statistics
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const contactedLeads = leads.filter((l) => l.status === "contacted").length;
  const qualifiedLeads = leads.filter((l) => l.status === "qualified").length;
  const convertedLeads = leads.filter((l) => l.status === "converted").length;
  const lostLeads = leads.filter((l) => l.status === "lost").length;

  const conversionRate =
    totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0;

  const activeLeads = newLeads + contactedLeads + qualifiedLeads;

  const stats = [
    {
      title: "Active Leads",
      value: activeLeads,
      icon: "flame",
      gradient: ["#F59E0B", "#EF4444"],
      iconColor: "#FFF",
      subtitle: "In pipeline",
    },
    {
      title: "Converted",
      value: convertedLeads,
      icon: "trophy",
      gradient: ["#10B981", "#34D399"],
      iconColor: "#FFF",
      subtitle: `${conversionRate}% rate`,
    },
    {
      title: "New This Week",
      value: newLeads,
      icon: "sparkles",
      gradient: ["#3B82F6", "#8B5CF6"],
      iconColor: "#FFF",
      subtitle: "Needs attention",
    },
    {
      title: "Qualified",
      value: qualifiedLeads,
      icon: "checkmark-circle",
      gradient: ["#8B5CF6", "#EC4899"],
      iconColor: "#FFF",
      subtitle: "High priority",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Performance Overview</Text>
        <View style={styles.badge}>
          <Ionicons name="trending-up" size={14} color={COLORS.success} />
          <Text style={styles.badgeText}>Live</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {stats.map((stat, index) => (
          <LinearGradient
            key={index}
            colors={stat.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statCard}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={stat.icon} size={24} color={stat.iconColor} />
            </View>

            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
            <Text style={styles.statSubtitle}>{stat.subtitle}</Text>

            {/* Decorative circles */}
            <View style={[styles.decorCircle, styles.decorCircle1]} />
            <View style={[styles.decorCircle, styles.decorCircle2]} />
          </LinearGradient>
        ))}
      </View>

      {/* Quick Stats Bar */}
      <View style={styles.quickStats}>
        <View style={styles.quickStatItem}>
          <Text style={styles.quickStatValue}>{totalLeads}</Text>
          <Text style={styles.quickStatLabel}>Total</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.quickStatItem}>
          <Text style={styles.quickStatValue}>{contactedLeads}</Text>
          <Text style={styles.quickStatLabel}>Contacted</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.quickStatItem}>
          <Text style={[styles.quickStatValue, { color: COLORS.error }]}>
            {lostLeads}
          </Text>
          <Text style={styles.quickStatLabel}>Lost</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  headerTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.success + "20",
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.full,
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.success,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: SPACING.md,
    gap: SPACING.md,
  },
  statCard: {
    width: CARD_WIDTH,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.large,
    overflow: "hidden",
    position: "relative",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.surface,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.surface,
    marginBottom: 2,
  },
  statSubtitle: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.8)",
  },
  decorCircle: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  decorCircle1: {
    top: -20,
    right: -20,
  },
  decorCircle2: {
    bottom: -30,
    left: -10,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  quickStats: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.medium,
  },
  quickStatItem: {
    flex: 1,
    alignItems: "center",
  },
  quickStatValue: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.sm,
  },
});
