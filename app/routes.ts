import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('/auth', 'routes/auth.tsx'),
    route('/upload', 'routes/upload.tsx'),
    route('/resume/:id', 'routes/resume.tsx'),
    // Catch-all route with a special path to avoid ID conflicts
    route('/*', 'routes/_404.tsx'),
] satisfies RouteConfig;
