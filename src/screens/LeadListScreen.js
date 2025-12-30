import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  RefreshControl,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLeads } from "../context/LeadContext";
import LeadCard from "../components/LeadCard";
import FilterChips from "../components/FilterChips";
import EmptyState from "../components/EmptyState";
import StatsDashboard from "../components/StatsDashboard";
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  SHADOWS,
  BORDER_RADIUS,
} from "../constants/theme";

export default function LeadListScreen({ navigation }) {
  const { leads, loading } = useLeads();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [showStats, setShowStats] = useState(true);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      (lead.course &&
        lead.course.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      selectedStatus === "all" || lead.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (leads.length === 0 && !loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <LinearGradient
          colors={["#6366F1", "#8B5CF6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientHeader}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.headerTitle}>Student CRM</Text>
              <Text style={styles.headerSubtitle}>
                Professional Lead Management
              </Text>
            </View>
          </View>
        </LinearGradient>
        <EmptyState
          icon="people-outline"
          title="No Leads Yet"
          message="Start adding student leads to manage your admissions pipeline effectively."
        />
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate("AddEditLead")}
        >
          <LinearGradient
            colors={["#6366F1", "#8B5CF6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.floatingButtonGradient}
          >
            <Ionicons name="add" size={28} color={COLORS.surface} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Premium Gradient Header */}
      <LinearGradient
        colors={["#6366F1", "#8B5CF6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientHeader}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Student CRM</Text>
            <Text style={styles.headerSubtitle}>
              {leads.length} total leads
            </Text>
          </View>
          <TouchableOpacity
            style={styles.statsToggle}
            onPress={() => setShowStats(!showStats)}
          >
            <Ionicons
              name={showStats ? "stats-chart" : "stats-chart-outline"}
              size={24}
              color={COLORS.surface}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by name, email, phone..."
            placeholderTextColor={COLORS.textLight}
            autoCorrect={false}
            autoCapitalize="none"
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons
                name="close-circle"
                size={20}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </LinearGradient>

      {/* Stats Dashboard */}
      {showStats && <StatsDashboard leads={leads} />}

      {/* Filter Chips */}
      <FilterChips
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {filteredLeads.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsText}>
            {filteredLeads.length}{" "}
            {filteredLeads.length === 1 ? "lead" : "leads"} found
          </Text>
          <TouchableOpacity style={styles.sortButton}>
            <Ionicons name="swap-vertical" size={16} color={COLORS.primary} />
            <Text style={styles.sortText}>Sort</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* List */}
      <FlatList
        data={filteredLeads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LeadCard
            lead={item}
            onPress={() =>
              navigation.navigate("LeadDetail", { leadId: item.id })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
        ListEmptyComponent={
          <EmptyState
            icon="search-outline"
            title="No Results"
            message="Try adjusting your search or filters."
          />
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("AddEditLead")}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["#6366F1", "#8B5CF6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.floatingButtonGradient}
        >
          <Ionicons name="add" size={28} color={COLORS.surface} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gradientHeader: {
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    ...SHADOWS.large,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.surface,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  statsToggle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    marginHorizontal: SPACING.md,
    height: 48,
    ...SHADOWS.small,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    marginLeft: SPACING.sm,
    paddingVertical: 0,
  },
  resultsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  resultsText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sortText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: 100,
  },
  floatingButton: {
    position: "absolute",
    right: SPACING.md,
    bottom: SPACING.xl,
    ...SHADOWS.xl,
  },
  floatingButtonGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
