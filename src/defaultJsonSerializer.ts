import JsonSerializer from "./JsonSerializer";
import {
	DateConverter,
	ODataFilterConverter,
	ODataSelectConverter,
	ODataOrderByConverter
} from "./core/Converters";

const defaultJsonSerializer = new JsonSerializer([
	new DateConverter(),
	new ODataFilterConverter(),
	new ODataSelectConverter(),
	new ODataOrderByConverter()
]);

export default defaultJsonSerializer;
