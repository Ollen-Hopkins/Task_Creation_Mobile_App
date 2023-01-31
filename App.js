import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';


export default function App() {
  const [textInput, setTextInput] = useState('');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      task: 'First task',
      completed: true
    },
    {
      id: 2,
      task: 'Second task',
      completed: false
    }
  ]);

  const ListItem = ({ todo }) => {
    return (
      <View style={styles.listItem}>
        <View style={{ flex: 1 }}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 15,
            color: Colors.primary,
            textDecorationLine: todo?.completed ? 'line-through' : 'none'
          }}>
            {todo?.task}</Text>
        </View>
        {
          !todo?.completed && (
            <TouchableOpacity 
              style={[styles.actionIcon]}
              onPress={() => markTaskComplete(todo?.id)}
              >
              <Icon name='done' size={20} color={Colors.white} />
            </TouchableOpacity>
          )
        }
        <TouchableOpacity 
          style={[styles.actionIcon, { backgroundColor: 'white' }]}
          onPress={() => deleteTask(todo?.id)}
        >
          <Icon name='delete' size={25} />
        </TouchableOpacity>
      </View>
    );
  };

  const addTask = () => {
    if (textInput === '') {
      Alert.alert(
        'Error',
        'Please input Task'
      );
    }

    else {
      const newTask = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTextInput('');
    }
  };

  const markTaskComplete = (taskId) => {
    const newTasks = tasks.map((item) => {
      if (item.id === taskId){
        return {...item, completed: true}
      }
      else {
        return item;
      }
    });
    setTasks(newTasks);
  };

  const deleteTask = (taskId) => {
    const newTasks = tasks.filter(item => item.id !== taskId);
    setTasks(newTasks);
  };

  const clearTasks = () => {
    setTasks([])
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.primary }}>
          Unavailable App
        </Text>
        <Icon name='delete' size={25} color='red' onPress={clearTasks} />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={tasks}
        renderItem={({ item }) => <ListItem todo={item} />}
      />
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Add Task'
            style={{ textAlign: 'left', marginTop: 10 }}
            value={textInput}
            onChangeText={(text) => setTextInput(text)} />
        </View>
        <TouchableOpacity onPress={addTask}>
          <View style={styles.iconContainer}>
            <Icon name='add' color={Colors.white} size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const Colors = {
  primary: '#1f145C',
  white: '#fff'
};

const styles = StyleSheet.create({
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 3
  },

  header: {
    marginTop: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  listItem: {
    padding: 20,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    color: Colors.primary,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
  },

  inputContainer: {
    backgroundColor: Colors.white,
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20
  },

  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: Colors.primary,
    borderRadius: 25,
    elevation: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }

});
