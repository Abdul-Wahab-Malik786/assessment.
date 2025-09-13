// import React from "react";
// import { Text, View, Image } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import HomeScreen from "../screens/HomeScreen";
// import OffersScreen from "../screens/OffersScreen";
// import OrdersScreen from "../screens/OrdersScreen";
// import RecipesScreen from "../screens/RecipesScreen";
// import ShoppingListScreen from "../screens/ShoppingListScreen";

// import { Icons, Images } from "../constants";
// const Tab = createBottomTabNavigator();

// const Navigation = () => (
//   <NavigationContainer>
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconSource;

//           switch (route.name) {
//             case "Home":
//               iconSource = Icons.home;
//               break;
//             case "Shopping List":
//               iconSource = Icons.shopping;
//               break;
//             case "Orders":
//               iconSource = Icons.orders;
//               break;
//             case "Offers":
//               iconSource = Icons.offers;
//               break;
//             case "Recipes":
//               iconSource = Icons.recipes;
//               break;
//             default:
//               iconSource = null;
//           }

//           return iconSource ? (
//             <Image
//               source={iconSource}
//               style={{
//                 width: 24,
//                 height: 24,
//                 tintColor: focused ? "#004d40" : "gray",
//               }}
//               resizeMode="contain"
//             />
//           ) : null;
//         },
//         tabBarActiveTintColor: "#004d40",
//         tabBarInactiveTintColor: "gray",
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Shopping List" component={ShoppingListScreen} />
//       <Tab.Screen name="Orders" component={OrdersScreen} />
//       <Tab.Screen name="Offers" component={OffersScreen} />
//       <Tab.Screen name="Recipes" component={RecipesScreen} />
//     </Tab.Navigator>
//   </NavigationContainer>
// );

// export default Navigation;
