
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ToDoScreen = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error("Error loading todos from storage:", error);
    }
  };

  const saveTodos = async (todos) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos to storage:", error);
    }
  };

  const handleAddTodo = () => {
    if (!text.trim()) {
      Alert.alert("Validation Error", "ToDo item cannot be empty.");
      return;
    }

    const newTodos = editId
      ? todos.map((todo) => (todo.id === editId ? { ...todo, text } : todo))
      : [...todos, { id: Date.now().toString(), text, completed: false }];

    setTodos(newTodos);
    saveTodos(newTodos);
    setText('');
    setEditId(null);
  };

  const handleDeleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const handleEditTodo = (todo) => {
    setText(todo.text);
    setEditId(todo.id);
  };

  const handleToggleComplete = (id) => {
    const newTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={item.completed ? styles.todoTextCompleted : styles.todoText}>{item.text}</Text>
      <View style={styles.todoActions}>
        <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
          <Text style={styles.todoActionText}>{item.completed ? 'Undo' : 'Complete'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEditTodo(item)}>
          <Text style={styles.todoActionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
          <Text style={styles.todoActionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ToDo App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter ToDo item"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
        <Text style={styles.addButtonText}>{editId ? 'Edit ToDo' : 'Add ToDo'}</Text>
      </TouchableOpacity>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f8f8f8',
    },
    header: {
      fontSize: 24,
      marginBottom: 16,
      textAlign: 'center',
      color: '#333',
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      paddingHorizontal: 8,
      marginBottom: 16,
      borderRadius: 5,
    },
    addButton: {
      backgroundColor: '#0066cc',
      padding: 12,
      alignItems: 'center',
      marginBottom: 16,
      borderRadius: 5,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    todoItem: {
      backgroundColor: '#fff',
      padding: 16,
      marginBottom: 10,
      borderRadius: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    todoText: {
      fontSize: 16,
      color: '#333',
    },
    todoTextCompleted: {
      fontSize: 16,
      textDecorationLine: 'line-through',
      color: '#aaa',
    },
    todoActions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 8,
    },
    todoActionText: {
      color: '#0066cc',
      fontWeight: 'bold',
    },
    deleteText: {
      color: '#ff3333',
    },
    emptyText: {
      textAlign: 'center',
      color: '#999',
      fontSize: 16,
      marginTop: 20,
    },
  });
  
  export default ToDoScreen;