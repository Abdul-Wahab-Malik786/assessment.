import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const firebaseDB = {
  addDocument: async (collectionName, data) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getDocuments: async (collectionName) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: documents };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateDocument: async (collectionName, docId, data) => {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, data);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  deleteDocument: async (collectionName, docId) => {
    try {
      await deleteDoc(doc(db, collectionName, docId));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  listenToCollection: (collectionName, callback) => {
    const unsubscribe = onSnapshot(
      collection(db, collectionName),
      (snapshot) => {
        const documents = [];
        snapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });
        callback(documents);
      }
    );
    return unsubscribe;
  },
};

export const taskService = {
  getTasks: async () => {
    try {
      const result = await firebaseDB.getDocuments("tasks");
      if (result.success) {
        const sortedTasks = result.data.sort((a, b) => {
          const dateA = new Date(a.createdAt?.seconds * 1000 || a.createdAt);
          const dateB = new Date(b.createdAt?.seconds * 1000 || b.createdAt);
          return dateB - dateA;
        });
        return { success: true, tasks: sortedTasks };
      }
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  addTask: async (taskData) => {
    try {
      const newTask = {
        title: taskData.title,
        description: taskData.description || "",
        status: taskData.status || "Todo",
        createdAt: new Date(),
        updatedAt: new Date(),
        ...taskData,
      };

      const result = await firebaseDB.addDocument("tasks", newTask);
      if (result.success) {
        return {
          success: true,
          taskId: result.id,
          message: "Task successfully added!",
        };
      }
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateTask: async (taskId, updateData) => {
    try {
      const updatedData = {
        ...updateData,
        updatedAt: new Date(),
      };

      const result = await firebaseDB.updateDocument(
        "tasks",
        taskId,
        updatedData
      );
      if (result.success) {
        return {
          success: true,
          message: "Task successfully updated!",
        };
      }
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  deleteTask: async (taskId) => {
    try {
      const result = await firebaseDB.deleteDocument("tasks", taskId);
      if (result.success) {
        return {
          success: true,
          message: "Task successfully deleted!",
        };
      }
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateTaskStatus: async (taskId, newStatus) => {
    try {
      const result = await taskService.updateTask(taskId, {
        status: newStatus,
      });
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  listenToTasks: (callback) => {
    return firebaseDB.listenToCollection("tasks", (tasks) => {
      const sortedTasks = tasks.sort((a, b) => {
        const dateA = new Date(a.createdAt?.seconds * 1000 || a.createdAt);
        const dateB = new Date(b.createdAt?.seconds * 1000 || b.createdAt);
        return dateB - dateA;
      });
      callback(sortedTasks);
    });
  },

  getTasksByStatus: async (status) => {
    try {
      const result = await taskService.getTasks();
      if (result.success) {
        const filteredTasks = result.tasks.filter(
          (task) => task.status === status
        );
        return { success: true, tasks: filteredTasks };
      }
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};
