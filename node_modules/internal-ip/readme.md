# internal-ip [![Build Status](https://travis-ci.com/sindresorhus/internal-ip.svg?branch=master)](https://travis-ci.com/github/sindresorhus/internal-ip)

> Get your internal IP address

## Install

```
$ npm install internal-ip
```

## Usage

```js
const internalIp = require('internal-ip');

(async () => {
	console.log(await internalIp.v6());
	//=> 'fe80::1'

	console.log(await internalIp.v4());
	//=> '10.0.0.79'
})();

console.log(internalIp.v6.sync())
//=> 'fe80::1'

console.log(internalIp.v4.sync())
//=> '10.0.0.79'
```

The module returns the address of the internet-facing interface, as determined from the default gateway. When the address cannot be determined for any reason, `undefined` will be returned.

The module relies on operating systems tools. On Linux and Android, the `ip` command must be available, which depending on distribution might not be installed by default. It is usually provided by the `iproute2` package. `.v4.sync()` and `.v6.sync()` are not supported in browsers and just return `undefined`.

## Related

- [internal-ip-cli](https://github.com/sindresorhus/internal-ip-cli) - CLI for this module
- [public-ip](https://github.com/sindresorhus/public-ip) - Get your public IP address
- [default-gateway](https://github.com/silverwind/default-gateway) - Get your default gateway address

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-internal-ip?utm_source=npm-internal-ip&utm_medium=referral&utm_campaign=readme">Get professional support for this package with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>
