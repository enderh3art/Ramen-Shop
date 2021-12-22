"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const execa_1 = __importDefault(require("execa"));
const debug_1 = __importDefault(require("debug"));
const fs_extra_1 = require("fs-extra");
const filename_1 = require("./filename");
const debug = debug_1.default('@zeit/fun:runtimes/go1.x');
function _go(opts) {
    return function go(...args) {
        debug('Exec %o', `go ${args.join(' ')}`);
        return execa_1.default('go', args, Object.assign({ stdio: 'inherit' }, opts));
    };
}
function init({ cacheDir }) {
    return __awaiter(this, void 0, void 0, function* () {
        const source = path_1.join(cacheDir, 'bootstrap.go');
        const out = filename_1.getOutputFile();
        let data = yield fs_extra_1.readFile(source, 'utf8');
        // Fix windows
        if (process.platform === 'win32') {
            debug('detected windows, so stripping Setpgid');
            data = data
                .split('\n')
                .filter(line => !line.includes('Setpgid'))
                .join('\n');
        }
        // Prepare a temporary `$GOPATH`
        const GOPATH = path_1.join(cacheDir, 'go');
        // The source code must reside in `$GOPATH/src` for `go get` to work
        const bootstrapDir = path_1.join(GOPATH, 'src', out);
        yield fs_extra_1.mkdirp(bootstrapDir);
        yield fs_extra_1.writeFile(path_1.join(bootstrapDir, 'bootstrap.go'), data);
        const go = _go({ cwd: bootstrapDir, env: Object.assign(Object.assign({}, process.env), { GOPATH }) });
        const bootstrap = path_1.join(cacheDir, out);
        debug('Compiling Go runtime binary %o -> %o', source, bootstrap);
        yield go('get');
        yield go('build', '-o', bootstrap, 'bootstrap.go');
        // Clean up `$GOPATH` from the cacheDir
        yield fs_extra_1.remove(GOPATH);
    });
}
exports.init = init;
//# sourceMappingURL=index.js.map