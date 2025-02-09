import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { open } from '@tauri-apps/plugin-dialog';
import { emit } from '@tauri-apps/api/event'

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  // Command
  function simpleCommand() {
    invoke("simple_command");
  }

  invoke('command_with_message', {message: "some message"}).then((message) => {
    console.log(message)
  })

  invoke('command_with_object', {message: {field_str: 'some message', field_u32: 12}}).then((message) => {
    console.log(message)
  })

  for (let arg of [1, 2]) {
    invoke('command_with_error', {arg}).then((message) => {
      console.log('command_with_error', message);
    }).catch((message) => {
      console.error('command_with_error', message)
    })
  }

  // Tauri API
  function openDialog() {
    open({multiple: false}).then((file) => console.log(file))
  }

  // IPC
  function emitMessage() {
    emit('front-to-back', "hello from front")
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
      <button type="button" onClick={simpleCommand}>Click to Simple Command</button>
      <button type="button" onClick={openDialog}>Click to open dialog</button>
      <button type="button" onClick={emitMessage}>Click to emit message</button>
    </main>
  );
}

export default App;
