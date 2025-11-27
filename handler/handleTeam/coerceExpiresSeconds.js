const coerceExpiresSeconds = (raw) => {
	try {
		if (raw === null || raw === undefined) return null;

		// Handle MongoDB Extended JSON objects
		if (typeof raw === 'object') {
			if (Object.prototype.hasOwnProperty.call(raw, '$numberDouble')) {
				const n = Number(raw.$numberDouble);
				return Number.isFinite(n) ? Math.floor(n) : null;
			}
			if (Object.prototype.hasOwnProperty.call(raw, '$numberInt')) {
				const n = Number(raw.$numberInt);
				return Number.isFinite(n) ? Math.floor(n) : null;
			}
			if (Object.prototype.hasOwnProperty.call(raw, '$date')) {
				const v = raw.$date;
				const ms = typeof v === 'number' ? v : Date.parse(v);
				return Number.isFinite(ms) ? Math.floor(ms / 1000) : null;
			}
		}

		// Handle primitives
		if (typeof raw === 'number') return Number.isFinite(raw) ? Math.floor(raw) : null;
		if (typeof raw === 'string') {
			const n = Number(raw);
			return Number.isFinite(n) ? Math.floor(n) : null;
		}

		return null;
	} catch (_) {
		return null;
	}
};

module.exports = coerceExpiresSeconds