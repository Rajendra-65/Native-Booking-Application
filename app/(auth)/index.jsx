import { View, Image, Text } from "react-native";
import styles from "../../assets/styles/login.styles";
import { useState } from "react";
import COLORS from "../../constatnts/colors";
import { Ionicons } from '@expo/vector-icons';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  const handleLogin = () => {

  }

  return (
    <View
        style = {styles.container}
    >
      <View style = {styles.topIllustration}>
        <Image 
            source = {require("../../assets/images/Online-article-cuate.png")}
            style = {styles.illustrationImage}
            resizeMode = "contain"
        />      
      </View>
      <View style = {styles.card}>
        <View style = {styles.formContainer}>
            <View style = {styles.inputGroup}>
                <Text style = {styles.label}>Email</Text>
                <View style = {styles.inputContainer}>
                    <Ionicons
                        name = "fill-outline"
                        size= {20}
                        color = {COLORS.primary}
                        style = {styles.inputIcon}
                    />
                </View>
            </View>

        </View>
      </View>
    </View>
  );
};

export default Login;
