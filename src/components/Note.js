import React from 'react';
import '../styles/note.css'
import { db } from '../firebase';
import { setDoc, doc, collection, getDoc, onSnapshot } from 'firebase/firestore';
import { format } from 'date-fns';
import { useEffect } from 'react';

function Note({parentState, setState}) {
    const colRef = collection(db, 'notes');
    const dateFormat = "MMddyyyy";
    const docRef = doc(db, 'notes', format(parentState.currentDate, dateFormat))
    
    useEffect(() => {
        const textArea = document.getElementById("noteContent")

        // retrieving text
        onSnapshot(colRef, (snapshot) => {
            // if no notes exist for the current date
            let arr = snapshot.docs.filter(doc =>
                doc.id === format(parentState.currentDate, dateFormat)
            )
            if(arr.length === 0) {
                textArea.setAttribute("placeholder", "Enter a new note...");
            } else {
                if(textArea.value === "") {
                    textArea.setAttribute("placeholder", "Enter a new note...");
                    return;
                }
                textArea.setAttribute("placeholder", "")
                getDoc(docRef).then((doc) => {
                    textArea.value = doc.data().note
                })
            }
        })
    }, [parentState, colRef, docRef])

    const changeText = (noteText) => {
        setState({
            ...parentState,
            contents: "noteText"
        })

        // adding a new entry
        setDoc(doc(db, "notes", format(parentState.currentDate, dateFormat)),
               {note: noteText}
        )
    }

    return (
        <div className='note'>
            {/* affects the text of the note */}
            <textarea
                id="noteContent"
            />
            <button onClick={() => {
                changeText(document.getElementById("noteContent").value)
            }}>
                Save
            </button>
        </div>
    )
}

export default Note