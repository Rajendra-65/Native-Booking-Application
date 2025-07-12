import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-web'
import COLORS from '../constatnts/colors'

const Loader = () => {
  return (
    <View
        style = {{
            flex : 1,
            justifyContent : "center",
            alignItems : "center",
            backgroundColor : COLORS.background
        }}
    >
      <ActivityIndicator
        size = {20}
        color = {COLORS.primary}
      />
    </View>
  )
}



export default Loader;