import React, { useRef } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, BORDER_RADIUS } from "../constants/theme";

const SearchBar = React.memo(
  ({ value, onChangeText, placeholder = "Search leads..." }) => {
    const inputRef = useRef(null);

    return (
      <View style={styles.container}>
        <Ionicons
          name="search"
          size={20}
          color={COLORS.textSecondary}
          style={styles.icon}
        />
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textLight}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
          blurOnSubmit={false}
        />
        {value ? (
          <TouchableOpacity
            onPress={() => {
              onChangeText("");
              inputRef.current?.focus();
            }}
            style={styles.clearButton}
          >
            <Ionicons
              name="close-circle"
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
  icon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  clearButton: {
    padding: 4,
    marginLeft: SPACING.sm,
  },
});

export default SearchBar;
