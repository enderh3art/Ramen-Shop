"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const child_process_1 = require("child_process");
// `PYTHONPATH` is *not* a restricted env var, so only set the
// default one if the user did not provide one of their own
if (!process.env.PYTHONPATH) {
    process.env.PYTHONPATH = process.env.LAMBDA_RUNTIME_DIR;
}
let pythonBin = 'python3';
function fallback() {
    pythonBin = 'python';
}
function handler(data) {
    const isPython3 = data && data.toString() && data.toString().startsWith('Python 3');
    if (!isPython3) {
        fallback();
    }
    const bootstrap = path_1.join(__dirname, '..', 'python', 'bootstrap.py');
    child_process_1.spawn(pythonBin, [bootstrap], { stdio: 'inherit' });
}
const child = child_process_1.spawn(pythonBin, ['--version']);
child.on('error', fallback);
child.stderr.on('data', handler);
child.stdout.on('data', handler);
//# sourceMappingURL=bootstrap.js.map