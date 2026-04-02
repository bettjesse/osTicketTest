import { UIRenderer } from "./renderer/UIRenderer";
import { registerDefaultElements } from "./renderer/registerDefaultElements";
import { PageShell } from "./components/shells/PageShell/PageShell";
import { ravenPage } from "./renderer/examples/ravenPage";

// Register all element types once at app startup
registerDefaultElements();

/**
 * App — renders the spec's full page example inside a PageShell.
 *
 * The JSON data lives in `renderer/examples/ravenPage.ts` — simulating
 * what would come from a backend API response in production.
 * The frontend just receives and projects it.
 */

function App() {
  return (
    <PageShell title="The Raven" subtitle="A poem by Edgar Allan Poe">
      <UIRenderer node={ravenPage} />
    </PageShell>
  );
}

export default App;
