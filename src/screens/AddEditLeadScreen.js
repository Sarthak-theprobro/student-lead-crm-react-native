import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLeads } from "../context/LeadContext";
import { validateForm } from "../utils/validation";
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  SHADOWS,
  BORDER_RADIUS,
} from "../constants/theme";

const STATUS_OPTIONS = [
  { label: "New", value: "new", icon: "star" },
  { label: "Contacted", value: "contacted", icon: "call" },
  { label: "Qualified", value: "qualified", icon: "checkmark-circle" },
  { label: "Converted", value: "converted", icon: "trophy" },
  { label: "Lost", value: "lost", icon: "close-circle" },
];

export default function AddEditLeadScreen({ route, navigation }) {
  const { leadId } = route.params || {};
  const { addLead, updateLead, getLeadById } = useLeads();
  const isEditing = !!leadId;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    status: "new",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      const lead = getLeadById(leadId);
      if (lead) {
        setFormData({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          course: lead.course || "",
          status: lead.status,
          notes: lead.notes || "",
        });
      }
    }
  }, [leadId, isEditing]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = async () => {
    const validation = validateForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      Alert.alert(
        "Validation Error",
        "Please fix the errors before submitting."
      );
      return;
    }

    try {
      if (isEditing) {
        await updateLead(leadId, formData);
        Alert.alert("Success", "Lead updated successfully!");
      } else {
        await addLead(formData);
        Alert.alert("Success", "Lead added successfully!");
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          {isEditing ? "Edit Lead" : "Add New Lead"}
        </Text>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Name <Text style={styles.required}>*</Text>
          </Text>
          <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
            <Ionicons
              name="person-outline"
              size={20}
              color={COLORS.textSecondary}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter student name"
              value={formData.name}
              onChangeText={(value) => handleInputChange("name", value)}
              placeholderTextColor={COLORS.textLight}
            />
          </View>
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Email <Text style={styles.required}>*</Text>
          </Text>
          <View
            style={[styles.inputWrapper, errors.email && styles.inputError]}
          >
            <Ionicons
              name="mail-outline"
              size={20}
              color={COLORS.textSecondary}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter email address"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={COLORS.textLight}
            />
          </View>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        {/* Phone Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Phone <Text style={styles.required}>*</Text>
          </Text>
          <View
            style={[styles.inputWrapper, errors.phone && styles.inputError]}
          >
            <Ionicons
              name="call-outline"
              size={20}
              color={COLORS.textSecondary}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              value={formData.phone}
              onChangeText={(value) => handleInputChange("phone", value)}
              keyboardType="phone-pad"
              placeholderTextColor={COLORS.textLight}
            />
          </View>
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </View>

        {/* Course Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Course Interest <Text style={styles.required}>*</Text>
          </Text>
          <View
            style={[styles.inputWrapper, errors.course && styles.inputError]}
          >
            <Ionicons
              name="book-outline"
              size={20}
              color={COLORS.textSecondary}
            />
            <TextInput
              style={styles.input}
              placeholder="e.g., Computer Science, Engineering"
              value={formData.course}
              onChangeText={(value) => handleInputChange("course", value)}
              placeholderTextColor={COLORS.textLight}
            />
          </View>
          {errors.course && (
            <Text style={styles.errorText}>{errors.course}</Text>
          )}
        </View>

        {/* Status Selection */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Status <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.statusContainer}>
            {STATUS_OPTIONS.map((status) => (
              <TouchableOpacity
                key={status.value}
                style={[
                  styles.statusChip,
                  formData.status === status.value && styles.statusChipActive,
                ]}
                onPress={() => handleInputChange("status", status.value)}
              >
                <Ionicons
                  name={status.icon}
                  size={18}
                  color={
                    formData.status === status.value
                      ? COLORS.surface
                      : COLORS.textSecondary
                  }
                />
                <Text
                  style={[
                    styles.statusChipText,
                    formData.status === status.value &&
                      styles.statusChipTextActive,
                  ]}
                >
                  {status.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notes Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Notes (Optional)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="document-text-outline"
              size={20}
              color={COLORS.textSecondary}
              style={styles.notesIcon}
            />
            <TextInput
              style={[styles.input, styles.notesInput]}
              placeholder="Add any additional notes..."
              value={formData.notes}
              onChangeText={(value) => handleInputChange("notes", value)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor={COLORS.textLight}
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons name="checkmark-circle" size={24} color={COLORS.surface} />
          <Text style={styles.submitButtonText}>
            {isEditing ? "Update Lead" : "Add Lead"}
          </Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
    marginBottom: SPACING.xl,
  },
  inputContainer: {
    marginBottom: SPACING.lg,
  },
  label: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text,
    fontWeight: "600",
    marginBottom: SPACING.xs,
  },
  required: {
    color: COLORS.error,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 48,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  input: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: SPACING.sm,
  },
  notesIcon: {
    alignSelf: "flex-start",
    marginTop: SPACING.sm,
  },
  notesInput: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: SPACING.sm,
  },
  errorText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.xs,
  },
  statusChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  statusChipText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
  },
  statusChipTextActive: {
    color: COLORS.surface,
  },
  submitButton: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.md,
    ...SHADOWS.medium,
  },
  submitButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.surface,
    marginLeft: SPACING.sm,
  },
  cancelButton: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textSecondary,
  },
});
