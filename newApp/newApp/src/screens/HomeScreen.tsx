import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

import TaskFilterTabs from "../components/TaskFilterTabs";
import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/CreateTaskModal";
import { taskService } from "../services/firebaseService";

const GradientText = ({ text }: { text: string }) => {
  return (
    <MaskedView maskElement={<Text style={styles.title}>{text}</Text>}>
      <LinearGradient
        colors={["#3b5998", "#7F00FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[styles.title, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

const HomeScreen = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [uploading, setUploading] = useState(false);

  // Function to load tasks from Firebase
  const loadTasks = async () => {
    setLoading(true);
    try {
      const result = await taskService.getTasks();
      if (result.success) {
        setTasks(result.tasks);
      } else {
        console.log("Firebase error:", result.error);
        Alert.alert("Error", "Failed to load tasks: " + result.error);
      }
    } catch (error) {
      console.log("Firebase error:", error.message);
      Alert.alert("Error", "Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();

    // Setup real-time listener
    const unsubscribe = taskService.listenToTasks((updatedTasks) => {
      setTasks(updatedTasks);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  // Function to create new task
  const handleCreateTask = async (newTask) => {
    try {
      const result = await taskService.addTask(newTask);
      if (result.success) {
        Alert.alert("Success", "Task created successfully!");
        setShowModal(false);
        // Real-time listener will update tasks automatically
      } else {
        Alert.alert("Error", "Failed to create task: " + result.error);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong: " + error.message);
    }
  };



  // Filter tasks based on status and search text
  const getFilteredTasks = () => {
    let filtered = tasks;

    // Filter by status
    if (selectedStatus !== "All") {
      filtered = filtered.filter((task) => task.status === selectedStatus);
    }

    // Filter by search text
    if (searchText.trim()) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchText.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  return (
    <LinearGradient
      colors={["#f5f7fa", "#ffffff"]}
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <GradientText text="Task Manager" />
          <Text style={styles.subtitle}>
            Organize your work and stay productive
          </Text>
        </View>

        <View style={styles.searchRow}>
          <TextInput
            placeholder="Search tasks..."
            placeholderTextColor="#888"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => setShowModal(true)}
          >
            <LinearGradient
              colors={["#3b5998", "#7F00FF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.createButtonGradient}
            >
              <Text style={styles.createButtonText}>+ Create Task</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TaskFilterTabs
          selected={selectedStatus}
          setSelected={setSelectedStatus}
          tasks={tasks}
        />

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3b5998" />
            <Text style={styles.loadingText}>Loading tasks...</Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {filteredTasks.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {searchText.trim()
                    ? "No tasks found"
                    : selectedStatus === "All"
                      ? "No tasks yet\nPress + Create Task to get started\n\nOr upload sample data using the button above"
                      : `No ${selectedStatus} tasks found`
                  }
                </Text>
              </View>
            ) : (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  date={task.createdAt ?
                    new Date(task.createdAt.seconds * 1000).toLocaleDateString('en-GB') :
                    new Date().toLocaleDateString('en-GB')
                  }
                />
              ))
            )}
          </ScrollView>
        )}

        <CreateTaskModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateTask}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
    marginTop: 4,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    fontSize: 14,
    elevation: 1,
  },

  scrollContainer: {
    paddingBottom: 40,
  },

  createButton: {
    borderRadius: 1,
    overflow: "hidden",
  },

  createButtonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#3b5998",
    fontSize: 16,
    marginTop: 10,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: "#444",
    fontSize: 16,
    textAlign: "center",
  },

  uploadButton: {
    borderRadius: 1,
    overflow: "hidden",
    marginBottom: 20,
  },

  uploadButtonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  uploadButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
