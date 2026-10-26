/* Campus Field Notes: fallback routes are misplaced campus notices, not generic SaaS error cards. */
import { ArrowLeft, MapPin } from "lucide-react";
import { Link } from "wouter";

const logo = "https://d2xsxph8kpxj0f.cloudfront.net/310519663901981359/PDPDEDRNaSpWxAXBEW5sEb/dorm-marketplace-logo-Lg9YVBR6gFZBPxD2LTHPs2.png";

export default function NotFound() {
  return <main className="lost-page"><div className="lost-notice"><div className="lost-header"><div className="rail-brand"><img src={logo} alt="Dorm Marketplace mark" /><div><span className="eyebrow">Campus edition</span><strong>Dorm<br />Marketplace</strong></div></div><span className="lost-stamp">Notice 404 / misplaced</span></div><div className="lost-rule" /><div className="lost-body"><span className="eyebrow accent">A note from the hallway</span><h1>This notice wandered<br /><em>off the board.</em></h1><p>The page you were looking for is not pinned here anymore. The useful part of the marketplace is still in one place.</p><Link className="primary-button" href="/"><ArrowLeft size={16} /> Back to the board</Link></div><div className="lost-footer"><span><MapPin size={13} /> Campus only</span><span>DM / 404</span></div></div></main>;
}
