import { Text, View, StyleSheet} from 'react-native';
import Posts from '../components/Posts';

function Home(props) {

  return (
      <View>
        <Text style={styles.titulo}>Pagina principal</Text>
        <Text style={styles.subtitulo}>Posteos</Text>
        <Posts  navigation={props.navigation} />
      </View>
  );
}
const styles = StyleSheet.create({
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    subtitulo: {
      fontSize: 20, 
      fontWeight: 'bold',
      marginBottom: 15,
    }
});


export default Home;