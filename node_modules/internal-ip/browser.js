/* eslint-env browser */
'use strict';
import pEvent from 'p-event';
import isIp from 'is-ip';

const getIp = async ({isSecondTry = false} = {}) => {
	try {
		const peerConnection = new RTCPeerConnection({iceServers: []});

		peerConnection.createDataChannel('');
		peerConnection.createOffer(peerConnection.setLocalDescription.bind(peerConnection), () => {});

		const {candidate} = await pEvent(peerConnection, 'icecandidate', {
			timeout: 10000
		});

		peerConnection.close();

		if (candidate && candidate.candidate) {
			const result = candidate.candidate.split(' ')[4];
			if (result.endsWith('.local')) {
				if (isSecondTry) {
					return;
				}

				const inputDevices = await navigator.mediaDevices.enumerateDevices();
				const inputDeviceTypes = new Set(inputDevices.map(({kind}) => kind));

				const constraints = {};

				if (inputDeviceTypes.has('audioinput')) {
					constraints.audio = true;
				} else if (inputDeviceTypes.has('videoinput')) {
					constraints.video = true;
				} else {
					return;
				}

				const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
				for (const track of mediaStream.getTracks()) {
					track.stop();
				}

				return await getIp({isSecondTry: true});
			}

			return result;
		}
	} catch {}
};

export const v4 = async () => {
	const result = await getIp();
	if (isIp.v4(result)) {
		return result;
	}
};

v4.sync = () => undefined;

export const v6 = async () => {
	const result = await getIp();
	if (isIp.v6(result)) {
		return result;
	}
};

v6.sync = () => undefined;
