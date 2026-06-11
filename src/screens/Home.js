import { Text, View} from 'react-native';
import Posts from '../components/Posts';

function Home(props) {

  return (
      <View>
        <Text>Pagina principal</Text>
        <Text>Posteos</Text>
        <Posts  navigation={props.navigation} />
      </View>
  );
}

export default Home;