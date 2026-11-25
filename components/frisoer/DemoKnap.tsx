"use client";

import { useState } from "react";

// Knapper, der i en rigtig side ville ringe op eller booke. Her vises en demobesked i stedet.
export default function DemoKnap({ className, besked, children }: { className?: string; besked: string; children: React.ReactNode }) {
  const [vis, setVis] = useState(false);
  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          setVis(true);
          window.setTimeout(() => setVis(false), 3500);
        }}
      >
        {children}
      </button>
      {vis && (
        <div className="fr-toast" role="status">
          {besked}
        </div>
      )}
    </>
  );
}
