import React, { useState, useEffect } from "react";
import Web3Modal from "./Web3Modal";

import Link from "next/link";
import Image from "next/image";
import RGSlogo from "@/public/rgslogo.svg";

export default function Header(props) {
  const { page } = props;

  return (
    <header
      style={{
        background: "#091929",
        width: "100%",
        height: "10vh",
        padding: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "8px",
            borderRadius: "25px",
          }}
        >
          <Image src={RGSlogo} alt="RGS logo" />
        </div>
        <ul
          style={{
            width: "75%",
            display: "flex",
            justifyContent: "space-around",
            listStyle: "none",
          }}
        >
          <li>
            <Link
              style={{
                color: page ? "lightgray" : "white",
                fontWeight: "bold",
                fontSize: "18px",
                marginRight: "25px",
                textDecoration: "none",
              }}
              href="/"
            >
              Portfolio
            </Link>
          </li>
          <li>
            <Link
              style={{
                color: page === "bridge" ? "white" : "gray",
                fontWeight: "bold",
                fontSize: "18px",
                textDecoration: "none",
                marginRight: "25px",
              }}
              href="/swap"
            >
              Swap
            </Link>
          </li>
          <li>
            <Link
              style={{
                color: page === "bridge" ? "white" : "gray",
                fontWeight: "bold",
                fontSize: "18px",
                textDecoration: "none",
              }}
              href="/bridge"
            >
              Bridge
            </Link>
          </li>
        </ul>
      </nav>
      <div
        style={{
          width: "25%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Web3Modal />
      </div>
    </header>
  );
}
