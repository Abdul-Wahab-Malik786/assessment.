import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import icons from "../constants/icons";

type TaskStatus = "Todo" | "In Progress" | "Completed";

interface Task {
  title: string;
  description?: string;
  status: string;
  date: string;
}

const statusGradients: Record<TaskStatus, string[]> = {
  Todo: ["#FDE68A", "#FACC15"],
  "In Progress": ["#93C5FD", "#3B82F6"],
  Completed: ["#6EE7B7", "#10B981"],
};

const statusColors: Record<TaskStatus, string> = {
  Todo: "#F59E0B",
  "In Progress": "#1D4ED8",
  Completed: "#059669",
};

const TaskCard = ({ title, description, status, date }: Task) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.title}>{title}</Text>

        <LinearGradient
          colors={statusGradients[status]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.statusBadge}
        >
          <Text style={[styles.statusText, { color: statusColors[status] }]}>
            {status}
          </Text>
          <Image
            source={icons.dropDown}
            style={[styles.statusIcon, { tintColor: statusColors[status] }]}
          />
        </LinearGradient>
      </View>

      {description?.length > 0 && (
        <Text style={styles.description}>{description}</Text>
      )}

      <View style={styles.dateRow}>
        <Image source={icons.calender} style={styles.dateIcon} />
        <Text style={styles.dateText}>{date}</Text>
      </View>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 13,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginHorizontal: 3,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
    flex: 1,
    flexWrap: "wrap",
    marginRight: 10,
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
    marginRight: 4,
  },
  statusIcon: {
    width: 12,
    height: 12,
    tintColor: "#fff",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  dateIcon: {
    width: 14,
    height: 14,
    marginRight: 6,
    tintColor: "#999", // Or set based on status if needed
  },

  dateText: {
    fontSize: 12,
    color: "#666",
  },
});
