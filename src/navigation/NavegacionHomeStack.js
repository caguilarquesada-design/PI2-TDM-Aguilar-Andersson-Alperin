import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Home from "../screens/Home";
import ComentarPosteo from "../screens/ComentarPosteo";

const Stack = createNativeStackNavigator();

function NavegacionHomeStack(){
    return(
       <Stack.Navigator>
        <Stack.screen name= "Home" component= {Home}  options={{headerShown: false}} />
        <Stack.screen name= "ComentarPosteo" component= {ComentarPosteo}  options={{headerShown: false}} />
       </Stack.Navigator>
    )
}

export default NavegacionHomeStack;