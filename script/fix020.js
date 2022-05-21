const selArray = ['box-4', 'box-69', 'box-71', 'box-70', 'box-75', 'box-74', 'box-73', 'box-72'];
const knobArray = ['box-77', 'box-76', 'box-178', 'box-177', 'box-206', 'box-205', 'box-255', 'box-253', 'box-236', 'box-235', 'box-234', 'box-233', 'box-319', 'box-317'];
const gain = "box-362";
const text = "box-854";
const code = "box-357";
const pics = ["box-92","box-93","box-95","box-94","box-97","box-96","box-98"];

const fs = require("fs");
const fileStr = fs.readFileSync(__dirname + "/020.jspat", { encoding: "utf-8" });
/** @type {import("../../jspatcher/src/core/types").RawPatcher} */
const patch = JSON.parse(fileStr);

const all = [...selArray, text, ...knobArray, gain, code, ...pics];

for (const boxId of all) {
    if (!patch.boxes[boxId].presentation) console.error(patch.boxes[boxId]);    
}
// process.exit();
const knobSize = 4; // vw
const selWidth = 2 * knobSize; // vw
const selHeight = 4 * selWidth; // vw
const cols = 8;

const marginLeft = (100 - selWidth * cols) / 2; // vw
// const vSpace = 8.5; // vh
const textHeight = 2; // vw
const marginTop = `calc(95vh - ${selHeight + knobSize + textHeight}vw) / 2`;

for (let i = 0; i < selArray.length; i++) {
    const box = patch.boxes[selArray[i]];
    const x = `${marginLeft + selWidth * i}vw`;
    const y = `calc(${marginTop})`;
    const w = `${selWidth}vw`;
    const h = `${selHeight}vw`;
    box.presentationRect = [x, y, w, h];
}
for (let i = 0; i < knobArray.length; i++) {
    const box = patch.boxes[knobArray[i]];
    const x = `${marginLeft + knobSize * i}vw`;
    const y = `calc(${marginTop} + ${selHeight}vw)`;
    const w = `${knobSize}vw`;
    const h = `${knobSize}vw`;
    box.presentationRect = [x, y, w, h];
}
patch.boxes[gain].presentationRect = [`${marginLeft + knobSize * (cols - 1) * 2}vw`, `calc(${marginTop} + ${selHeight}vw)`, `${selWidth}vw`, `${knobSize}vw`];
patch.boxes[text].presentationRect = [`${marginLeft + selWidth * cols / 2}vw`, `calc(${marginTop} + ${selHeight + knobSize}vw)`, `${selWidth * cols / 2}vw`, `${textHeight}vw`];
patch.boxes[code].presentationRect = [`${marginLeft}vw`, `calc(${marginTop} + ${selHeight + knobSize}vw)`, `${selWidth * cols / 2}vw`, `${textHeight}vw`];

for (let i = 0; i < pics.length; i++) {
    const box = patch.boxes[pics[i]];
    const x = `${marginLeft}vw`;
    const y = `calc(${marginTop})`;
    const w = `${selWidth * cols}vw`;
    const h = `${selHeight + knobSize}vw`;
    box.presentationRect = [x, y, w, h];
}

fs.writeFileSync(__dirname + "/020__.jspat", JSON.stringify(patch), { encoding: "utf-8" });
