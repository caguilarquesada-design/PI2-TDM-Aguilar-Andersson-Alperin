import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import Profile from '../screens/Profile';
import CrearPost from '../screens/CrearPost';
import NavegacionStackSecundaria from './NavegacionStackSecundaria';

const Tab = createBottomTabNavigator();
export default function NavegacionTabs() {

    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen name='Home' component={NavegacionStackSecundaria} options={{ headerShown: false, tabBarIcon: () => <Entypo name="home" size={24} color="black" /> }} />
            <Tab.Screen name='CrearPost' component={CrearPost} options={{ headerShown: false, tabBarIcon: () => <AntDesign name="plus-circle" size={24} color="black" /> }} />
            <Tab.Screen name='Profile' component={Profile} options={{ headerShown: false, tabBarIcon: () => <Ionicons name="person-sharp" size={24} color="black" /> }} />
        </Tab.Navigator>
    );
}

