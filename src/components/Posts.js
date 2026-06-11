import { Text, View, Pressable, StyleSheet, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase/config';
import { FlatList } from 'react-native';

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
        <View>
            <Text >Página principal</Text>
            {
                loading ?
                    <Text>Cargando posteos...</Text>
                    :
                    <FlatList
                        data={posts}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            const likes = item.data.likes ? item.data.likes : [];

                            return (
                                <View >

                                    <Text>{item.data.email} posteó hoy</Text>

                                    <Text > {item.data.descripcion}</Text>
                                    <View >

                                        <Pressable onPress={() => likePost(item)} >
                                            <Text >Like</Text>
                                            <Text >
                                                {likes.length} likes
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            onPress={() => props.navigation.navigate('Comments', { id: item.id })} >
                                            <Text >Comentar</Text>
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

export default Posts; 