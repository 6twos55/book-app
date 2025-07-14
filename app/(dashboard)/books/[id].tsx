import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import { useBook } from "../../../hooks/useBook";
import { useEffect, useState } from "react";
import { Models } from "appwrite";
import Spacer from "../../../components/Spacer";
import ThemedCard from "../../../components/ThemedCard";
import ThemedLoader from "../../../components/ThemedLoader";
import { Colors } from "../../../constants/Colors";
import ThemedButton from "../../../components/ThemedButton";
import { Ionicons } from "@expo/vector-icons";
import ThemedTextInput from "../../../components/ThemedTextInput";
import { showToast } from "../../../utils/toast";

const BookDetails = () => {
  const [book, setBook] = useState<Models.Document | null | undefined>(null);
  const [loading, setLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useLocalSearchParams();
  const { getBooks, getBookById, updateBook, deleteBook } = useBook();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const loadBook = async () => {
    const bookItem = await getBookById(id as string);

    setBook(bookItem);

    setTitle(bookItem?.title);
    setAuthor(bookItem?.author);
    setDescription(bookItem?.description);
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      await updateBook({ title, author, description }, id as string);
      await getBooks();
      setModalActive(false);
    } catch (error: any) {
      showToast("error", "You're offline!", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);

    try {
      await deleteBook(id as string);
      setBook(null);
      router.replace("/books");
    } catch (error: any) {
      showToast("error", "You're offline!", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBook();

    return () => {
      setBook(null);
    };
  }, [id]);

  if (!book) {
    return <ThemedLoader />;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedCard style={styles.card}>
        <ThemedCard style={styles.titleAndEdit}>
          <ThemedText style={styles.title}>{book?.title}</ThemedText>

          <ThemedButton
            onPress={() => setModalActive(true)}
            style={{
              backgroundColor: Colors.primary,
              padding: 8,
              justifyContent: "center",
            }}
          >
            <Ionicons size={20} name="pencil" color="#fff" />
          </ThemedButton>
        </ThemedCard>

        <ThemedText>Written by {book?.author}</ThemedText>
        <Spacer />

        <ThemedText title>Book description:</ThemedText>
        <Spacer height={10} />

        <ThemedText style={{ lineHeight: 25 }}>{book?.description}</ThemedText>
      </ThemedCard>

      <ThemedButton
        style={styles.delete}
        onPress={handleDelete}
        disabled={loading}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          {loading ? "Deleting..." : "Delete Book"}
        </Text>
      </ThemedButton>

      <Modal
        visible={modalActive}
        transparent
        onRequestClose={() => setModalActive(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalActive(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ThemedView
                style={[
                  {
                    backgroundColor: theme.background,
                  },
                  styles.modal,
                ]}
              >
                <ThemedText title={true} style={styles.heading}>
                  Update Book
                </ThemedText>
                <Spacer height={25} />

                <ThemedTextInput
                  style={styles.input}
                  placeholder="Book title"
                  value={title}
                  onChangeText={setTitle}
                />
                <Spacer height={20} />

                <ThemedTextInput
                  style={styles.input}
                  placeholder="Book author"
                  value={author}
                  onChangeText={setAuthor}
                />
                <Spacer height={20} />

                <ThemedTextInput
                  style={styles.multiline}
                  placeholder="Book description"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                />
                <Spacer height={20} />

                <ThemedButton
                  onPress={handleUpdate}
                  disabled={loading}
                  style={{ alignSelf: "center" }}
                >
                  <Text style={{ color: "#fff", textAlign: "center" }}>
                    {loading ? "Updating..." : "Update Book"}
                  </Text>
                </ThemedButton>
              </ThemedView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ThemedView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  card: {
    margin: 20,
    marginTop: 30,
  },
  titleAndEdit: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 0,
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  delete: {
    marginTop: 40,
    backgroundColor: Colors.warning,
    width: 200,
    alignSelf: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  modal: {
    borderRadius: 10,
    paddingVertical: 30,
    width: "100%",
  },
  heading: {
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    alignSelf: "stretch",
    marginHorizontal: 20,
  },
  multiline: {
    minHeight: 100,
    alignSelf: "stretch",
    marginHorizontal: 20,
  },
});
