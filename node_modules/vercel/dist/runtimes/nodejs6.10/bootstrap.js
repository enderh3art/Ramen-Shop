"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const child_process_1 = require("child_process");
const nodeBin = path_1.join(__dirname, 'bin', 'node');
const bootstrap = path_1.join(__dirname, '..', 'nodejs', 'bootstrap.js');
child_process_1.spawn(nodeBin, [bootstrap], { stdio: 'inherit' });
//# sourceMappingURL=bootstrap.js.map