import { Plugin } from 'esbuild';


export default function envPlugin (options: PluginOptions): Plugin;

export interface PluginOptions {
	entries: Record<string, string>;
	shouldResolve?: boolean;
}
