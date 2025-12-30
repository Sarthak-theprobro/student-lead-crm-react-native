import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { COLORS, SPACING, BORDER_RADIUS } from "../constants/theme";

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Qualified", value: "qualified" },
  { label: "Converted", value: "converted" },
  { label: "Lost", value: "lost" },
];

export default function FilterChips({ selectedStatus, onStatusChange }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {STATUS_OPTIONS.map((status) => (
        <TouchableOpacity
          key={status.value}
          style={[
            styles.chip,
            selectedStatus === status.value && styles.chipActive,
          ]}
          onPress={() => onStatusChange(status.value)}
        >
          <Text
            style={[
              styles.chipText,
              selectedStatus === status.value && styles.chipTextActive,
            ]}
          >
            {status.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
  },
  chipTextActive: {
    color: COLORS.surface,
  },
});
