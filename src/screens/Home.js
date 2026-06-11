import { Text, View} from 'react-native';
import Posts from '../components/Posts';

function Home() {

  return (
      <View>
        <Text>Pagina principal</Text>
        <Text>Posteos</Text>
        <Posts />
      </View>
  );
}

export default Home;