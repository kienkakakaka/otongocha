import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../config";
function Sigup() {
  const [userName, setUsername] = useState();
  const [passwords, setPassword] = useState();

  const HanderSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, userName, passwords)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <div>
      <input
        onChange={(e) => setUsername(e.target.value)}
        type="email"
        value={userName}
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="text"
        value={passwords}
      />
      <button onClick={HanderSubmit}>Sigup</button>
    </div>
  );
}

export default Sigup;
