import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLeads } from "../context/LeadContext";
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  SHADOWS,
  BORDER_RADIUS,
} from "../constants/theme";

const STATUS_COLORS = {
  new: COLORS.new,
  contacted: COLORS.contacted,
  qualified: COLORS.qualified,
  converted: COLORS.converted,
  lost: COLORS.lost,
};

export default function LeadDetailScreen({ route, navigation }) {
  const { leadId } = route.params;
  const { getLeadById, deleteLead, updateLead } = useLeads();
  const lead = getLeadById(leadId);

  if (!lead) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Lead not found</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert("Delete Lead", "Are you sure you want to delete this lead?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteLead(leadId);
          navigation.goBack();
        },
      },
    ]);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${lead.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${lead.email}`);
  };

  const handleWhatsApp = () => {
    Linking.openURL(`whatsapp://send?phone=${lead.phone}`);
  };

  const statusColor = STATUS_COLORS[lead.status] || COLORS.textSecondary;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Card */}
        <View style={styles.headerCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {lead.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.name}>{lead.name}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusColor + "20" },
            ]}
          >
            <Text style={[styles.statusText, { color: statusColor }]}>
              {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsCard}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <View
              style={[
                styles.actionIcon,
                { backgroundColor: COLORS.success + "20" },
              ]}
            >
              <Ionicons name="call" size={24} color={COLORS.success} />
            </View>
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleEmail}>
            <View
              style={[
                styles.actionIcon,
                { backgroundColor: COLORS.primary + "20" },
              ]}
            >
              <Ionicons name="mail" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleWhatsApp}
          >
            <View
              style={[
                styles.actionIcon,
                { backgroundColor: COLORS.success + "20" },
              ]}
            >
              <Ionicons name="logo-whatsapp" size={24} color={COLORS.success} />
            </View>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>

        {/* Details Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.detailRow}>
            <Ionicons
              name="mail-outline"
              size={20}
              color={COLORS.textSecondary}
            />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Email</Text>
              <Text style={styles.detailValue}>{lead.email}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons
              name="call-outline"
              size={20}
              color={COLORS.textSecondary}
            />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Phone</Text>
              <Text style={styles.detailValue}>{lead.phone}</Text>
            </View>
          </View>

          {lead.course && (
            <View style={styles.detailRow}>
              <Ionicons
                name="book-outline"
                size={20}
                color={COLORS.textSecondary}
              />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Course Interest</Text>
                <Text style={styles.detailValue}>{lead.course}</Text>
              </View>
            </View>
          )}

          {lead.notes && (
            <View style={styles.detailRow}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color={COLORS.textSecondary}
              />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Notes</Text>
                <Text style={styles.detailValue}>{lead.notes}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Timeline Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Timeline</Text>

          <View style={styles.detailRow}>
            <Ionicons
              name="time-outline"
              size={20}
              color={COLORS.textSecondary}
            />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Created</Text>
              <Text style={styles.detailValue}>
                {new Date(lead.createdAt).toLocaleString()}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons
              name="refresh-outline"
              size={20}
              color={COLORS.textSecondary}
            />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Last Updated</Text>
              <Text style={styles.detailValue}>
                {new Date(lead.updatedAt).toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("AddEditLead", { leadId })}
        >
          <Ionicons name="create-outline" size={20} color={COLORS.surface} />
          <Text style={styles.editButtonText}>Edit Lead</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color={COLORS.error} />
          <Text style={styles.deleteButtonText}>Delete Lead</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
  },
  headerCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    alignItems: "center",
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.surface,
  },
  name: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  actionsCard: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    justifyContent: "space-around",
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  actionButton: {
    alignItems: "center",
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  actionText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text,
    fontWeight: "500",
  },
  detailsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: SPACING.md,
  },
  detailContent: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  detailLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  editButton: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
    ...SHADOWS.medium,
  },
  editButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.surface,
    marginLeft: SPACING.sm,
  },
  deleteButton: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  deleteButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.error,
    marginLeft: SPACING.sm,
  },
  errorText: {
    ...TYPOGRAPHY.body,
    color: COLORS.error,
    textAlign: "center",
    marginTop: SPACING.xl,
  },
});
