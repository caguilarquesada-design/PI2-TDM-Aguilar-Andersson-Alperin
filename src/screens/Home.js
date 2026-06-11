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
        fontSize: 30,
        fontWeight: 'bold',
        padding: 20,
        color: 'black',
        marginBottom: 8,
    },
    subtitulo: {
      fontSize: 22, 
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'black',
      padding:10,
    }
});


export default Home;