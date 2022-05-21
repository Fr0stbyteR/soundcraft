const fs = require("fs");
const fileStr = fs.readFileSync(__dirname + "/030.jspat", { encoding: "utf-8" });
/** @type {import("../../jspatcher/src/core/types").RawPatcher} */
const patch = JSON.parse(fileStr);

const overallPresentationRect = [];
for (const boxId in patch.boxes) {
    const box = patch.boxes[boxId];
    if (!box.presentation) continue;
    const rect = (([x, y, w, h]) => [x, y, x + w, y + h])(box.presentationRect);
    if (overallPresentationRect.length === 0) {
        overallPresentationRect.push(...rect)
    } else {
        overallPresentationRect[0] = Math.min(overallPresentationRect[0], rect[0]);
        overallPresentationRect[1] = Math.min(overallPresentationRect[1], rect[1]);
        overallPresentationRect[2] = Math.max(overallPresentationRect[2], rect[2]);
        overallPresentationRect[3] = Math.max(overallPresentationRect[3], rect[3]);
    }
}
console.log("patcher rect:\t", ...(([x, y, r, b]) => [x, y, r - x, b - y])(overallPresentationRect));
process.exit();
/** @type {"vh" | "vw"} */
const mode = "vh";
const aspectRatio = 16 / 9;
const full = 960;
const left = 60;
const top = 15;
const strech = 8 / 7;

const fullWidth = mode === "vh" ? full * aspectRatio : full;
const fullHeight = mode === "vh" ? full : full / aspectRatio;

const ref = mode === "vh" ? fullHeight : fullWidth;

console.log("scale rect:\t", left, top, fullWidth, fullHeight);

/**
 * @param {number} x
 * @param {number} p
 */
const round = (x, p) => Math.round(x * p) / p;
// process.exit();
for (const boxId in patch.boxes) {
    const box = patch.boxes[boxId];
    if (!box.presentation) continue;
    console.log(boxId, ...box.presentationRect);
    box.presentationRect = (([x, y, w, h]) => [
        round(100 * (x - left) / ref, 10 ** 5) + mode,
        round(strech * 100 * (y - top) / ref, 10 ** 5) + mode,
        round(100 * w / ref, 10 ** 5) + mode,
        round(strech * 100 * h / ref, 10 ** 5) + mode
    ])(box.presentationRect);
    console.log(boxId, ...box.presentationRect);
}

fs.writeFileSync(__dirname + "/010_.jspat", JSON.stringify(patch), { encoding: "utf-8" });
