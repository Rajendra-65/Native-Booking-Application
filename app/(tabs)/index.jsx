import { useAuthStore } from '@/store/authStore'
import { Text, TouchableOpacity, View } from 'react-native'

const Index = () => {
  const {logout} = useAuthStore()
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress = {logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Index