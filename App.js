import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const App = () => {
  const [imageUri, setImageUri] = useState(null);

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos insuficientes', 'Necesitas otorgar permisos para acceder a la biblioteca de medios');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0]; // Obtenemos la primera imagen seleccionada
      setImageUri(selectedImage.uri);
    }
  };

  const uploadImage = async () => {
    try {
      // if (!imageUri) {
      //   Alert.alert('Error', 'No se ha seleccionado ninguna imagen');
      //   return;
      // }

      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      formData.append('funcion','subirImagen')
      const response = await axios.post('https://c09f-181-33-163-15.ngrok-free.app/api/publicaciones', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgxZDVhMTI0ZmU1MjU4OTg4MDc5ZjEiLCJ0ZWxlZm9ubyI6IjMxMjU0MzAzMjEiLCJjb2RpZ29QYWlzIjoiNTciLCJub21icmUiOm51bGwsImNvcnJlbyI6bnVsbCwiZmVjaGFSZWdpc3RybyI6IjIwMjMtMDYtMDhUMTM6MjA6MzMuMDUxWiIsImlhdCI6MTY4NjIzMDQzM30.lhQYooHEkQ4Mbxw6bmVcQ5eenjlavB5Di5EhGc3e8yY'
        },
      });
      
      console.log(response.data);
      Alert.alert('Éxito', 'La imagen se ha subido correctamente');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al subir la imagen');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginBottom: 20 }} />}
      <Button title="Seleccionar imagen" onPress={selectImage} />
      <Button title="Subir imagen" onPress={uploadImage} />
    </View>
  );
};

export default App