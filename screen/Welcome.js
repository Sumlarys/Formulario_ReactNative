import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import RegisterForm from './RegisterForm';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <Text>Gracias por registrarte.</Text>
      <Button title='Log out' onPress={() => navigation.goBack()}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#daf7a6'},
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default WelcomeScreen;
