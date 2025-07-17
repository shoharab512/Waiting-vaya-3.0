export { auth as middleware } from "@/auth"
export const config = {
  runtime: 'nodejs',
  unstable_allowDynamic: [
    "/node_modules/mongoose/dist/**",
    '/node_modules/reflect-metadata/**',
    '/node_modules/next-auth/react/index.js',
  ],
};