const fs = require("fs");
const fileStr = fs.readFileSync(__dirname + "/020__.jspat", { encoding: "utf-8" });
/** @type {import("../../jspatcher/src/core/types").RawPatcher} */
const patch = JSON.parse(fileStr);

const texts = [];

for (const box of Object.values(patch.boxes)) {
    if (box.text === "message") {
        if (box.data.text.match(/^[\d-\[\],\s]+$/)) continue;
        texts.push(box.data.text);
    }
}

console.log(texts.map(t => t.replace(/\n/g, "")).join("\n"));
