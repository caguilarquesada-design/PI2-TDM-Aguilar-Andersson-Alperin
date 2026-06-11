import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import HomeMenu from '../components/HomeMenu';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();

export default function NavegacionStack() {
    
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={ Login } options={ { headerShown: false } }/>
          <Stack.Screen name='HomeMenu' component={ HomeMenu } options={ { headerShown: false } }/>
          <Stack.Screen name='Register' component={ Register } options={ { headerShown: false } }/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

