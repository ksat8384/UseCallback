import React, {useState, useCallback} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, Button} from 'react-native';
import List from './src/components/List';
import uuid from 'react-native-uuid';

const USERS = [
  {id: 'a', name: 'Batman'},
  {id: 'b', name: 'Superman'},
  {id: 'c', name: 'Ironman'},
  {id: 'i', name: 'Spiderman'},
];

const App = () => {
  console.log('Render : App');
  const [text, setText] = useState('');
  const [users, setUsers] = useState(USERS);

  const handleText = text => {
    setText(text);
  };

  const handleAddUser = () => {
    setUsers(users.concat({id: uuid.v1(), name: text}));
  };

  /**
   *
   * Whenever the App component re-renders after user types into input field, the
   * handleRemove handler function in the App gets re-defined. A new callback handler
   * will be passed to List component which leads to re-render of List and ListItem.
   *
   * If the user state changes by adding or removing an item from the list, the handler function gets
   * re-defined and the child components should re-render. However, if someone only types
   * into the input field, the function doesn't get re-defined and stays intact. Therefore,
   * the child components don't receive changed props and won't re-render for this case
   *
   * Memoized callback function to avoid re-defining this function everytime App re-renders
   *
   * This function only gets re-defined if any of its dependencies in the dependency array changes
   *
   */
  const handleRemove = useCallback(
    id => {
      setUsers(users.filter(user => user.id !== id));
    },
    [users],
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a new user to add here..."
        value={text}
        onChangeText={handleText}
      />

      <Button title="Add User" onPress={handleAddUser} />

      <List list={users} onRemove={handleRemove} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default App;
