export type ITypeWidgetComponent = any;

export default class TypeWidgetOptions {
	_typeComponents: Map<string, ITypeWidgetComponent>;

	constructor(typeComponents: Record<string, ITypeWidgetComponent>) {
		this._typeComponents = new Map<string, ITypeWidgetComponent>();
		for (var k in typeComponents) {
			this._typeComponents.set(k, typeComponents[k]);
		}
	}

	public get(type: string) {
		const component = this._typeComponents.get(type);
		if (component === undefined) {
			throw new Error(`undefined component for type "${type}"`);
		}
		return component;
	}

	public length() {
		return this._typeComponents.size;
	}
}
