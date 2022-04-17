import React from 'react';
import '../styles/note.css'
import { db } from '../firebase';
import { useState } from 'react';
import { setDoc, doc, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { format } from 'date-fns';
import { useEffect } from 'react';

function Note({parentState, setState}) {
    // const [state] = useState(parentState)
    const colRef = collection(db, 'notes')
    let textArea = document.getElementById("noteContent");
    const dateFormat = "MMddyyyy";
    
    useEffect(() => {

    }, [parentState])

    const changeText = (noteText) => {
        // retrieving text
        onSnapshot(colRef, (snapshot) => {
            // if no notes exist for the current date
            if(snapshot.docs.filter(doc =>
                doc.id === format(parentState.currentDate, dateFormat)
            ).length === 0) {
                // set the text area content to null
                const ta = document.getElementById("noteContent")
                ta.setAttribute("placeholder", "Enter a new note...");
                setState({
                    ...parentState,
                    contents: "1"
                })
            }
        })

        // adding a new entry
        // setDoc(doc(db, "notes", format(parentState.currentDate, dateFormat)),
        //        {note: noteText}
        // )
    }
    return (
        <div className='note'>
            {/* affects the text of the note */}
            <textarea
                id="noteContent"
                defaultValue="hello"
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