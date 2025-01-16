# QNTM App Switcher

The App Switcher is a widget meant to be mounted on the different QNTM ecosystem
apps. It is made of a menu icon opening a popover with links to the different
QNTM ecosystem apps.

## Getting started

Install the app switcher using your favorite package manager:

```shell
npm i @qntmgroup/app-switcher
# or
yarn add @qntmgroup/app-switcher
# or
pnpm add @qntmgroup/app-switcher
# or
bun add @qntmgroup/app-switcher
```

It exports a UMD and an MJS version. The MJS version is the standard modern
browser mode and will probably be the version you want to use.

### In a React app

If you are using ReactJS, the usage is pretty straight forward:

```tsx
import { FC } from 'react'

import { QntmAppSwitcher } from '@qntmgroup/app-switcher'

export const App: FC = () => (
  <div>
    <h1>My marvellous app</h1>
    <QntmAppSwitcher />
  </div>
)
```

The react component has a few props allowing to tweak its UI and how its links
will work:

#### `buttonUi`: `ReactNode` (optional)

Default: A dashboard icon inheriting the current color

> ⚠️ For now, this only allows using a React node as an override.

Allows to fully adapt the icon to the UI where it is mounted.

#### `hideCloseButton`: `boolean` (optional)

Default: `false`

Allows to hide the small cross button in the pop over. Closing it is still
possible by clicking anywhere else on the viewport.

#### `hideFooter`: `boolean` (optional)

Default: `false`

Allows to hide the "discover QNTM ecosystem" footer of the popover.

#### `overlayColor`: `string` (optional)

Default: `"transparent"`

Defines the color of the backdrop overlay. It will always be mounted as it is
needed to allow closing the pop over by clicking away. This is why it is
transparent by default.

#### `partnersConfig`: `Partial<PartnersConfig>` (optional)

Default: `{}`

Override the default config by partner. This prop allows different overrides
such as hiding a partner from the displayed list or overriding the default
static link making cross partner SSO possible.

#### `customStyles`: `CSSModuleClasses` (optional)

Default: `{}`

Defines custom styles for elements. This prop allows adding custom styling
for elements by adding class. So the element will have both styles,
the original and the custom one.

**Examples:**

Hide partners:

```tsx
<QntmAppSwitcher
  partnersConfig={{
    Qualifio: { shouldHide: true }
  }}
/>
```

Override link partners:

```tsx
<QntmAppSwitcher
  partnersConfig={{
    Actito: { link: 'https://www.actito.be/link/with/sso?some=params' }
  }}
/>
```

<!-- TODO: implement this and/or a mounting utility -->

### As a micro front-end (Not implemented / experimental)

As React (and ReactDOM) are necessary peer dependencies for the app switcher,
you should map these in the DOM:

```html
<div>
  <h1>My marvellous app</h1>
  <div id="qntm-app-switcher"></div>
</div>
<script type="importmap">
  {
    "imports": {
      "react": "https://unpkg.com/react@18/umd/react.production.min.js",
      "react-dom": "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
    }
  }
</script>
<script type="module">
  import { createRoot } from 'react-dom/client'
  import { QntmAppSwitcher } from '@qntmgroup/app-switcher'

  const appSwitcherNode = document.getElementById('qntm-app-switcher')
  const appSwitcherRoot = createRoot(appSwitcherNode)

  appSwitcherRoot.render(<QntmAppSwitcher />)
</script>
```
