import React from "react";

function DeviceSelector({ device, setDevice }) {
  return (
    <section className="hero">
      <h2>Choose a device to see reusable parts</h2>
      <select value={device} onChange={(e) => setDevice(e.target.value)}>
        {[
          "Mobile",
          "Laptop",
          "TV",
          "Tablet",
          "Desktop PC",
          "Game Console",
          "Camera",
          "Headphones",
          "Printer",
        ].map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </section>
  );
}

export default DeviceSelector;
