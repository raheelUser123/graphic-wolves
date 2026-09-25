"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import styles from "./Header.module.css";

type OpenPanel =
  | "menu"
  | "whatsapp"
  | null;

const menuItems = [
  {
    label: "HOME",
    href: "/",
    icon:
      "/images/menu-icons/home-icon.svg",
    alt:
      "Home navigation icon",
  },

  {
    label: "ABOUT",
    href: "/#about",
    icon:
      "/images/menu-icons/about-icon.svg",
    alt:
      "About Graphic Wolves navigation icon",
  },

  {
    label: "OUR SERVICES",
    href: "/services",
    icon:
      "/images/menu-icons/services-icon.svg",
    alt:
      "Graphic Wolves services navigation icon",
  },
];

export default function Header() {
  const pathname =
    usePathname();

  const [
    openPanel,
    setOpenPanel,
  ] =
    useState<OpenPanel>(
      null
    );

  const closePanels = () => {
    setOpenPanel(null);
  };

  const menuOpen =
    openPanel ===
    "menu";

  const whatsappOpen =
    openPanel ===
    "whatsapp";

  /* =========================================
     ACTIVE LINK
  ========================================= */

  const isActiveLink = (
    href: string
  ) => {
    /*
      HOME
    */

    if (href === "/") {
      return (
        pathname === "/"
      );
    }

    /*
      Homepage anchors:
      /#about
      /#work
      etc

      usePathname hash return nahi karta,
      isliye inko route-active nahi bana rahe.
    */

    if (
      href.startsWith(
        "/#"
      )
    ) {
      return false;
    }

    /*
      Services + service inner pages
    */

    return (
      pathname === href ||
      pathname.startsWith(
        `${href}/`
      )
    );
  };

  return (
    <>
      {/* =====================================
          BACKDROP
      ===================================== */}

      <div
        className={`${
          styles.backdrop
        } ${
          openPanel
            ? styles.backdropVisible
            : ""
        }`}
        aria-hidden="true"
        onClick={
          closePanels
        }
      />

      {/* =====================================
          HEADER
      ===================================== */}

      <header
        className={
          styles.header
        }
      >
        {/* =================================
            MENU AREA
        ================================= */}

        <div
          className={
            styles.menuShell
          }
          onMouseEnter={() =>
            setOpenPanel(
              "menu"
            )
          }
          onMouseLeave={
            closePanels
          }
        >
          {/* MENU BUTTON */}

          <button
            className={`${
              styles.menuTrigger
            } ${
              menuOpen
                ? styles.triggerHidden
                : ""
            }`}
            type="button"
            aria-expanded={
              menuOpen
            }
            aria-controls="site-menu-panel"
            onClick={() =>
              setOpenPanel(
                (
                  current
                ) =>
                  current ===
                  "menu"
                    ? null
                    : "menu"
              )
            }
          >
            <span
              className={
                styles.menuIconWrap
              }
              aria-hidden="true"
            >
              <Image
                className={
                  styles.menuIcon
                }
                src="/images/menu-swirl.svg"
                alt=""
                width={48}
                height={48}
                priority
              />
            </span>

            <span
              className={
                styles.triggerLabel
              }
            >
              Menu
            </span>
          </button>

          {/* =================================
              MENU PANEL
          ================================= */}

          <nav
            id="site-menu-panel"
            className={`${
              styles.menuPanel
            } ${
              menuOpen
                ? styles.panelOpen
                : ""
            }`}
            aria-label="Primary navigation"
          >
            {/* TOP */}

            <div
              className={
                styles.panelTopRow
              }
            >
              <div
                className={
                  styles.panelBrand
                }
              >
                <span
                  className={
                    styles.panelRing
                  }
                  aria-hidden="true"
                >
                  <Image
                    src="/images/menu-swirl.svg"
                    alt=""
                    width={48}
                    height={48}
                  />
                </span>

                <span>
                  Menu
                </span>
              </div>

              <button
                className={
                  styles.closeButton
                }
                type="button"
                onClick={
                  closePanels
                }
                aria-label="Close navigation menu"
              >
                <span />
                <span />
              </button>
            </div>

            {/* =================================
                MENU LINKS
            ================================= */}

            <div
              className={
                styles.menuLinks
              }
            >
              {menuItems.map(
                (item) => {
                  const active =
                    isActiveLink(
                      item.href
                    );

                  return (
                    <Link
                      key={
                        item.label
                      }
                      href={
                        item.href
                      }
                      onClick={
                        closePanels
                      }
                      className={
                        active
                          ? styles.activeLink
                          : undefined
                      }
                    >
                      <span
                        className={
                          styles.navIconWrap
                        }
                      >
                        <Image
                          src={
                            item.icon
                          }
                          alt={
                            item.alt
                          }
                          width={
                            38
                          }
                          height={
                            38
                          }
                          className={
                            styles.navIconImage
                          }
                        />
                      </span>

                      <span>
                        {
                          item.label
                        }
                      </span>
                    </Link>
                  );
                }
              )}
            </div>

            {/* =================================
                WORK BUTTON
            ================================= */}

            <Link
              className={
                styles.workButton
              }
              href="/#work"
              onClick={
                closePanels
              }
            >
              ALL OUR WORK
            </Link>
          </nav>
        </div>

        {/* =================================
            CENTER LOGO
        ================================= */}

        <Link
          className={
            styles.logo
          }
          href="/"
          aria-label="Graphic Wolves home page"
        >
          <Image
            src="/images/graphic-logo.svg"
            alt="Graphic Wolves creative agency logo"
            width={290}
            height={64}
            priority
          />
        </Link>

        {/* =================================
            WHATSAPP AREA
        ================================= */}

        <div
          className={
            styles.whatsappShell
          }
          onMouseEnter={() =>
            setOpenPanel(
              "whatsapp"
            )
          }
          onMouseLeave={
            closePanels
          }
        >
          {/* BOOK NOW */}

          <button
            className={`${
              styles.bookTrigger
            } ${
              whatsappOpen
                ? styles.bookTriggerHidden
                : ""
            }`}
            type="button"
            aria-expanded={
              whatsappOpen
            }
            aria-controls="whatsapp-panel"
            onClick={() =>
              setOpenPanel(
                (
                  current
                ) =>
                  current ===
                  "whatsapp"
                    ? null
                    : "whatsapp"
              )
            }
          >
            <span>
              Book Now
            </span>

            <span
              className={
                styles.whatsappIconWrap
              }
            >
              <Image
                src="/images/whatsapp-icon.svg"
                alt="Open Graphic Wolves WhatsApp booking panel"
                width={30}
                height={30}
                priority
              />
            </span>
          </button>

          {/* =================================
              WHATSAPP PANEL
          ================================= */}

          <aside
            id="whatsapp-panel"
            className={`${
              styles.whatsappPanel
            } ${
              whatsappOpen
                ? styles.panelOpen
                : ""
            }`}
            aria-label="WhatsApp booking information"
          >
            <div
              className={
                styles.whatsappTopIcon
              }
            >
              <Image
                src="/images/whatsapp-icon.svg"
                alt="WhatsApp logo"
                width={40}
                height={40}
              />
            </div>

            <Image
              className={
                styles.qrCode
              }
              src="/images/whatsapp-qr-placeholder.svg"
              alt="QR code to start a WhatsApp chat with Graphic Wolves"
              width={190}
              height={190}
            />

            <div
              className={
                styles.whatsappCopy
              }
            >
              <h2>
                whatsapp us
              </h2>

              <p>
                Scan the QR
                code to chat
                <br />
                with us via
                your smartphone.
              </p>

              <Link
                href="/#contact"
                onClick={
                  closePanels
                }
              >
                Chat via desktop
              </Link>
            </div>
          </aside>
        </div>
      </header>
    </>
  );
}