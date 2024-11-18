import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ImageBackground } from 'react-native-web';

// Esquema de validación con Yup
const validationSchema = yup.object().shape({
  fullName: yup.string().required('Nombre completo es requerido'),
  email: yup
    .string()
    .email('Correo inválido')
    .required('Correo electrónico es requerido'),
  password: yup
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('Contraseña es requerida'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirmación de contraseña es requerida'),
  country: yup.string().required('Debes seleccionar un país'),
});

// Imagen de fondo
const image = {
  uri: 'https://dynastytravel.com.sg/wp-content/uploads/2023/07/MicrosoftTeams-image-3-scaled.jpg',
};

const RegisterForm = ({ navigation }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  // Obtener lista de países
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryNames = response.data.map((country) => country.name.common);
        setCountries(countryNames.sort());
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar la lista de países.');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmitForm = (values) => {
    Alert.alert('Éxito', '¡Registro completado!');
    navigation.navigate('Welcome');
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={{ flex: 1 }}> {/**Añadido el style directamente con flex:1 para que cubra toda la pantalla */}
      <ScrollView contentContainerStyle={{ ...styles.container, flexGrow: 1 }}> {/**flexGrow: 1 asegura que el contenido pueda desplazarse completamente*/}
        <View>
          <Text style={styles.title}>Formulario de Registro</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Formik
              initialValues={{
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
                country: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmitForm}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
              }) => (
                <>
                  <Text style={styles.text}>Nombre Completo:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    value={values.fullName}
                  />
                  {touched.fullName && errors.fullName && (
                    <Text style={styles.error}>{errors.fullName}</Text>
                  )}

                  <Text style={styles.text}>Correo Electrónico:</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}

                  <Text style={styles.text}>Contraseña:</Text>
                  <TextInput
                    style={styles.input}
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}

                  <Text style={styles.text}>Confirmar Contraseña:</Text>
                  <TextInput
                    style={styles.input}
                    secureTextEntry
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.error}>{errors.confirmPassword}</Text>
                  )}

                  <Button
                    title="Fecha de Nacimiento"
                    onPress={() => setOpen(true)}
                  />
                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    maximumDate={new Date()}
                    onConfirm={(date) => {
                      setOpen(false);
                      setDate(date);
                    }}
                    onCancel={() => setOpen(false)}
                  />

                  <Text style={styles.text}>País de Residencia:</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={values.country}
                      onValueChange={(itemValue) => setFieldValue('country', itemValue)}
                    >
                      <Picker.Item label="Seleccione un país" value="" />
                      {countries.map((country) => (
                        <Picker.Item key={country} label={country} value={country} />
                      ))}
                    </Picker>
                  </View>
                  {touched.country && errors.country && (
                    <Text style={styles.error}>{errors.country}</Text>
                  )}

                  <Button title="Registrarse" onPress={handleSubmit} />
                </>
              )}
            </Formik>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'pink',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default RegisterForm;

