import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { APP_SCREENS } from "../constants/screens";
import { CartProvider } from "../contexts/CartContext";
import { color } from "../styles/color";
import CartScreen from "./CartScreen";
import CheckoutScreen from "./CheckoutScreen";
import HomeScreen from "./HomeScreen";
import ProductDetailsScreen from "./ProductDetailsScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AuthTab() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: color.white,
      }}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={APP_SCREENS.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarActiveTintColor: color.primary,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={24}
              color={focused ? color.primary : color.black}
            />
          ),
        }}
      />
      <Tab.Screen
        name={APP_SCREENS.CART}
        component={CartScreen}
        options={{
          tabBarLabel: "Cart",
          tabBarActiveTintColor: color.primary,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="cart"
              size={24}
              color={focused ? color.primary : color.black}
            />
          ),
        }}
      />
      <Tab.Screen
        name={APP_SCREENS.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarActiveTintColor: color.primary,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={24}
              color={focused ? color.primary : color.black}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AuthScreen() {
  return (
    <CartProvider>
      <Stack.Navigator
        initialRouteName={APP_SCREENS.AUTH_TAB}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={APP_SCREENS.AUTH_TAB}
          component={AuthTab}
          options={{
            tabBarLabel: "Home",
          }}
        />
        <Stack.Screen name={APP_SCREENS.CHECKOUT} component={CheckoutScreen} />
        <Stack.Screen
          name={APP_SCREENS.PRODUCT_DETAILS}
          component={ProductDetailsScreen}
        />
      </Stack.Navigator>
    </CartProvider>
  );
}
