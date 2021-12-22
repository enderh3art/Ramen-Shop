interface v6 {
	/**
	@returns The IPv6 address of the internet-facing interface, as determined from the default gateway. When the address cannot be determined for any reason, `undefined` will be returned.

	@example
	```
	import internalIp = require('internal-ip');

	console.log(internalIp.v6.sync());
	//=> 'fe80::1'
	```
	*/
	sync: () => string | undefined;

	/**
	@returns The IPv6 address of the internet-facing interface, as determined from the default gateway. When the address cannot be determined for any reason, `undefined` will be returned.

	@example
	```
	import internalIp = require('internal-ip');

	console.log(await internalIp.v6());
	//=> 'fe80::1'
	```
	*/
	(): Promise<string | undefined>;
}

interface v4 {
	/**
	@returns The IPv4 address of the internet-facing interface, as determined from the default gateway. When the address cannot be determined for any reason, `undefined` will be returned.

	@example
	```
	import internalIp = require('internal-ip');

	console.log(internalIp.v4.sync())
	//=> '10.0.0.79'
	```
	*/
	sync: () => string | undefined;

	/**
	@returns The IPv4 address of the internet-facing interface, as determined from the default gateway. When the address cannot be determined for any reason, `undefined` will be returned.

	@example
	```
	import internalIp = require('internal-ip');

	console.log(await internalIp.v4())
	//=> '10.0.0.79'
	```
	*/
	(): Promise<string | undefined>;
}

declare const internalIp: {
	v6: v6;
	v4: v4;
};

export = internalIp;
