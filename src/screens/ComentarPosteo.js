import { Text, View, Pressable, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { auth, db } from '../firebase/config';


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

                <Text style={styles.usuario}>{posteo.data.email} posteó hoy</Text>

                <Text style={styles.descripcion}>{posteo.data.descripcion}</Text>

                <Text style={styles.likes}>corazones {likes.length} likes</Text>

                <Text style={styles.subtitulo}>Comentarios</Text>

                {
                    comentarios.length > 0 ?
                        <FlatList
                            data={comentarios}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.comentario}>
                                    <Text>{item}</Text>
                                </View>
                            )}
                        />
                    :
                        <Text style={styles.sinComentarios}>Todavía no hay comentarios</Text>
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

                <Pressable onPress={() => agregarComentario()} style={styles.boton}>
                    <Text style={styles.textoBoton}>Publicar comentario</Text>
                </Pressable>

            </View>

        </View>
    );
}


export default ComentarPosteo;
