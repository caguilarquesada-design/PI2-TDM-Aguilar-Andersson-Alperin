import { Pressable, Text, View, StyleSheet, Flatlist } from 'react-native';
import DynamicForm from '../components/DynamicForm';
import { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import firebase from "firebase";

function Home(props) {

    const [posteos, setPosteos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot(docs => {
                let posts = [];

                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });

                setPosteos(posts);
                setLoading(false);
            });
    }, []);

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
            <Text style={styles.titulo}>Página principal</Text>
            {
                loading ?
                    <Text>Cargando posteos...</Text>
                    :
                    <FlatList
                        data={posteos}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            const likes = item.data.likes ? item.data.likes : [];

                            return (
                                <View style={styles.posteo}>

                                    <Text style={styles.usuario}>{item.data.email} posteó hoy</Text>

                                    <Text style={styles.descripcion}> {item.data.descripcion}</Text>
                                    <View style={styles.acciones}>

                                        <Pressable onPress={() => likePost(item)} style={styles.likesContainer}>
                                            <Text style={styles.corazon}>Like</Text>
                                            <Text style={styles.likesTexto}>
                                                {likes.length} likes
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            onPress={() => props.navigation.navigate('Comments', { id: item.id })} style={styles.botonComentar}>
                                            <Text style={styles.textoComentar}>Comentar</Text>
                                        </Pressable>

                                    </View>

                                </View>
                            ); }}
                            />}
                             </View>);}

export default Home; 