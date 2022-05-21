const btnArray = [
    "box-87","box-86","box-85","box-84","box-83","box-82","box-75","box-74","box-73","box-72","box-17",
    "box-81","box-80","box-79","box-78","box-77","box-76","box-71","box-70","box-69","box-68","box-16",
    "box-67","box-66","box-65","box-64","box-63","box-62","box-61","box-60","box-59","box-58","box-15",
    "box-57","box-56","box-55","box-54","box-53","box-52","box-51","box-50","box-49","box-48","box-14",
    "box-47","box-46","box-45","box-44","box-43","box-42","box-41","box-40","box-39","box-38","box-13",
    "box-37","box-36","box-35","box-34","box-33","box-32","box-31","box-30","box-29","box-28","box-12",
    "box-27","box-26","box-25","box-24","box-23","box-22","box-21","box-20","box-19","box-18","box-11",
    "box-10","box-9","box-8","box-7","box-6","box-5","box-4","box-3","box-2","box-1","box-0"
];
const text = "box-854";
const presetSel = "box-897";
const presetText = "box-357";
const resetBtns = ["box-895","box-739","box-740","box-742","box-724"];
const sliders = ["box-760","box-541","box-542","box-737","box-722"];
const pics = ["box-92","box-93","box-95","box-94","box-97","box-96","box-98"];

const fs = require("fs");
const fileStr = fs.readFileSync(__dirname + "/010.jspat", { encoding: "utf-8" });
/** @type {import("../../jspatcher/src/core/types").RawPatcher} */
const patch = JSON.parse(fileStr);

const all = [...btnArray, text, presetSel, presetText, ...resetBtns, ...sliders, ...pics];

for (const boxId of all) {
    if (!patch.boxes[boxId].presentation) console.error(patch.boxes[boxId]);    
}

const btnSize = 5; // vw
const resetBtnSize = 2; // vw

const btnCols = 11;
const btnRows = 8;

const marginLeft = (100 - btnSize * btnCols - 5 * resetBtnSize) / 2; // vw
// const vSpace = 8.5; // vh
const textHeight = 2; // vw
const marginTop = `calc(95vh - ${btnSize * btnRows + textHeight * 2}vw) / 2`;

for (let i = 0; i < btnArray.length; i++) {
    const box = patch.boxes[btnArray[i]];
    const row = ~~(i / btnCols);
    const col = i % btnCols;
    const x = `${marginLeft + btnSize * col}vw`;
    const y = `calc(${marginTop} + ${btnSize * row}vw)`;
    const w = `${btnSize}vw`;
    const h = `${btnSize}vw`;
    box.presentationRect = [x, y, w, h];
}
patch.boxes[text].presentationRect = [`${marginLeft}vw`, "61.8vh", `${btnCols * btnSize}vw`, "5vw"];
patch.boxes[presetSel].presentationRect = [`${marginLeft}vw`, `calc(${marginTop} + ${btnRows * btnSize}vw)`, `${btnCols * btnSize}vw`, `${textHeight}vw`];
patch.boxes[presetText].presentationRect = [`${marginLeft}vw`, `calc(${marginTop} + ${btnRows * btnSize + textHeight}vw)`, `${btnCols * btnSize + 5 * resetBtnSize}vw`, `${textHeight}vw`];

for (let i = 0; i < resetBtns.length; i++) {
    const box = patch.boxes[resetBtns[i]];
    const x = `${marginLeft + btnSize * btnCols + resetBtnSize * i}vw`;
    const y = `calc(${marginTop})`;
    const w = `${resetBtnSize}vw`;
    const h = `${resetBtnSize}vw`;
    box.presentationRect = [x, y, w, h];
}

for (let i = 0; i < sliders.length; i++) {
    const box = patch.boxes[sliders[i]];
    const x = `${marginLeft + btnSize * btnCols + resetBtnSize * i}vw`;
    const y = `calc(${marginTop} + ${resetBtnSize}vw)`;
    const w = `${resetBtnSize}vw`;
    const h = `${btnSize * btnRows - resetBtnSize + textHeight}vw`;
    box.presentationRect = [x, y, w, h];
}

for (let i = 0; i < pics.length; i++) {
    const box = patch.boxes[pics[i]];
    const x = `${marginLeft}vw`;
    const y = `calc(${marginTop})`;
    const w = `${btnSize * btnCols + 5 * resetBtnSize}vw`;
    const h = `${btnSize * btnRows + textHeight}vw`;
    box.presentationRect = [x, y, w, h];
}

fs.writeFileSync(__dirname + "/010__.jspat", JSON.stringify(patch), { encoding: "utf-8" });
