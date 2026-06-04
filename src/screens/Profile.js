import { Text, View, Pressable, StyleSheet} from 'react-native';

function Profile(props) {

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Perfil</Text>
            <Pressable onPress={() => props.navigation.navigate('Login')} 
            style={styles.boton}>
                <Text style={styles.textoBoton}>Desloguearse</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        width: '100%',
        backgroundColor: '#f2f2f2',
    },
    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    boton: {
        backgroundColor: '#4db6e8',
        padding: 13,
        borderRadius: 5,
        marginBottom: 12,
        alignItems: 'center',
    },
    textoBoton: {
        color: 'black',
        fontWeight: '600',
    },
});

export default Profile; 