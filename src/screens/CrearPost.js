import { Text, View, Pressable, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { auth, db } from '../firebase/config';

function CrearPost(props) {

    const [descripcion, setDescripcion] = useState('');
    const [errores, setErrores] = useState('');

    function onSubmit() {
        db.collection('posts')
            .add({
                email: auth.currentUser.email,
                descripcion: descripcion,
                createdAt: Date.now(),
                likes: [],
                comentarios: [],
            })
            .then((response) => {
                props.navigation.navigate('Home');
            })
            .catch(error => {
                setErrores('Fallo en la creacion del Post.')
                console.log(error)
                
            });
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

            <Pressable onPress={() => onSubmit()} style={styles.boton1}>
                <Text style={styles.textoBoton} >Publicar post</Text>
            </Pressable>
        </View>
    </View>
)}

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
    textoBoton: {
        color: 'black',
        fontWeight: '600',
    },
});


export default CrearPost;