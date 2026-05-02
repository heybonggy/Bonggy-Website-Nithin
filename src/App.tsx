import { Routes, Route } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import CookieConsent from "@/components/CookieConsent";
import Landing from "./pages/Landing";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import AppShell from "./components/app/AppShell";
import Dashboard from "./pages/app/Dashboard";
import Accounts from "./pages/app/Accounts";
import AccountDetail from "./pages/app/AccountDetail";
import Signals from "./pages/app/Signals";
import Sequences from "./pages/app/Sequences";
import SequenceBuilder from "./pages/app/SequenceBuilder";
import AmmoPacks from "./pages/app/AmmoPacks";
import TrustQueue from "./pages/app/TrustQueue";
import Enrichment from "./pages/app/Enrichment";
import Settings from "./pages/app/Settings";

export default function App() {
  return (
    <>
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Legal Pages */}
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/privacy.html" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/terms.html" element={<Terms />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* App Shell with Sidebar */}
      <Route element={<AppShell />}>
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/accounts" element={<Accounts />} />
        <Route path="/app/accounts/:accountId" element={<AccountDetail />} />
        <Route path="/app/signals" element={<Signals />} />
        <Route path="/app/sequences" element={<Sequences />} />
        <Route path="/app/sequences/builder" element={<SequenceBuilder />} />
        <Route path="/app/ammo" element={<AmmoPacks />} />
        <Route path="/app/trust" element={<TrustQueue />} />
        <Route path="/app/enrichment" element={<Enrichment />} />
        <Route path="/app/settings" element={<Settings />} />
      </Route>
    </Routes>
    <Analytics />
    <CookieConsent />
    </>
  );
}
