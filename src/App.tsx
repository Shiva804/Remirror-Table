import { useState } from "react";
import { useActive } from "@remirror/react";

import {
  TextColorExtension,
  BoldExtension,
  FontFamilyExtension,
} from "remirror/extensions";
// import { TableCellMenu } from "./Components/table-cell-menu";
import { cx, uniqueId } from "remirror";
import {
  EditorComponent,
  Remirror,
  ThemeProvider,
  useRemirror,
  useRemirrorContext,
} from "@remirror/react";

import "remirror/styles/all.css";
import "./App.css";

//Custom Extension which contains commands for border color and thickness and createHeader

import {
  TableExtension,
  TableCellExtension,
  TableHeaderCellExtension,
  TableRowExtension,
  TableComponents,
} from "./CustomReactTableExtension";

const CommandMenu = () => {
  const { chain, commands } = useRemirrorContext();

  const [bgColor, setBgColor] = useState("#ffffff");
  const [defaultBgColor, setDefaultBgColor] = useState("#ffffff");
  const [color, setColor] = useState("#000000");
  const [border, setBorder] = useState("");
  const [borderColor, setBorderColor] = useState("");
  const [defaultBorder, setDefaultBorder] = useState("");
  const [defaultBorderColor, setDefaultBorderColor] = useState("");
  // const [alternateColor, setAlternateColor] = useState(false);

  return (
    <div>
      {/* <br />
      <input
        type="checkbox"
        id="alternate-color"
        onChange={() => setAlternateColor(!alternateColor)}
      />
      <label htmlFor="alternate-color">
        Alternate table color (Default: Grey color)
      </label>
      <br></br> */}
      <br />
      <button
        onClick={() => {
          commands.createTable({
            rowsCount: 3,
            columnsCount: 3,
            withHeaderRow: true,
          });

          // if (alternateColor) {
          //   commands.applyAlternateColor();
          // }
        }}
      >
        Create Table 3 x 3
      </button>

      <br />
      <br />
      <input
        type="number"
        id="favcolor"
        name="favcolor"
        onChange={(e) => {
          setDefaultBorder(`${e.target.value}px solid`);
        }}
      />
      <button
        onClick={() => {
          commands.setDefaultTableBorder(defaultBorder);
        }}
      >
        Default Border Width
      </button>
      <br />
      <br />
      <input
        type="color"
        id="favcolor"
        name="favcolor"
        value={defaultBorderColor}
        onChange={(e) => {
          setDefaultBorderColor(e.target.value);
        }}
      />

      <button
        onClick={() => {
          commands.setDefaultTableBorderColor(defaultBorderColor);
        }}
      >
        Default Border Color
      </button>

      <br />
      <br />

      <input
        type="color"
        id="favcolor"
        name="favcolor"
        value={defaultBgColor}
        onChange={(e) => {
          setDefaultBgColor(e.target.value);
        }}
      />

      <button
        onClick={() => {
          commands.setDefaultTableBackgroundColor(defaultBgColor);
        }}
      >
        Default Cell Background Color
      </button>

      <br />
      <br />
      <input
        type="color"
        id="favcolor"
        name="favcolor"
        value={bgColor}
        onChange={(e) => {
          setBgColor(e.target.value);
        }}
      />

      <button
        onClick={() => {
          commands.setTableCellBackground(bgColor);
        }}
      >
        Change Background Color of the selected cells
      </button>
      <br />
      <br />
      <input
        type="color"
        id="favcolor"
        name="favcolor"
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
        }}
      />

      <button
        onClick={() => {
          commands.setTextColor(color);
        }}
      >
        Change Text Color of the selected cells
      </button>
      <br />
      <br />
      <label>Highlight border (Thickness) in px:</label>
      <br />
      <input
        placeholder="px"
        type="number"
        onChange={(e) => setBorder(`${e.target.value}px solid`)}
      />
      <input
        type="color"
        id="favcolor"
        name="favcolor"
        value={borderColor}
        onChange={(e) => {
          setBorderColor(e.target.value);
        }}
      />
      <button
        onClick={() => {
          commands.highlightSelection(border, borderColor);
        }}
      >
        Highlight
      </button>
      <br />
      <br />
      <button
        onClick={() => {
          commands.removeHighlightSelection();
        }}
      >
        Remove Highlight
      </button>

      {/* <button
        onClick={() => {
          commands.createHeader("center", "bold");
        }}
      >
        Create Header
      </button>
      <button
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => commands.toggleFontFamily("serif")}
      >
        Serif
      </button>

      <button
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => commands.toggleBold()}
        className={cx(active.bold() && "active")}
      >
        Bold
      </button> */}
    </div>
  );
};

const extensions = () => [
  new TableExtension({
    extraAttributes: {
      // Remirror is smart enough to search the dom for the id if no `parseDOM`
      // method or `toDOM` method provided.
      border: "null",
      background: "null",
      borderColor: "null",
      // alternateColor: "false",
    },
  }),

  new TextColorExtension(),
  new BoldExtension(),
  new FontFamilyExtension(),
];

const App = () => {
  const { manager, state } = useRemirror({ extensions });

  return (
    <>
      <ThemeProvider>
        <Remirror manager={manager} initialContent={state} autoFocus={true}>
          <EditorComponent />
          <CommandMenu />

          {/* <TableCellMenu /> */}
          <TableComponents />
        </Remirror>
      </ThemeProvider>
    </>
  );
};

export default App;
