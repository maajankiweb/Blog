import { Metadata } from "next";
import CartClient from "./CartClient";

export const metadata: Metadata = {
  title: "Shopping Cart | Maajanki Digital Store",
  description: "Review and manage your selected digital products, templates, and plugins before secure checkout.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function CartPage() {
  return <CartClient />;
}
