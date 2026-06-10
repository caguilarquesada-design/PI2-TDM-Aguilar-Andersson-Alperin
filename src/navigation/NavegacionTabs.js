import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

import Profile from '../screens/Profile';
import Home from '../screens/Home';
import CrearPost from '../screens/CrearPost';
import NavegacionHomeStack from './NavegacionHomeStack';

const Tab = createBottomTabNavigator();
export default function NavegacionStack() {

    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen name='Home' component={Home} options={{ headerShown: false, tabBarIcon: () => <Entypo name="home" size={24} color="black" /> }} />
            <Tab.Screen name='Profile' component={Profile} options={{ headerShown: false, tabBarIcon: () => <AntDesign name="profile" size={24} color="black" /> }} />
            <Tab.Screen name='CrearPost' component={CrearPost} options={{ headerShown: false, tabBarIcon: () => <AntDesign name="plus-circle" size={24} color="black" /> }} />
        </Tab.Navigator>
    );
}

