import { FlatList, Pressable, StyleSheet } from "react-native";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import Spacer from "../../../components/Spacer";
import { useBook } from "../../../hooks/useBook";
import ThemedCard from "../../../components/ThemedCard";
import { Colors } from "../../../constants/Colors";
import { useRouter } from "expo-router";
import ThemedLoader from "../../../components/ThemedLoader";

const Books = () => {
  const { books } = useBook();
  const router = useRouter();

  return (
    <ThemedView safe style={styles.container}>
      <Spacer />

      <ThemedText title={true} style={styles.heading}>
        Your Reading List
      </ThemedText>
      <Spacer height={20} />

      {books ? (
        books.length > 0 ? (
          <FlatList
            data={books}
            keyExtractor={(item) => item.$id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <Pressable onPress={() => router.push(`/books/${item.$id}`)}>
                <ThemedCard style={styles.card}>
                  <ThemedText style={styles.title}>{item.title}</ThemedText>
                  <ThemedText sub>Written by {item.author}</ThemedText>
                </ThemedCard>
              </Pressable>
            )}
          />
        ) : (
          <ThemedView
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ThemedText style={[styles.heading, { fontSize: 18 }]}>Book list is empty, shall we fix that?</ThemedText>
            <Spacer height={5} />
            
            <Pressable onPress={() => router.push("/create")} style={{ padding: 10 }}>
              <ThemedText>Go to create screen</ThemedText>
            </Pressable>
          </ThemedView>
        )
      ) : (
        <ThemedLoader />
      )}
    </ThemedView>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  heading: {
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    marginTop: 20,
    paddingBottom: 35,
  },
  card: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 10,
    paddingLeft: 14,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 6,
  },
});
