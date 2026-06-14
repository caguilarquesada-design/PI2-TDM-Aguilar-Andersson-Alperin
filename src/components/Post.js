import { Text, View, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

function Post(props) {

    const post = props.post;
    const likes = post.data.likes ? post.data.likes : []

    function likePost(post) {
        const usuario = auth.currentUser.email;

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
        <View style={styles.posteo}>

            <Text style={styles.fecha}>{post.data.email} posteó el {new Date(post.data.createdAt).toLocaleString()}</Text>

            <Text style={styles.descrip}> {post.data.descripcion}</Text>
            <View style={styles.container}>

                <Pressable onPress={() => likePost(post)} style={styles.botonLike}>
                    <Text style={styles.textoBoton}>❤️ Like</Text>
                    <Text style={styles.texto}>
                        {likes.length} likes
                    </Text>
                </Pressable>

                <Pressable style={styles.botonComent}
                    onPress={() => props.navigation.navigate('ComentarPosteo', { id: post.id })} >
                    <Text style={styles.textoBoton}>🖋️ Comentar</Text>
                </Pressable>

            </View>

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontSize: 15,
        padding: 10,
    },
    posteo: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 25,
        marginBottom: 15,
        borderWidth: 2,
        alignItems: 'center',
    },
    fecha: {
        fontSize: 15,
        color: 'gray',
        marginBottom: 10,
    },
    descrip: {
        fontSize: 25,
        marginBottom: 20,
    },
    botonComent: {
        backgroundColor: '#a1d7f0e5',
        padding: 12,
        borderRadius: 10,
        borderColor: 'black',
        alignItems: 'center',
        flexDirection: 'row',
    },
    botonLike: {
        backgroundColor: '#a1d7f0e5',
        padding: 12,
        borderRadius: 10,
        borderColor: 'black',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 20,
    },
    textoBoton: {
        fontSize: 15,
        borderRadius: 10,
        padding: 10,
        fontWeight: 'bold',
        alignItems: 'center'
    },

});

export default Post; 