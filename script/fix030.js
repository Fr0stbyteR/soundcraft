const leftTop = ['box-4', 'box-26', 'box-68'];
const leftTopBtn = "box-16";
const leftTopMtr = 'box-122';

const rightTop = ['box-39', 'box-43', 'box-70'];
const rightTopBtn = "box-50";
const rightTopMtr = 'box-124';

const leftBtm = ['box-32', 'box-33', 'box-69'];
const leftBtmBtn = "box-35";
const leftBtmMtr = 'box-123';

const rightBtmPics = ['box-125', 'box-180', 'box-183', 'box-160', 'box-181', 'box-185', 'box-164', 'box-182', 'box-187', 'box-176', 'box-184', 'box-186'];
const rightBtmNums = ['box-1020', 'box-210', 'box-207', 'box-212', 'box-211', 'box-1019', 'box-1026'];
const rightBtmTxts = ['box-926', 'box-1006', 'box-854', 'box-979']

const rightBtm = [...rightBtmPics, ...rightBtmNums, ...rightBtmTxts];

const rightBtmX = 780;
const rightBtmY = 450;
const rightBtmW = 780;
const rightBtmH = 435;

const code = 'box-143';

/**
 * @param {number} x
 * @param {number} p
 */
const round = (x, p) => Math.round(x * p) / p;

const fs = require("fs");
const fileStr = fs.readFileSync(__dirname + "/030.jspat", { encoding: "utf-8" });
/** @type {import("../../jspatcher/src/core/types").RawPatcher} */
const patch = JSON.parse(fileStr);

const all = [...leftTop, leftTopBtn, leftTopMtr, ...rightTop, rightTopBtn, rightTopMtr, ...leftBtm, leftBtmBtn, leftBtmMtr, ...rightBtm, code];

for (const boxId of all) {
    if (!patch.boxes[boxId].presentation) console.error(patch.boxes[boxId]);    
}

const btnSize = 3; // vw
const picWidth = 30; // vw
const picHeight = picWidth / 15 * 9; // vw
const mtrWidth = picWidth / 12; // vw

const marginLeft = (100 - picWidth * 2) / 2; // vw
// const vSpace = 8.5; // vh
const textHeight = 2; // vw
const marginTop = `calc(95vh - ${picHeight * 2}vw) / 2`;

for (let i = 0; i < leftTop.length; i++) {
    const box = patch.boxes[leftTop[i]];
    const x = `${marginLeft}vw`;
    const y = `calc(${marginTop})`;
    const w = `${picWidth}vw`;
    const h = `${picHeight}vw`;
    box.presentationRect = [x, y, w, h];
}
patch.boxes[leftTopBtn].presentationRect = [`${marginLeft + picWidth / 2 - btnSize / 2}vw`, `calc(${marginTop} + ${picHeight / 2 - btnSize / 2}vw)`, `${btnSize}vw`, `${btnSize}vw`];
patch.boxes[leftTopMtr].presentationRect = [`${marginLeft + picWidth - mtrWidth}vw`, `calc(${marginTop})`, `${mtrWidth}vw`, `${picHeight}vw`];
for (let i = 0; i < rightTop.length; i++) {
    const box = patch.boxes[rightTop[i]];
    const x = `${marginLeft + picWidth}vw`;
    const y = `calc(${marginTop})`;
    const w = `${picWidth}vw`;
    const h = `${picHeight}vw`;
    box.presentationRect = [x, y, w, h];
}
patch.boxes[rightTopBtn].presentationRect = [`${marginLeft + picWidth + picWidth / 2 - btnSize / 2}vw`, `calc(${marginTop} + ${picHeight / 2 - btnSize / 2}vw)`, `${btnSize}vw`, `${btnSize}vw`];
patch.boxes[rightTopMtr].presentationRect = [`${marginLeft + picWidth + picWidth - mtrWidth}vw`, `calc(${marginTop})`, `${mtrWidth}vw`, `${picHeight}vw`];
for (let i = 0; i < leftBtm.length; i++) {
    const box = patch.boxes[leftBtm[i]];
    const x = `${marginLeft}vw`;
    const y = `calc(${marginTop} + ${picHeight}vw)`;
    const w = `${picWidth}vw`;
    const h = `${picHeight}vw`;
    box.presentationRect = [x, y, w, h];
}
patch.boxes[leftBtmBtn].presentationRect = [`${marginLeft + picWidth / 2 - btnSize / 2}vw`, `calc(${marginTop} + ${picHeight + picHeight / 2 - btnSize / 2}vw)`, `${btnSize}vw`, `${btnSize}vw`];
patch.boxes[leftBtmMtr].presentationRect = [`${marginLeft + picWidth - mtrWidth}vw`, `calc(${marginTop} + ${picHeight}vw)`, `${mtrWidth}vw`, `${picHeight}vw`];

for (let i = 0; i < rightBtm.length; i++) {
    const box = patch.boxes[rightBtm[i]];
    const [x1, y1, w1, h1] = box.presentationRect;
    const x = `${round(marginLeft + picWidth + picWidth * ((x1 - rightBtmX) / rightBtmW), 10000)}vw`;
    const y = `calc(${marginTop} + ${round(picHeight + picHeight * ((y1 - rightBtmY) / rightBtmH), 10000)}vw)`;
    const w = `${round(picWidth * (w1 / rightBtmW), 10000)}vw`;
    const h = `${round(picHeight * (h1 / rightBtmH), 10000)}vw`;
    box.presentationRect = [x, y, w, h];
}

patch.boxes[code].presentationRect = [`${marginLeft + picWidth}vw`, `calc(${marginTop} + ${picHeight * 2 - textHeight}vw)`, `${picWidth}vw`, `${textHeight}vw`];

fs.writeFileSync(__dirname + "/030__.jspat", JSON.stringify(patch), { encoding: "utf-8" });
