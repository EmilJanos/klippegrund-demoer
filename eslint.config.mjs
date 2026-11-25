// Lintopsætning efter Next.js 16's eget format (flat config). Skiftet fra FlatCompat 13. nov. 2026.
// ESLint 10 venter, til Next' plugins (react, import, jsx-a11y) understøtter det.
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // React Compilers nye regler (react-hooks 7). De rammer mønstre, vi bruger bevidst (seneste værdi i en ref til
    // Klints animation, cookie læst i en effect). Vi bruger ikke React Compiler, så de står som advarsler, ikke fejl.
    rules: {
      "react-hooks/refs": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  globalIgnores(["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
