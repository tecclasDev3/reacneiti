import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function ImageComponent() {
    const [imagesUri, setImagesUri] = useState([]);

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
      console.log(result.assets);
      const selectedImage = result.assets[0]; // Obtenemos la primera imagen seleccionada
      // let nameImage = selectedImage.uri.split('/').pop();
      // nameImage = nameImage.split(".")
      // console.log(nameImage , 'splitttt');
      // const objImg = {
      //   uri: selectedImage.uri,
      //   type: selectedImage.type,
      //   name: nameImage[0],
      // }
      let resultImageUri = result.assets.map( imagen => imagen.uri)
      console.log(resultImageUri);
      setImagesUri(resultImageUri);
    }
  };

  const uploadImage = async () => {
    try {
      // if (!imageUri) {
      //   Alert.alert('Error', 'No se ha seleccionado ninguna imagen');
      //   return;
      // }

      const formData = new FormData();
      imagesUri.forEach( (image , index)=> {
        // console.log(image);
        // formData.append(`file[${index}]`, {
        //   uri: image.uri,
        //   type: image.type,
        //   name: image.name,
        // });
        formData.append(`file`,{
          uri:image,
          type:'image/jpeg',
          name:`image${index}`
        });

      })
      // formData.append('file', {...imagesUri})
      formData.append('funcion','subirImagen')
      console.log(formData,' -------------- formdata');
      const response = await axios.post(' https://6c0e-181-33-163-15.ngrok-free.app/api/publicaciones', formData, {
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

  console.log(imagesUri);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* {imagesUri &&  imagesUri?.map( ({uri },index) => {
    
        <Image key={index} source={ uri } style={{ width: 50, height: 50, marginBottom: 10 }} />
      
       } )} */}
      
      <Button title="Seleccionar imagen" onPress={selectImage} />
      <Button title="Subir imagen" onPress={uploadImage} />
    </View>
  )
}
