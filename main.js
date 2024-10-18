import "./style.css";
import { setup } from "./sql-generator.js";

document.querySelector("#app").innerHTML = `
  <textarea id="config" style="width: 500px;height:300px;">
  {
  "pgTrgmSimilarityThreshold": 0.2,
  "limitPerSource": 5,
  "totalLimit": 20,
  "sources": [
    { "table": "adresspunkter", "column": "fastighet" },
    { "table": "adresspunkter", "column": "kommundel" },
    { "table": "adresspunkter", "column": "beladress" }
  ]
}
  </textarea>
  <button id="update" type="button">Generate SQL code</button>
  <code id="output">The SQL code will appear here</code>
  </div>
`;

setup(document.querySelector("#update"));
