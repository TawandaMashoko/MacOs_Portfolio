import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { navIcons, navLinks } from "#constants/index.js"; // change to "../constants" or "@/constants" if alias isn't set
import useWindowStore from "#store/window";
import {
  Battery,
  BatteryCharging,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
} from "lucide-react";

const Navbar = () => {
  const { openWindow } = useWindowStore();

  const [wifiOn, setWifiOn] = useState(true);
  const [charging, setCharging] = useState(true);
  const [muted, setMuted] = useState(false);
  const [toast, setToast] = useState(null);

  const toastTimerRef = useRef(null);

  const showToast = (text) => {
    setToast(text);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 1400);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Logo" />
        <p className="font-bold">Tawanda&apos;s Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="menubar-right">
        {toast && <span className="menubar-toast">{toast}</span>}

        <ul className="menubar-icons">
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <button
                type="button"
                className="menubar-btn"
                onClick={() => {
                  const messages = [
                    "Beep.",
                    "Boop.",
                    "*click*", 
                    "Not a real menu bar… but close enough.",
                  ];
                  showToast(messages[Math.floor(Math.random() * messages.length)]);
                }}
                aria-label={`menu-icon-${id}`}
              >
                <img src={img} alt={`icon-${id}`} />
              </button>
            </li>
          ))}

          <li>
            <button
              type="button"
              className={
                charging ? "menubar-btn charging" : "menubar-btn"
              }
              onClick={() => {
                setCharging((c) => !c);
                showToast(charging ? "Charging paused" : "Charging resumed");
              }}
              aria-label="Toggle charging"
              title="Toggle charging"
            >
              {charging ? <BatteryCharging size={18} /> : <Battery size={18} />}
            </button>
          </li>

          <li>
            <button
              type="button"
              className="menubar-btn"
              onClick={() => {
                setWifiOn((w) => !w);
                showToast(wifiOn ? "Wi‑Fi off" : "Wi‑Fi on");
              }}
              aria-label="Toggle Wi-Fi"
              title="Toggle Wi-Fi"
            >
              {wifiOn ? <Wifi size={18} /> : <WifiOff size={18} />}
            </button>
          </li>

          <li>
            <button
              type="button"
              className="menubar-btn"
              onClick={() => {
                setMuted((m) => !m);
                showToast(muted ? "Volume on" : "Muted");
              }}
              aria-label="Toggle sound"
              title="Toggle sound"
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </li>
        </ul>

        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
