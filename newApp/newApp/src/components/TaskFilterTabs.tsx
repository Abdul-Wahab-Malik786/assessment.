import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  createdAt?: any;
}

interface TaskFilterTabsProps {
  selected: string;
  setSelected: (status: string) => void;
  tasks?: Task[];
}

const TaskFilterTabs: React.FC<TaskFilterTabsProps> = ({ selected, setSelected, tasks = [] }) => {
  // Calculate dynamic counts
  const getTaskCount = (status: string) => {
    if (status === "All") return tasks.length;
    return tasks.filter(task => task.status === status).length;
  };

  const filters = [
    { label: "All", displayLabel: "All", count: getTaskCount("All") },
    { label: "Todo", displayLabel: "Todo", count: getTaskCount("Todo") },
    { label: "In Progress", displayLabel: "In Progress", count: getTaskCount("In Progress") },
    { label: "Completed", displayLabel: "Completed", count: getTaskCount("Completed") },
  ];

  return (
    <View style={styles.container}>
      {filters.map((filter) => {
        const isSelected = filter.label === selected;
        return (
          <TouchableOpacity
            key={filter.label}
            onPress={() => setSelected(filter.label)}
            style={styles.tabWrapper}
          >
            {isSelected ? (
              <LinearGradient
                colors={["#3b5998", "#7F00FF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.tabGradient}
              >
                <Text style={styles.tabSelectedText}>
                  {filter.displayLabel} ({filter.count})
                </Text>
              </LinearGradient>
            ) : (
              <View style={styles.tab}>
                <Text style={styles.tabText}>
                  {filter.displayLabel} ({filter.count})
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TaskFilterTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 20,
    // flexWrap: "wrap",
  },
  tabWrapper: {
    borderRadius: 50,
    overflow: "hidden",
  },
  tab: {
    backgroundColor: "#ffffff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 50,
  },
  tabText: {
    color: "#555",
    fontWeight: "500",
    fontSize: 12,
  },
  tabGradient: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 50,
    shadowColor: "#000",
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tabSelectedText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 12,
  },
});
