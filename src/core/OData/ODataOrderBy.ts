/* eslint-disable no-unused-vars */
export type OrderDirection = "asc" | "desc";

export default class ODataOrderBy {
	direction: OrderDirection | undefined;
	member: string | undefined;

	public constructor(init?: Partial<ODataOrderBy>) {
		this.direction = undefined;
		this.member = undefined;
		Object.assign(this, init);
	}

	set(newMember: string) {
		if (newMember === this.member) {
			this.direction = this.direction === "asc" ? "desc" : "asc";
		} else {
			this.direction = "asc";
		}
		this.member = newMember;
	}
}
