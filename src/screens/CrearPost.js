import { Text, View, Pressable, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { auth, db } from '../firebase/config';

function CrearPost(props) {

    const [descripcion, setDescripcion] = useState('');
    const [errores, setErrores] = useState('');

    function onSubmit() {
        if (descripcion === ""){
            setErrores("El posteo no puede estar vacío");
            return
        }
        db.collection('posts')
            .add({
                email: auth.currentUser.email,
                descripcion: descripcion,
                createdAt: Date.now(),
                likes: [],
                comentarios: [],
            })
            .then(() => {
                setDescripcion('');
                setErrores("");
            })
            .catch(error => {
                setErrores('Fallo en la creacion del Post.')
                console.log(error)
                
            });
    }


return (
    <View style={styles.container}>
        <View style={styles.cuadrado}>
            <Text style={styles.titulo} >Nuevo post</Text>
        <View style={styles.containerFrom}>
            <TextInput style={styles.input}
                keyboardType='default'
                placeholder='comience a escribir...'
                onChangeText={text => setDescripcion(text)}
                value={descripcion} />

            {
                errores !== '' ? <Text style={styles.textoError}>{errores}</Text>
                    :
                    null
            }

            <Pressable onPress={() => onSubmit()} style={styles.boton1}>
                <Text style={styles.textoBoton} >Publicar</Text>
            </Pressable>
        </View>

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
    cuadrado: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        marginTop: 20,
        borderWidth: 2,

    },
    input: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 15,

    },

});


export default CrearPost;