import { Metadata } from "next";
import MyAccountClient from "./MyAccountClient";

export const metadata: Metadata = {
  title: "My Account & Downloads | MJ Digital",
  description: "Access your purchased digital products, license keys, and order history.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MyAccountPage() {
  return <MyAccountClient />;
}
