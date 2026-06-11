import { Text, View, Pressable, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

function Posts(props) {

    const [posts, setPosteos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setPosteos(posts);
                setLoading(false);
            })
    }, [])

    function likePost(post) {
        const usuario = auth.currentUser.email;
        const likes = post.data.likes ? post.data.likes : [];

        if (likes.includes(usuario)) {
            db.collection("posts")
                .doc(post.id)
                .update({
                    likes: firebase.firestore.FieldValue.arrayRemove(usuario)
                })
                .then(() => {
                    console.log("Like eliminado");
                });
        } else {
            db.collection("posts")
                .doc(post.id)
                .update({
                    likes: firebase.firestore.FieldValue.arrayUnion(usuario)
                })
                .then(() => {
                    console.log("Like agregado")
                });
        }
    }

    return (
        <View style={styles.container}>
            {
                loading ?
                    <Text style={styles.texto}>Cargando posteos...</Text>
                    :
                    <FlatList
                        data={posts}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            const likes = item.data.likes ? item.data.likes : [];

                            return (
                                <View style={styles.posteo}>

                                    <Text style={styles.fecha}>{item.data.email} posteó hoy</Text>

                                    <Text style={styles.descrip}> {item.data.descripcion}</Text>
                                    <View >

                                        <Pressable onPress={() => likePost(item)} style={styles.boton1}>
                                            <Text style={styles.textoBoton}>❤️ Like</Text>
                                            <Text style={styles.texto}>
                                                {likes.length} likes
                                            </Text>
                                        </Pressable>

                                        <Pressable style={styles.boton1}
                                            onPress={() => props.navigation.navigate('ComentarPosteo', { id: item.id })} >
                                            <Text style={styles.textoBoton}>🖋️Comentar</Text>
                                        </Pressable>

                                    </View>

                                </View>
                            );
                        }}
                    />
            }
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
        padding: 10,
    },
    posteo: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        borderWidth: 2,
    },
    fecha: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 10,
    },
    descrip: {
        fontSize: 25,
    },
    boton1: {
        backgroundColor: '#a1d7f0e5',
        flex: 2, 
        padding: 12,
        borderRadius: 10,
        borderColor: 'black',
        alignItems: 'center',
        marginTop: 20,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    textoBoton: {
        fontSize: 15,
        borderRadius: 10,
        padding: 10,
        fontWeight: 'bold',
        alignItems: 'center'
    },

});

export default Posts; 