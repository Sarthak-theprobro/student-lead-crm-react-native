import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
  getLeadTemperature,
  calculateLeadScore,
} from "../constants/theme";

const STATUS_COLORS = {
  new: COLORS.new,
  contacted: COLORS.contacted,
  qualified: COLORS.qualified,
  converted: COLORS.converted,
  lost: COLORS.lost,
};

export default function LeadCard({ lead, onPress }) {
  const statusColor = STATUS_COLORS[lead.status] || COLORS.textSecondary;
  const temperature = getLeadTemperature(lead);
  const score = calculateLeadScore(lead);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {/* Temperature Indicator */}
      <View
        style={[styles.temperatureBar, { backgroundColor: temperature.color }]}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.nameContainer}>
            <View
              style={[styles.avatar, { backgroundColor: statusColor + "20" }]}
            >
              <Text style={[styles.avatarText, { color: statusColor }]}>
                {lead.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.nameInfo}>
              <Text style={styles.name} numberOfLines={1}>
                {lead.name}
              </Text>
              <View style={styles.temperatureTag}>
                <Text
                  style={[styles.temperatureText, { color: temperature.color }]}
                >
                  {temperature.label}
                </Text>
              </View>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={COLORS.textSecondary}
          />
        </View>

        {/* Status Badge */}
        <View style={styles.statusRow}>
          <LinearGradient
            colors={[statusColor, statusColor + "CC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.statusBadge}
          >
            <Text style={styles.statusText}>
              {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
            </Text>
          </LinearGradient>

          {/* Lead Score */}
          <View style={styles.scoreContainer}>
            <View style={styles.scoreBar}>
              <View
                style={[
                  styles.scoreProgress,
                  {
                    width: `${score}%`,
                    backgroundColor:
                      score >= 70
                        ? COLORS.success
                        : score >= 40
                        ? COLORS.warning
                        : COLORS.error,
                  },
                ]}
              />
            </View>
            <Text style={styles.scoreText}>{score}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="mail-outline"
            size={16}
            color={COLORS.textSecondary}
          />
          <Text style={styles.infoText} numberOfLines={1}>
            {lead.email}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="call-outline"
            size={16}
            color={COLORS.textSecondary}
          />
          <Text style={styles.infoText}>{lead.phone}</Text>
        </View>

        {lead.course && (
          <View style={styles.infoRow}>
            <Ionicons
              name="book-outline"
              size={16}
              color={COLORS.textSecondary}
            />
            <Text style={styles.infoText} numberOfLines={1}>
              {lead.course}
            </Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.timestamp}>
            {new Date(lead.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>

          {/* Quick action buttons */}
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionBtn}>
              <Ionicons name="call" size={16} color={COLORS.success} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionBtn}>
              <Ionicons name="mail" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
    overflow: "hidden",
  },
  temperatureBar: {
    height: 4,
    width: "100%",
  },
  content: {
    padding: SPACING.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  nameContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
  },
  nameInfo: {
    flex: 1,
  },
  name: {
    ...TYPOGRAPHY.h4,
    color: COLORS.text,
    marginBottom: 2,
  },
  temperatureTag: {
    alignSelf: "flex-start",
  },
  temperatureText: {
    fontSize: 11,
    fontWeight: "600",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.sm,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.surface,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  scoreBar: {
    width: 60,
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    overflow: "hidden",
  },
  scoreProgress: {
    height: "100%",
    borderRadius: BORDER_RADIUS.full,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  infoText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  timestamp: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textLight,
  },
  quickActions: {
    flexDirection: "row",
    gap: SPACING.xs,
  },
  quickActionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
});
