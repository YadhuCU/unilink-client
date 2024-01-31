import "./App.css";
import { LeftSidebar } from "./components/LeftSidebar";
import { RightSidebar } from "./components/RightSidebar";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="w-full overflow-hidden h-[100dvh] bg-slate-950 text-slate-300 ">
      <div className="border-slate-900 border-x h-[100dvh] mx-auto overflow-hidden w-[min(1400px,_calc(100%_-_var(--container-padding,_1rem)))] grid md:grid-cols-[minmax(100px,300px),_minmax(300px,100%)] lg:grid-cols-[minmax(100px,300px),_minmax(300px,100%),_400px]">
        <LeftSidebar />
        <Home />
        <RightSidebar />
      </div>
    </div>
  );
}

export default App;
