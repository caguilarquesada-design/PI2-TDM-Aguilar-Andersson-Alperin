import { Text, View, Pressable, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { auth, db } from '../firebase/config';


function ComentarPosteo(props) {

    const id = props.route.params.id;

    const [comentario, setComentario] = useState('');
    const [error, setError] = useState('');

    function agregarComentario() {
        db.collection('posts')
            .doc(id)
            .update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({
                    email: auth.currentUser.email,
                    texto: comentario
                })
            })
            .then(() => {
                setComentario('');
                setError('');
            })
            .catch(error => {
                setErrores('No se pudo agregar el comentario')
                console.log(error)

            });

    }

    return (
        <View>
            <Text>Comentar posteo</Text>

            <TextInput
                placeholder="Comentario"
                onChangeText={(text) => setComentario(text)}
                value={comentario}

            />

            {
                errores !== '' ? <Text style={styles.textoError}>{errores}</Text>
                    :
                    null
            }

            <Pressable onPress={() => agregarComentario()} >
                <Text> Comentario</Text>
            </Pressable>

        </View>
    )

}

export default ComentarPosteo;
