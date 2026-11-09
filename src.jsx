import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Global } from '@emotion/react';

function NestedStyle({ visible }) {
  return <section>{visible && <Global styles={{ p: { color: 'teal' } }} />}</section>;
}

function App() {
  const [enabled, setEnabled] = useState(true);
  return <>
    <Global styles={enabled ? { body: { backgroundColor: 'aliceblue' } } : {}} />
    <NestedStyle visible={enabled} />
    <h1>Emotion Global empty styles reproduction</h1>
    <p>Click Disable, then Enable. Observe the browser console.</p>
    <button onClick={() => setEnabled(false)}>1. Disable</button>{' '}
    <button onClick={() => setEnabled(true)}>2. Enable</button>
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
