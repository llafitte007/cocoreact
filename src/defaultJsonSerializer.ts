import JsonSerializer from "./JsonSerializer";
import {
	GuidConverter,
	DateConverter,
	ODataFilterConverter,
	ODataSelectConverter,
	ODataOrderByConverter
} from "./core/Converters";

const defaultJsonSerializer = new JsonSerializer([
	new GuidConverter(),
	new DateConverter(),
	new ODataFilterConverter(),
	new ODataSelectConverter(),
	new ODataOrderByConverter()
]);

export default defaultJsonSerializer;
