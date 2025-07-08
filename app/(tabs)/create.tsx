import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text
} from 'react-native';

const Create = () => {
  const [title, setTitle] = useState("");
  const [caption,setCaption] = useState("");
  const [rating,setRating] = useState(3);
  const [image,setImage] = useState(null); // to display the selected Image
  const [imageBase64,setImageBase64] = useState(null);
  const [loading,setLoading]  = useState(false);

  const router = useRouter();

  const pickImage = async () => {};

  const handleSubmit = async () => {};


  return (
    <KeyboardAvoidingView
      style = {{flex: 1}}
      behavior = {Platform.OS === 'ios' ? "padding" : "height"}
    >
      <Text>create</Text>
    </KeyboardAvoidingView>
  )
}

export default Create