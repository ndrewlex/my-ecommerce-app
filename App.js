import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { APP_SCREENS } from "./constants/screens";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import AuthScreen from "./screens/AuthScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

const Stack = createNativeStackNavigator();

function AppRouter() {
  const { user } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!user.isAuth ? (
        <Stack.Navigator>
          <Stack.Screen
            name={APP_SCREENS.LOGIN}
            component={LoginScreen}
            options={{
              title: "Ecommerce App",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={APP_SCREENS.SIGN_UP}
            component={SignupScreen}
            options={{
              title: "Ecommerce App",
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name={APP_SCREENS.AUTH}
            component={AuthScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
