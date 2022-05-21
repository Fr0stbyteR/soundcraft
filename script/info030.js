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
const rightBtmInfo = {};
rightBtm.forEach(boxId => rightBtmInfo[boxId] = patch.boxes[boxId].presentationRect);

fs.writeFileSync(__dirname + "/030_info.json", JSON.stringify(rightBtmInfo, null, 4), { encoding: "utf-8" });
