import { Pressable, Text, View } from 'react-native';
import DynamicForm from '../components/DynamicForm';
import Posts from '../components/Posts';

function Home(){

    return(
        <View>
            <Text>Pagina principal</Text>
            <DynamicForm />
            <Posts />
        </View>
    )
}
export default Home; 