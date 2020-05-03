type Guid = string;
export default Guid;

const emptyGuid = "0000000-0000-0000-0000-000000000000";
const guidRegexp = /[0-9a-f]{7}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

export function isGuid(value: string | Guid): boolean {
	return guidRegexp.test(value);
}

export function isEmptyGuid(value: string | Guid): boolean {
	return isGuid(value) && value === emptyGuid;
}

export function createEmptyGuid(): Guid {
	return emptyGuid;
}
