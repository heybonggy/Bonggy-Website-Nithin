/**
 * Teaches Node the `@/…` alias that tsconfig gives the app, so a build script
 * can import the same modules the site does instead of re-stating their data.
 *
 * Type-only imports are erased before this runs, so only real runtime modules
 * reach the hook — which is why importing a .ts file that references a .tsx
 * component purely as a type still works here.
 */
import { registerHooks } from "node:module";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SRC = join(dirname(fileURLToPath(import.meta.url)), "..", "src");

/** `@/x` → src/x, and a bare `./x` → ./x.ts, the way a bundler would. */
function locate(base) {
  for (const candidate of [`${base}.ts`, `${base}.tsx`, join(base, "index.ts"), base]) {
    if (existsSync(candidate)) return pathToFileURL(candidate).href;
  }
  return null;
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const url = locate(join(SRC, specifier.slice(2)));
      if (url) return { url, shortCircuit: true };
    }

    // TypeScript sources omit the extension on relative imports too.
    if (specifier.startsWith(".") && context.parentURL?.startsWith("file:")) {
      const url = locate(join(dirname(fileURLToPath(context.parentURL)), specifier));
      if (url) return { url, shortCircuit: true };
    }

    return nextResolve(specifier, context);
  },
});
