import * as esbuild from 'esbuild';


/**
 * @param {object} options
 * @returns {esbuild.Plugin}
 */
export default function aliasPlugin (options = {}) {
	const { entries, shouldResolve = true } = options;
	const matcher = createMatcher(entries);

	return {
		name: '@intrnl/esbuild-plugin-alias',
		setup (build) {
			build.onResolve({ filter: matcher }, async (args) => {
				const nextId = args.path.replace(matcher, (_, id, end) => {
					return entries[id] + end;
				});

				if (shouldResolve) {
					let result = await build.resolve(nextId, args);
					return result;
				}
				else {
					return { path: nextId };
				}
			});
		},
	};
}

function createMatcher (object) {
	const find = Object.keys(object);

	return new RegExp(
		'^(' + find.map(escapeRE).join('|') + ')($|[\\//])'
	);
}

function escapeRE (string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
