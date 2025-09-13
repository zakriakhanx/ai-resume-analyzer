import { isRouteErrorResponse, useRouteError } from "react-router";

export default function NotFoundPage() {
  const error = useRouteError();
  
  // Return early if the error is not a 404
  if (!isRouteErrorResponse(error)) {
    throw error;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">404</h1>
      <p>The requested page could not be found.</p>
    </main>
  );
}

// Handle any errors that might occur in the component itself
export function ErrorBoundary() {
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Error</h1>
      <p>An unexpected error occurred.</p>
    </main>
  );
}