const p1 = ['box-68', 'box-113', 'box-22', 'box-128', 'box-118', 'box-119', 'box-124', 'box-131', 'box-132'];
const p1Blink = ['box-340', 'box-342', 'box-341'];
const p2 = ['box-141', 'box-207', 'box-139', 'box-170', 'box-759', 'box-756', 'box-758', 'box-757', 'box-162', 'box-157', 'box-295'];
const p2Blink = ['box-346', 'box-746', 'box-745', 'box-751', 'box-747'];
const p3 = ['box-249', 'box-298', 'box-220', 'box-248', 'box-232', 'box-233', 'box-272', 'box-273', 'box-219', 'box-222', 'box-223'];
const p3Blink = ['box-335', 'box-336', 'box-338', 'box-337', 'box-339'];
const p4 = ['box-218', 'box-212', 'box-213', 'box-211', 'box-215', 'box-300', 'box-353'];
const pics = ['box-3', 'box-4', 'box-5', 'box-6', 'box-7', 'box-8', 'box-9', 'box-10', 'box-1', 'box-355'];

const code = 'box-143';

/**
 * @param {number} x
 * @param {number} p
 */
const round = (x, p) => Math.round(x * p) / p;

const fs = require("fs");
const fileStr = fs.readFileSync(__dirname + "/040.jspat", { encoding: "utf-8" });
/** @type {import("../../jspatcher/src/core/types").RawPatcher} */
const patch = JSON.parse(fileStr);

const all = [...p1, ...p1Blink, ...p2, ...p2Blink, ...p3, ...p3Blink, ...p4, ...pics];

for (const boxId of all) {
    if (!patch.boxes[boxId]) console.error(boxId);
    if (!patch.boxes[boxId].presentation) console.error(patch.boxes[boxId]);    
}

const textHeight = 1; // vw
const smallBtnSize = 2; // vw

const bigBtnSize = smallBtnSize * 2; // vw
const knobSize = smallBtnSize * 3; // vw
const pW = knobSize * 2; // vw
const vSpacing = knobSize; // vw

const picWidth = 4 * pW + 5 * vSpacing; // 78vw
const picHeight = picWidth / 16 * 9; // vw

const marginLeft = (100 - picWidth) / 2; // vw
const marginTop = `calc(95vh - ${picHeight}vw) / 2`;

let xRef = marginLeft;
let yRef = 0;
const calcY = (vw) => vw ? `calc(${marginTop} + ${vw}vw)` : `calc(${marginTop})`;

for (let i = 0; i < pics.length; i++) {
    const box = patch.boxes[pics[i]];
    const x = `${xRef}vw`;
    const y = calcY();
    const w = `${picWidth}vw`;
    const h = `${picHeight}vw`;
    box.presentationRect = [x, y, w, h];
}

(() => {
    xRef = marginLeft + vSpacing;
    yRef = vSpacing;
    const [btn, mtr, knob1, knob2, btn1, btn2, sel, knob3, knob4] = p1;
    const [bl1, bl2, bl3] = p1Blink;
    patch.boxes[btn].presentationRect = [`${xRef}vw`, calcY(yRef), `${pW}vw`, `${bigBtnSize}vw`];

    patch.boxes[bl1].presentationRect = [`${xRef + pW + textHeight}vw`, calcY(yRef), `${bigBtnSize}vw`, `${bigBtnSize}vw`];

    yRef += bigBtnSize;
    patch.boxes[mtr].presentationRect = [`${xRef}vw`, calcY(yRef), `${pW}vw`, `${bigBtnSize}vw`];
    yRef += bigBtnSize + textHeight;
    patch.boxes[knob1].presentationRect = [`${xRef}vw`, calcY(yRef), `${knobSize}vw`, `${bigBtnSize}vw`];
    patch.boxes[knob2].presentationRect = [`${xRef + knobSize}vw`, calcY(yRef), `${knobSize}vw`, `${bigBtnSize}vw`];

    patch.boxes[bl2].presentationRect = [`${xRef + pW + textHeight}vw`, calcY(yRef), `${bigBtnSize}vw`, `${bigBtnSize}vw`];

    yRef += bigBtnSize + textHeight;
    patch.boxes[btn1].presentationRect = [`${xRef + pW / 4 - bigBtnSize / 2}vw`, calcY(yRef), `${bigBtnSize}vw`, `${bigBtnSize}vw`];
    patch.boxes[btn2].presentationRect = [`${xRef + pW * 3 / 4 - bigBtnSize / 2}vw`, calcY(yRef), `${bigBtnSize}vw`, `${bigBtnSize}vw`];
    yRef += bigBtnSize + textHeight;
    patch.boxes[sel].presentationRect = [`${xRef}vw`, calcY(yRef), `${pW}vw`, `${4 * textHeight}vw`];

    patch.boxes[bl3].presentationRect = [`${xRef + pW + textHeight}vw`, calcY(yRef + 2 * textHeight), `${bigBtnSize}vw`, `${bigBtnSize}vw`];

    yRef += 4 * textHeight + textHeight;
    patch.boxes[knob3].presentationRect = [`${xRef}vw`, calcY(yRef), `${knobSize}vw`, `${bigBtnSize}vw`];
    patch.boxes[knob4].presentationRect = [`${xRef + knobSize}vw`, calcY(yRef), `${knobSize}vw`, `${bigBtnSize}vw`];
})();

(() => {
    xRef += pW + vSpacing;
    yRef = vSpacing;
    const [btn, mtr, knob1, knob2, btn1, btn2, btn3, btn4, sel, btn5, knob3] = p2;
    const [bl1, bl2, bl3, bl4, bl5] = p2Blink;
    patch.boxes[btn].presentationRect = [`${xRef}vw`, calcY(yRef), `${pW}vw`, `${bigBtnSize}vw`];

    patch.boxes[bl1].presentationRect = [`${xRef + pW + textHeight}vw`, calcY(yRef + textHeight), `${smallBtnSize}vw`, `${smallBtnSize}vw`];

    yRef += bigBtnSize;
    patch.boxes[mtr].presentationRect = [`${xRef}vw`, calcY(yRef), `${pW}vw`, `${bigBtnSize}vw`];

    patch.boxes[bl2].presentationRect = [`${xRef + pW + textHeight * 3}vw`, calcY(yRef + textHeight), `${smallBtnSize}vw`, `${smallBtnSize}vw`];

    yRef += bigBtnSize + textHeight;
    patch.boxes[knob1].presentationRect = [`${xRef}vw`, calcY(yRef), `${knobSize}vw`, `${bigBtnSize}vw`];
    patch.boxes[knob2].presentationRect = [`${xRef + knobSize}vw`, calcY(yRef), `${knobSize}vw`, `${bigBtnSize}vw`];

    patch.boxes[bl3].presentationRect = [`${xRef + pW + textHeight}vw`, calcY(yRef + textHeight), `${smallBtnSize}vw`, `${smallBtnSize}vw`];

    yRef += bigBtnSize + textHeight;
    patch.boxes[btn1].presentationRect = [`${xRef + pW / 8 - smallBtnSize / 2}vw`, calcY(yRef), `${smallBtnSize}vw`, `${smallBtnSize}vw`];
    patch.boxes[btn3].presentationRect = [`${xRef + pW * 5 / 8 - smallBtnSize / 2}vw`, calcY(yRef), `${smallBtnSize}vw`, `${smallBtnSize}vw`];

    patch.boxes[bl4].presentationRect = [`${xRef + pW + 3 * textHeight}vw`, calcY(yRef), `${smallBtnSize}vw`, `${smallBtnSize}vw`];

    yRef += smallBtnSize + textHeight;
    patch.boxes[btn2].presentationRect = [`${xRef + pW * 3 / 8 - smallBtnSize / 2}vw`, calcY(yRef), `${smallBtnSize}vw`, `${smallBtnSize}vw`];
    patch.boxes[btn4].presentationRect = [`${xRef + pW * 7 / 8 - smallBtnSize / 2}vw`, calcY(yRef), `${smallBtnSize}vw`, `${smallBtnSize}vw`];

    patch.boxes[bl5].presentationRect = [`${xRef + pW + 2 * textHeight}vw`, calcY(yRef + textHeight), `${smallBtnSize}vw`, `${smallBtnSize}vw`];

    yRef += smallBtnSize + textHeight;
    patch.boxes[sel].presentationRect = [`${xRef}vw`, calcY(yRef), `${pW}vw`, `${textHeight}vw`];
    yRef += textHeight + textHeight;
    patch.boxes[btn5].presentationRect = [`${xRef}vw`, calcY(yRef), `${pW}vw`, `${textHeight}vw`];
    yRef += textHeight + textHeight;
    patch.boxes[knob3].presentationRect = [`${xRef}vw`, calcY(yRef), `${pW}vw`, `${bigBtnSize}vw`];
})();

(() => {
    xRef += pW + vSpacing;
    yRef = vSpacing;
    const [btn, mtr, knob1, knob2, btn1, btn2, btn3, btn4, sel, knob3, knob4] = p3;
    const [bl1, bl2, bl3, bl4, bl5] = p3Blink;
    patch.boxes[btn].presentationRect = [`${xRef}vw`, calcY(yRef), `${pW}vw`, `${bigBtnSize}vw`];

    patch.boxes[bl1].presentationRect = [`${xRef + pW + textHeight}vw`, calcY(yRef + textHeight), `${bigBtnSize}vw`, `${bigBtnSize}vw`];

    yRef += bigBtnSize;
    patch.boxes[mtr].presentationRect = [`${xRef}vw`, calcY(yRef), `${pW}vw`, `${bigBtnSize}vw`];

    patch.boxes[bl2].presentationRect = [`${xRef + pW + textHeight}vw`, calcY(yRef + textHeight), `${bigBtnSize}vw`, `${bigBtnSize}vw`];

    yRef += bigBtnSize + textHeight;
    patch.boxes[knob1].presentationRect = [`${xRef}vw`, calcY(yRef), `${knobSize}vw`, `${bigBtnSize}vw`];
    patch.boxes[knob2].presentationRect = [`${xRef + knobSize}vw`, calcY(yRef), `${knobSize}vw`, `${bigBtnSize}vw`];
    yRef += bigBtnSize + textHeight;
    patch.boxes[btn1].presentationRect = [`${xRef + pW / 8 - smallBtnSize / 2}vw`, calcY(yRef), `${smallBtnSize}vw`, `${smallBtnSize}vw`];
    patch.boxes[btn3].presentationRect = [`${xRef + pW * 5 / 8 - smallBtnSize / 2}vw`, calcY(yRef), `${smallBtnSize}vw`, `${smallBtnSize}vw`];

    patch.boxes[bl3].presentationRect = [`${xRef + pW + textHeight}vw`, calcY(yRef), `${bigBtnSize}vw`, `${bigBtnSize}vw`];

    yRef += smallBtnSize + textHeight;
    patch.boxes[btn2].presentationRect = [`${xRef + pW * 3 / 8 - smallBtnSize / 2}vw`, calcY(yRef), `${smallBtnSize}vw`, `${smallBtnSize}vw`];
    patch.boxes[btn4].presentationRect = [`${xRef + pW * 7 / 8 - smallBtnSize / 2}vw`, calcY(yRef), `${smallBtnSize}vw`, `${smallBtnSize}vw`];

    patch.boxes[bl4].presentationRect = [`${xRef + pW + textHeight * 2}vw`, calcY(yRef + 2 * textHeight), `${smallBtnSize}vw`, `${smallBtnSize}vw`];

    yRef += smallBtnSize + textHeight;
    patch.boxes[sel].presentationRect = [`${xRef}vw`, calcY(yRef), `${pW}vw`, `${4 * textHeight}vw`];
    yRef += 4 * textHeight + textHeight;
    patch.boxes[knob3].presentationRect = [`${xRef}vw`, calcY(yRef), `${knobSize}vw`, `${bigBtnSize}vw`];
    patch.boxes[knob4].presentationRect = [`${xRef + knobSize}vw`, calcY(yRef), `${knobSize}vw`, `${bigBtnSize}vw`];

    patch.boxes[bl5].presentationRect = [`${xRef + pW + textHeight}vw`, calcY(yRef + textHeight), `${bigBtnSize}vw`, `${bigBtnSize}vw`];

})();

(() => {
    xRef += pW + vSpacing;
    yRef = vSpacing;
    const [btn1, knob1, knob2, mtr1, btn2, knob3, mtr2] = p4;
    yRef += smallBtnSize;
    patch.boxes[btn1].presentationRect = [`${xRef + pW / 2 - bigBtnSize}vw`, calcY(yRef), `${bigBtnSize * 2}vw`, `${smallBtnSize}vw`];
    yRef += smallBtnSize + textHeight;
    patch.boxes[knob1].presentationRect = [`${xRef + pW / 2 - bigBtnSize}vw`, calcY(yRef), `${bigBtnSize}vw`, `${bigBtnSize}vw`];
    patch.boxes[knob2].presentationRect = [`${xRef + pW / 2}vw`, calcY(yRef), `${bigBtnSize}vw`, `${bigBtnSize}vw`];
    yRef += bigBtnSize + textHeight;
    patch.boxes[mtr1].presentationRect = [`${xRef + pW / 2 - bigBtnSize}vw`, calcY(yRef), `${bigBtnSize * 2}vw`, `${smallBtnSize}vw`];
    
    yRef += smallBtnSize + bigBtnSize;
    
    patch.boxes[btn2].presentationRect = [`${xRef + pW / 2 - bigBtnSize}vw`, calcY(yRef), `${bigBtnSize * 2}vw`, `${smallBtnSize}vw`];
    
    yRef += smallBtnSize + bigBtnSize;
    
    patch.boxes[knob3].presentationRect = [`${xRef}vw`, calcY(yRef), `${pW}vw`, `${knobSize}vw`];
    yRef += knobSize;
    patch.boxes[mtr2].presentationRect = [`${xRef}vw`, calcY(yRef), `${pW}vw`, `${smallBtnSize}vw`];
})();

fs.writeFileSync(__dirname + "/040__.jspat", JSON.stringify(patch), { encoding: "utf-8" });
