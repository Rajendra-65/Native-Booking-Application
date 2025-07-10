import styles from "@/assets/styles/home.styles";
import COLORS from "@/constatnts/colors";
import { API_URL } from "@/constatnts/URLConstants";
import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View
} from "react-native";
import { formatPublishDate } from "../../lib/utils.js";

export default function Home() {
  const {logout} = useAuthStore();
  const [books,setBooks] = useState([]);
  const [loading,setLoading] = useState(true);
  const [refreshing,setRefreshing] = useState(false);
  const [page , setPage ] = useState(1);
  const [hasMore , setHasMore] = useState(true)

  const fetchBooks = async (pageNum = 1, refresh = false) => {
    const token = await AsyncStorage.getItem('token');
    try {
      if(refresh) setRefreshing(true)
      else if(pageNum = 1) setLoading(true)
      console.log(token)
      const response = await fetch(`${API_URL}/api/books?page=${pageNum}&limit=5`,{
        headers : {Authorization : `Bearer ${token}`}
      })

      const data = await response.json()

      setBooks(data.books)

      if (!response.ok) throw new Error(data.message || "Failed to fetch Books")
      
      // setBooks((prevBooks) => [...prevBooks , ...data.books]);

      setHasMore(pageNum < data.totalpages);
      setPage(pageNum)
    } catch (error) {
      console.log(token)
      console.log("Error in fetching Books",error)
    } finally{
      if (refresh) setRefreshing(false);
      else setLoading(false)
    }
  }

  const handleLoadMore = async () => {

  }

  const renderItem = ({item}) => (
    <View 
      style = {styles.bookCard}
    >
      <View style = {styles.bookHeader}>
        <View style = {styles.userInfo}>
          <Image 
            source = {{uri : item.user.profileImage}}
            style = {styles.avatar}
          />
          <Text style = {styles.username}>
            {item.user.username}
          </Text>
        </View>
      </View>
      <View style = {styles.bookImageContainer}>
        <Image 
          source = {item.image}
          style = {styles.bookImage}
          contentFit = "cover"
        />
      </View>

      <View 
        style = {styles.bookDetails}
      >
        <Text  
          style = {styles.bookTitle}
        >
          {item.title}
        </Text>
        <View 
          style = {styles.ratingContainer}
        >
          {renderItem}
        </View>
        <Text 
          style = {styles.caption}
        >
          {item.caption}
        </Text>
        <Text
          style = {styles.date}
        >
          Shared on {formatPublishDate(item.createdAt)}
        </Text>
      </View>
    </View>
  )

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1 ; i <= 5 ; i++) {
      stars.push(
        <Ionicons
          key = {i}
          name = {i <= rating ? "star" : "star-outline"}
          size = {16}
          color = {i <= rating ? "#f4b000" : COLORS.textSecondary}
          style = {{ marginRight : 2 }}
        />
      )
    }
  }

  useEffect(()=>{
    fetchBooks()
  },[])

  return(
    <View
      style = {styles.container}
    >
      <FlatList
        data = {books}
        renderItem = {renderItem}
        keyExtractor = {(item)=>item._id}
        contentContainerStyle = {styles.listContainer}
        showsVerticalScrollIndicator = {false}
      />
    </View>
  )
}