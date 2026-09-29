"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

type OpenPanel = "menu" | "whatsapp" | null;

const menuItems = [
  {
    label: "HOME",
    href: "/",
    icon: "/images/menu-icons/home-icon.svg",
    alt: "Home navigation icon",
  },
  {
    label: "ABOUT",
    href: "/about",
    icon: "/images/menu-icons/about-icon.svg",
    alt: "About Graphic Wolves navigation icon",
  },
  {
    label: "OUR SERVICES",
    href: "/services",
    icon: "/images/menu-icons/services-icon.svg",
    alt: "Graphic Wolves services navigation icon",
  },
];

export default function Header({ variant = "default" }: { variant?: "default" | "light" }) {
  const pathname = usePathname();
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);

  const closePanels = () => setOpenPanel(null);
  const menuOpen = openPanel === "menu";
  const whatsappOpen = openPanel === "whatsapp";

  const handleMouseEnter = (panel: OpenPanel) => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      setOpenPanel(panel);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      setOpenPanel(null);
    }
  };

  const togglePanel = (panel: OpenPanel) => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  const isMenuItemActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/about") return pathname === "/about";
    if (href === "/services") return pathname === "/services" || pathname.startsWith("/services/");
    return false;
  };

  return (
    <>
      <div
        className={`${styles.backdrop} ${openPanel ? styles.backdropVisible : ""}`}
        aria-hidden="true"
        onClick={closePanels}
      />

      <header className={`${styles.header} ${variant === "light" ? styles.headerLight : ""}`}>
        <div
          className={styles.menuShell}
          onMouseEnter={() => handleMouseEnter("menu")}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`${styles.menuTrigger} ${menuOpen ? styles.triggerHidden : ""}`}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-menu-panel"
            onClick={() => togglePanel("menu")}
          >
            <span className={styles.menuIconWrap} aria-hidden="true">
              <Image
                className={styles.menuIcon}
                src="/images/menu-swirl.svg"
                alt=""
                width={48}
                height={48}
                priority
              />
            </span>
            <span className={styles.triggerLabel}>Menu</span>
          </button>

          <nav
            id="site-menu-panel"
            className={`${styles.menuPanel} ${menuOpen ? styles.panelOpen : ""}`}
            aria-label="Primary navigation"
          >
            <div className={styles.panelTopRow}>
              <div className={styles.panelBrand}>
                <span className={styles.panelRing} aria-hidden="true">
                  <Image src="/images/menu-swirl.svg" alt="" width={48} height={48} />
                </span>
                <span>Menu</span>
              </div>

              <button
                className={styles.closeButton}
                type="button"
                onClick={closePanels}
                aria-label="Close navigation menu"
              >
                <span />
                <span />
              </button>
            </div>

            <div className={styles.menuLinks}>
              {menuItems.map((item) => {
                const isHomeRoute = item.href === "/" || item.href.startsWith("/#");

                const content = (
                  <>
                    <span className={styles.navIconWrap}>
                      <Image
                        src={item.icon}
                        alt={item.alt}
                        width={38}
                        height={38}
                        className={styles.navIconImage}
                      />
                    </span>
                    <span>{item.label}</span>
                  </>
                );

                if (isHomeRoute) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={closePanels}
                      className={isMenuItemActive(item.href) ? styles.activeLink : ""}
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closePanels}
                    className={isMenuItemActive(item.href) ? styles.activeLink : ""}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>

            <Link
              className={styles.workButton}
              href="/our-work"
              onClick={closePanels}
              aria-current={pathname === "/our-work" ? "page" : undefined}
            >
              ALL OUR WORK
            </Link>
          </nav>
        </div>

        <a className={styles.logo} href="/" aria-label="Graphic Wolves home page">
          <Image
            src="/images/graphic-logo.svg"
            alt="Graphic Wolves creative agency logo"
            width={290}
            height={64}
            priority
          />
        </a>

        <div
          className={styles.whatsappShell}
          onMouseEnter={() => handleMouseEnter("whatsapp")}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`${styles.bookTrigger} ${whatsappOpen ? styles.bookTriggerHidden : ""}`}
            type="button"
            aria-expanded={whatsappOpen}
            aria-controls="whatsapp-panel"
            onClick={() => togglePanel("whatsapp")}
          >
            <span>Book Now</span>
            <span className={styles.whatsappIconWrap}>
              <Image
                src="/images/whatsapp-icon.svg"
                alt="Open Graphic Wolves WhatsApp booking panel"
                width={30}
                height={30}
                priority
              />
            </span>
          </button>

          <aside
            id="whatsapp-panel"
            className={`${styles.whatsappPanel} ${whatsappOpen ? styles.panelOpen : ""}`}
            aria-label="WhatsApp booking information"
          >
            <div className={styles.whatsappTopIcon}>
              <Image src="/images/whatsapp-icon.svg" alt="WhatsApp logo" width={40} height={40} />
            </div>

            <Image
              className={styles.qrCode}
              src="/images/whatsapp-qr-placeholder.svg"
              alt="QR code to start a WhatsApp chat with Graphic Wolves"
              width={190}
              height={190}
            />

            <div className={styles.whatsappCopy}>
              <h2>whatsapp us</h2>
              <p>
                Scan the QR code to chat
                <br />
                with us via your smartphone.
              </p>
              <a href="/#contact">Chat via desktop</a>
            </div>
          </aside>
        </div>
      </header>
    </>
  );
}
