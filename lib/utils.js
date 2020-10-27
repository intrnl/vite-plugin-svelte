import * as path from 'path';


export function componentize (str) {
	return path.basename(str[0].toUpperCase() + str.slice(1))
		.replace(path.extname(str), '')
		.replace(/[^a-zA-Z_$0-9]+/g, '_')
		.replace(/^_/, '')
		.replace(/_$/, '')
		.replace(/^(\d)/, '_$1');
}

export function push (arr, items) {
	for (let item of items) {
		if (!arr.includes(item)) arr.push(item);
	}

	return arr;
}
