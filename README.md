# Emotion Global empty styles reproduction

A mounted `Global` changes from non-empty styles to `{}` while a neighboring nested `Global` unmounts. Restoring the first `Global` throws `NotFoundError` in Emotion's `StyleSheet._insertTag`.

## Run

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, click **1. Disable**, then **2. Enable**. The development build reproduces a blank React root and a console error:

```text
NotFoundError: Failed to execute 'insertBefore' on 'Node':
The node before which the new node is to be inserted is not a child of this node.
```

## Why

When the first Global becomes empty, Emotion saves the following style element as `sheet.before` and flushes its own tags. The nested Global then unmounts and removes that following element. When the first Global becomes non-empty again, its `sheet.tags` is empty, so Emotion does not update `sheet.before` before using the detached element in `insertBefore`.

The nesting matters to the React commit traversal in this reproduction. There is no router, MUI, manually removed DOM node, or timer.

## Versions tested

- React / React DOM 18.3.1
- @emotion/react 11.14.0 and @emotion/sheet 1.4.0
- Chromium, development build

Production, SSR/hydration, and newer Emotion versions have not been tested. Related reports: [emotion-js/emotion#2919](https://github.com/emotion-js/emotion/issues/2919), [#1139](https://github.com/emotion-js/emotion/issues/1139) (similar stale anchor but a different scenario, fixed by #1142).
