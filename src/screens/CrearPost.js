import { Text, View, Pressable, StyleSheet } from 'react-native';
import DynamicForm from '../components/DynamicForm';

function CrearPost() {

    const [email, setEmail] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [errores, setErrores] = useState('');

    function onSubmit(email, descripcion) {
        db.collection('posts')
            .add({
                email: auth.currentUser.email,
                descripcion: descripcion,
                createdAt: Date.now(),
            })
            .then((response) => {
                props.navigation.navigate('HomeMenu');
            })
            .catch(error => {
                setErrores('Fallo en la creacion del Post.')
            });

    }
    ;
}

return (
    <View style={styles.container}>
        <Text style={styles.titulo} >Crear nuevo post</Text>
        <View style={styles.containerFrom}>
            <TextInput style={styles.input}
                keyboardType='default'
                placeholder='comentario'
                onChangeText={text => setDescripcion(text)}
                value={descripcion} />

            {
                errores !== '' ? <Text style={styles.textoError}>{errores}</Text>
                    :
                    null
            }

            <Pressable onPress={() => onSubmit(descripcion)} style={styles.boton1}>
                <Text style={styles.textoBoton} >Publicar post</Text>
            </Pressable>
        </View>

        <Pressable onPress={() => props.navigation.navigate('Login')} style={styles.boton}>
            <Text style={styles.textoBoton} >Ya tengo cuenta</Text>
        </Pressable>
    </View>
)
    

export default CrearPost;