# use-simple-scroll-spy

Tiny scroll spy react hook that just needs the element ids

## Installation

```
pnpm i use-simply-scroll-spy
```

```
yarn add use-simply-scroll-spy
```

```
npm i use-simply-scroll-spy
```

## Usage

```typescript
const sectionIds = ["section-1", "section-2"];
const MyComponent: React.FC = () => {
  const activeIndex = useSimpleScrollSpy(sectionIds);
  return (
    <>
      <div id="section-1">My content </div>
      <div id="section-2">My content </div>
    </>
  );
};
```

The code above is a very simply way of using this hook but the general idea is to track based on the URL hash. If you hit the page with `#section-2` as the default section, the `activeIndex` will be set propertly.

My personal motivation for this project was the need in a very framework-agnostic in order to create an header with the active section
