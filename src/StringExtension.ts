import _slugify from "slugify";

export function slugify(str: string): string {
	str = _slugify(str);
	str = str.toLocaleLowerCase();
	str = str.replace(/[^a-z0-9\s]/g, " ");
	str = str.replace(/\s+/g, " ");
	str = str.trim();
	str = str.replace(/ /g, "-");
	return str;
}

export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
