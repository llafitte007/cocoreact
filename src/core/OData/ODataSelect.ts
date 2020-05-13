export default class ODataSelect {
	members: string[];

	public constructor(init?: Partial<ODataSelect>) {
		this.members = [];
		Object.assign(this, init);
	}
}
