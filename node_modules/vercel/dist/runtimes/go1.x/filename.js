"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getOutputFile() {
    const ext = process.platform === 'win32' ? '.exe' : '';
    return `bootstrap${ext}`;
}
exports.getOutputFile = getOutputFile;
//# sourceMappingURL=filename.js.map