import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Pressable,
  Alert,
} from "react-native";

export default function App() {
  const [enteredNoteText, setEnteredNoteText] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  function noteInputHandler(text) {
    setEnteredNoteText(text);
  }

  function addNoteHandler() {
    if (!enteredNoteText.trim()) return;

    setNotes((currentNotes) => [
      ...currentNotes,
      {id: Math.random().toString(), text: enteredNoteText},
    ]);

    setEnteredNoteText("");
  }

  function deleteNoteHandler(id) {
    setNotes((currentNotes) => currentNotes.filter((notes) => noteInputHandler.id));
    setSelectedNoteId(null);
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
      setEnteredNoteText("");
    }
  }

  function confirmDeleteHandler(id) {
    Alert.alert("Delete this note?", "Are you sure you want to delete this note?", [
      {text: "Cancel", style: "cancel"},
      {text: "Yes", style: "destructive",
        onPress: () => deleteNoteHandler(id)},
    ]);
  }

  function updateNoteHandler() {
    if (!enteredNoteText.trim()) return;
    
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === selectedNoteId ? {...note, text: enteredNoteText}: note,
      ),
    );

    setSelectedNoteId(null);
    setEnteredNoteText("");
  }

  function cancelEditHandler() {
    setSelectedNoteId(null);
    setEnteredNoteText("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
        styles={styles.textInputArea}
        placeholder="Add Note."
        onChangeText={noteInputHandler}
        value={enteredNoteText}
        ></TextInput>

        {selectedNoteId ? (
          <View style={{gap:6}}>
            <Button title="Update" onPress={updateNoteHandler}></Button>
            <Button title="Cancel" onPress={cancelEditHandler}></Button>
          </View>
        ):(
          <Button title="Add Note" onPress={addNoteHandler}></Button>
        )}
      </View>

      <View style={styles.goalContainer}>
        <Text style={styles.listTitle}>
          {selectedNoteId ? "Editing Note: ": "List of Notes: "}
        </Text>

        <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <Pressable
            onPress={() => openNoteHandler(item.id)}
            onLongPress={() => confirmDeleteHandler(item.id)}
            delayLongPress={300}
            style={({pressed}) => [
              styles.noteItem,
              selectedNoteId === item.id && styles.selectedItem,
              pressed && styles.pressedItem,
            ]}
          >
            <Text>{item.text}</Text>
          </Pressable>
        )}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#dfdfdf",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom:25,
    borderBottomWidth: 1,
    padding: 10,
    borderColor: "#dfdfdf",
  },
  textInputArea: {
    borderWidth: 2,
    borderColor: "#fff",
    width: "60%",
    marginRight: 8,
    padding: 8,
  },
  goalContainer: {
    flex: 1,
  },
  listTitle: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  noteItem: {
    borderWidth: 1,
    borderColor:"#fff",
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
  },
  selectedItem: {
    borderColor: "black",
    borderWidth: 2,
  },
  pressedItem: {
    opacity: 0.5,
  },
});