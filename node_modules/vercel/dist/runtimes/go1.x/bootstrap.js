"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const child_process_1 = require("child_process");
const filename_1 = require("./filename");
const out = filename_1.getOutputFile();
const bootstrap = path_1.join(__dirname, out);
child_process_1.spawn(bootstrap, [], { stdio: 'inherit' });
//# sourceMappingURL=bootstrap.js.map