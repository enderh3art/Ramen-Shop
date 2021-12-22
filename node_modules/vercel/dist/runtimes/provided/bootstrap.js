"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const child_process_1 = require("child_process");
// Delegate out to the provided `bootstrap` file within the lambda
const bootstrap = path_1.join(process.env.LAMBDA_TASK_ROOT, 'bootstrap');
child_process_1.spawn(bootstrap, [], { stdio: 'inherit' });
//# sourceMappingURL=bootstrap.js.map