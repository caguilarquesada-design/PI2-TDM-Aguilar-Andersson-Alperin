import { Text, View, Pressable, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import Post from './Post';

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

    return (
        <View style={styles.container}>
            {
                loading ?
                    <Text style={styles.texto}>Cargando posteos...</Text>
                    :
                    <FlatList
                        data={posts}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Post
                                post={item}
                                navigation={props.navigation}
                            />
                        )}
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
});

export default Posts; 