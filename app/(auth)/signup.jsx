import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
import styles from "../../assets/styles/login.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constatnts/colors";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const {user , isLoading, register} = useAuthStore();

  console.log("user is Here: ",user)

  const router = useRouter();

  const handleSignUp = async () => {
    const result = await register(username,email,password);
    if(!result.success) Alert.alert("Error",result.error)
    setUserName('');
    setEmail('');
    setPassword('');
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>BookWorm</Text>
            <Text style={styles.subtitle}>Share your favorite reads</Text>
          </View>
          {/* form container */}
          <View style={styles.formContainer}>
            {/* Username Inupt */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="JohnDoe"
                  placeholderTextColor={COLORS.placeholderText}
                  value={username}
                  onChangeText={setUserName}
                  autoCapitalize="none"
                />
              </View>
            </View>
            {/* password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your Email"
                  placeholderTextColor={COLORS.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
            {/* password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowpassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Signup</Text>
              )}
            </TouchableOpacity>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account ?</Text>

                <TouchableOpacity
                  onPress = {()=>router.back()}
                >
                  <Text style={styles.link}>Login</Text>
                </TouchableOpacity>

            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;
