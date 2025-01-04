import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateProjectView from "./pages/CreateProjectView";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen items-center justify-start sm:justify-center sm:p-10">
        <CreateProjectView />
      </div>
    </QueryClientProvider>
  );
}

export default App;
