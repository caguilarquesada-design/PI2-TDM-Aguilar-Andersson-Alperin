import { Text, View, Pressable, StyleSheet, TextInput, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';


function ComentarPosteo(props) {

    const id = props.route.params.id;

    const [posteo, setPosteo] = useState(null);
    const [comentario, setComentario] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        db.collection('posts')
            .onSnapshot(docs => {
                docs.forEach(doc => {
                    if (doc.id === id) {
                        setPosteo({
                            id: doc.id,
                            data: doc.data()
                        });
                    }
                });
            });
    }, []);

    function agregarComentario() {

        if (comentario === '') {
            setError('El comentario no puede estar vacío.');
        } else {
            db.collection('posts')
                .doc(id)
                .update({
                    comentarios: firebase.firestore.FieldValue.arrayUnion(
                        auth.currentUser.email + ': ' + comentario
                    )
                })
                .then(() => {
                    setComentario('');
                    setError('');
                })
                .catch(error => {
                    setError('No se pudo agregar el comentario.');
                    console.log(error);
                });
        }
    }

    if (posteo === null) {
        return (
            <View style={styles.container}>
                <Text>Cargando posteo...</Text>
            </View>
        );
    }

    const comentarios = posteo.data.comentarios ? posteo.data.comentarios : [];
    const likes = posteo.data.likes ? posteo.data.likes : [];

    return (
        <View style={styles.container}>
            <View style={styles.posteo}>

                <Text style={styles.fecha}>{posteo.data.email} posteó hoy</Text>

                <Text style={styles.descrip}>{posteo.data.descripcion}</Text>

                <Text style={styles.textoBoton}>{likes.length} likes</Text>

                <Text style={styles.texto}>Comentarios</Text>

                {
                    comentarios.length > 0 ?
                        <FlatList
                            data={comentarios}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.texto}>
                                    <Text>{item}</Text>
                                </View>
                            )}
                        />
                        :
                        <Text style={styles.textoBoton}>Todavía no hay comentarios</Text>
                }

                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Comentá aquí tu post...'
                    onChangeText={text => setComentario(text)}
                    value={comentario}
                />

                {
                    error !== '' ?
                        <Text style={styles.textoError}>{error}</Text>
                        :
                        null
                }

                <Pressable onPress={() => agregarComentario()} style={styles.boton1}>
                    <Text style={styles.textoBoton}>Publicar comentario</Text>
                </Pressable>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    texto: {
        fontSize: 15,
        padding: 5,
    },
    posteo: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },
    fecha: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 10,
    },
    descrip: {
        fontSize: 15,
    },
    boton1: {
        backgroundColor: '#45afe1e5',
        flex: 2,
        padding: 14,
        borderRadius: 10,
        borderColor: 'black',
        alignItems: 'center',
        marginTop: 15,
    },
    textoBoton: {
        fontSize: 15,
        padding: 10,
        fontWeight: 'bold'
    },
    textoError: {
        color: 'red',
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#a1d7f0e5',
        padding: 10,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 15,
    }
});


export default ComentarPosteo;
