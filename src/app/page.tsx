"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [valueFromApi, setValueFromApi] = useState("loading");
  const [rerender, forceRerender] = useState(0);

  useEffect(() => {
    setValueFromApi("loading");
    let ignore = false;

    fetch("/api/counter").then((result) => {
      result.json().then((data) => {
        if (!ignore) {
          setValueFromApi(data.cnt);
        }
      });
    });

    return () => {
      ignore = true;
    };
  }, [rerender]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    fetch("/api/counter", { method: "POST" }).then((result) => {
      result.json().then(() => {
        forceRerender((prev) => prev + 1);
      });
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {valueFromApi}
      <form onSubmit={handleSubmit}>
        <button>Submit</button>
      </form>
    </main>
  );
}
