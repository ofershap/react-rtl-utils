# react-rtl-utils

[![npm version](https://img.shields.io/npm/v/react-rtl-utils.svg)](https://www.npmjs.com/package/react-rtl-utils)
[![npm downloads](https://img.shields.io/npm/dm/react-rtl-utils.svg)](https://www.npmjs.com/package/react-rtl-utils)
[![CI](https://github.com/ofershap/react-rtl-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/ofershap/react-rtl-utils/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Hooks and components that make RTL layouts effortless — auto-detect text direction, flip styles, and handle bidi content in React.

```tsx
import { useTextDirection, BidiText } from "react-rtl-utils";

const dir = useTextDirection("שלום עולם"); // "rtl"
<BidiText>שלום עולם</BidiText>  // auto dir="rtl"
<BidiText>Hello World</BidiText> // auto dir="ltr"
```

> For Hebrew, Arabic, Persian, and Urdu apps. Zero dependencies.

![Demo](assets/demo.gif)

## Install

```bash
npm install react-rtl-utils
```

## Usage

### Direction Detection

```typescript
import { detectDirection, isRtl, isMixed } from "react-rtl-utils";

detectDirection("שלום עולם"); // "rtl"
detectDirection("Hello World"); // "ltr"
isRtl("مرحبا"); // true
isMixed("hello שלום"); // true
```

### Hooks

```tsx
import {
  useDirection,
  useTextDirection,
  useDocumentDirection,
} from "react-rtl-utils";

function App() {
  const { direction, toggleDirection } = useDirection("ltr");
  return (
    <div dir={direction}>
      <button onClick={toggleDirection}>Toggle Direction</button>
    </div>
  );
}

function TextInput({ value }: { value: string }) {
  const dir = useTextDirection(value);
  return <input dir={dir} value={value} />;
}

function Layout() {
  const dir = useDocumentDirection();
  // Reactively tracks <html dir="..."> changes
}
```

### Components

```tsx
import { BidiText, DirectionProvider, RtlFlip } from "react-rtl-utils";

// Auto-detects direction per text content
<BidiText>שלום עולם</BidiText>
<BidiText>Hello World</BidiText>

// Wraps children with dir attribute
<DirectionProvider direction="rtl">
  <YourApp />
</DirectionProvider>

// Conditionally render based on direction
<RtlFlip
  direction={dir}
  rtl={<span>→</span>}
  ltr={<span>←</span>}
/>
```

### CSS Utilities

```typescript
import { logicalValue, flipProperty, rtlStyle } from "react-rtl-utils";

logicalValue("rtl", "left", "right"); // "right"
flipProperty("rtl", "marginLeft"); // "marginRight"

const style = rtlStyle(
  "rtl",
  { marginLeft: 10, textAlign: "left" },
  { marginLeft: 0, marginRight: 10, textAlign: "right" },
);
```

## API

### Detection

| Function                | Description                                            |
| ----------------------- | ------------------------------------------------------ |
| `detectDirection(text)` | Returns `"rtl"` or `"ltr"` based on character majority |
| `isRtl(text)`           | Check if text is RTL                                   |
| `isLtr(text)`           | Check if text is LTR                                   |
| `hasRtlChars(text)`     | Check if text contains any RTL characters              |
| `hasLtrChars(text)`     | Check if text contains any LTR characters              |
| `isMixed(text)`         | Check if text contains both RTL and LTR characters     |

### Hooks

| Hook                     | Description                             |
| ------------------------ | --------------------------------------- |
| `useDirection(initial?)` | Stateful direction with toggle          |
| `useTextDirection(text)` | Auto-detect direction from text         |
| `useDocumentDirection()` | Track `<html dir>` attribute reactively |

### Components

| Component             | Description                                     |
| --------------------- | ----------------------------------------------- |
| `<BidiText>`          | Auto-sets `dir` attribute based on text content |
| `<DirectionProvider>` | Wraps children with `dir` attribute             |
| `<RtlFlip>`           | Renders different content for RTL vs LTR        |

### CSS Utilities

| Function                          | Description                    |
| --------------------------------- | ------------------------------ |
| `logicalValue(dir, start, end)`   | Pick value based on direction  |
| `flipProperty(dir, prop)`         | Flip CSS property name for RTL |
| `rtlStyle(dir, base, overrides?)` | Merge RTL style overrides      |

## Supported RTL Scripts

Hebrew, Arabic, Syriac, Thaana, Mandaic, Arabic Extended, Arabic Presentation Forms

## License

[MIT](LICENSE) &copy; [Ofer Shapira](https://github.com/ofershap)
