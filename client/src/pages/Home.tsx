/* Campus Field Notes: tactile editorial marketplace, operational warmth, explicit state transitions. */
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ArrowRight, BadgeCheck, BookOpen, Check, Clock3, Filter, KeyRound, MapPin, PackagePlus, ShieldCheck, Sparkles, Tag, Trash2, X } from "lucide-react";

const asset = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663901981359/PDPDEDRNaSpWxAXBEW5sEb/dorm-marketplace-hero-NUV4Gp5Z7PgikMHRR3zPse.webp",
  textbook: "https://d2xsxph8kpxj0f.cloudfront.net/310519663901981359/PDPDEDRNaSpWxAXBEW5sEb/dorm-marketplace-textbook-Zbcc7Aywa8aoQJe9o2SAiW.webp",
  lamp: "https://d2xsxph8kpxj0f.cloudfront.net/310519663901981359/PDPDEDRNaSpWxAXBEW5sEb/dorm-marketplace-lamp-MzLRFRWXfdRu4SeMaco7wB.webp",
  bike: "https://d2xsxph8kpxj0f.cloudfront.net/310519663901981359/PDPDEDRNaSpWxAXBEW5sEb/dorm-marketplace-bike-Wi2E59hgdcutXSL74oamA4.webp",
  logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663901981359/PDPDEDRNaSpWxAXBEW5sEb/dorm-marketplace-logo-Lg9YVBR6gFZBPxD2LTHPs2.png",
};

type Status = "available" | "held" | "sold" | "removed";
type Item = { id: number; title: string; category: string; price: number; dorm: string; seller: string; note: string; image: string; status: Status; expiresAt?: number; claimedBy?: string };

const seedItems: Item[] = [
  { id: 1, title: "Intro to Economics, 4th ed.", category: "Study", price: 12, dorm: "Maple Hall", seller: "Ari P.", note: "Clean pages, a few useful margin notes.", image: asset.textbook, status: "available" },
  { id: 2, title: "Amber desk lamp", category: "Room", price: 0, dorm: "North Quad", seller: "Jules R.", note: "Warm light, perfect for late library returns.", image: asset.lamp, status: "available" },
  { id: 3, title: "Helmet + U-lock set", category: "Move", price: 18, dorm: "Cedar House", seller: "Mina K.", note: "One campus season. Pickup by the bike racks.", image: asset.bike, status: "available" },
];

const formatMoney = (amount: number) => amount === 0 ? "FREE" : `$${amount}`;

export default function Home() {
  const [items, setItems] = useState<Item[]>(seedItems);
  const [filter, setFilter] = useState("All items");
  const [showForm, setShowForm] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [form, setForm] = useState({ title: "", price: "", dorm: "", note: "", category: "Room" });
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setItems((current) => current.map((item) => item.status === "held" && item.expiresAt && item.expiresAt <= now ? { ...item, status: "available", expiresAt: undefined, claimedBy: undefined } : item));
  }, [now]);

  const categories = ["All items", "Study", "Room", "Move"];
  const visibleItems = useMemo(() => items.filter((item) => item.status !== "removed" && (filter === "All items" || item.category === filter)), [items, filter]);
  const availableCount = items.filter((item) => item.status === "available").length;

  function claimItem(id: number) {
    setItems((current) => {
      const item = current.find((entry) => entry.id === id);
      if (!item || item.status !== "available") {
        toast.error("That item is no longer available.");
        return current;
      }
      toast.success("Item held for you", { description: "You have 10 minutes to confirm pickup." });
      return current.map((entry) => entry.id === id ? { ...entry, status: "held", claimedBy: "You", expiresAt: Date.now() + 10 * 60 * 1000 } : entry);
    });
  }

  function confirmPickup(id: number) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, status: "sold", expiresAt: undefined } : item));
    toast.success("Pickup confirmed", { description: "The listing is now closed." });
  }

  function releaseHold(id: number) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, status: "available", expiresAt: undefined, claimedBy: undefined } : item));
    toast("Hold released", { description: "The item is available to the campus again." });
  }

  function sellerOverride(id: number, action: "sold" | "removed") {
    setItems((current) => current.map((item) => item.id === id ? { ...item, status: action, expiresAt: undefined } : item));
    toast(action === "sold" ? "Marked as sold elsewhere" : "Listing removed", { description: "The change is visible immediately." });
  }

  function addListing(event: React.FormEvent) {
    event.preventDefault();
    if (!form.title.trim() || !form.dorm.trim()) return toast.error("Add a title and dorm pickup spot first.");
    const newItem: Item = { id: Date.now(), title: form.title.trim(), category: form.category, price: Number(form.price) || 0, dorm: form.dorm.trim(), seller: "You", note: form.note.trim() || "A useful thing looking for its next room.", image: form.category === "Study" ? asset.textbook : form.category === "Move" ? asset.bike : asset.lamp, status: "available" };
    setItems((current) => [newItem, ...current]);
    setForm({ title: "", price: "", dorm: "", note: "", category: "Room" });
    setShowForm(false);
    toast.success("Listing posted", { description: "Your item is now visible to campus." });
  }

  const remaining = (expiresAt?: number) => expiresAt ? Math.max(0, Math.ceil((expiresAt - now) / 60000)) : 0;

  return (
    <div className="app-shell">
      <aside className="side-rail">
        <div className="rail-brand"><img src={asset.logo} alt="Dorm Marketplace mark" /><div><span className="eyebrow">Campus edition</span><strong>Dorm<br />Marketplace</strong></div></div>
        <div className="rail-rule" />
        <div className="rail-note"><span className="eyebrow">The simple version</span><p>Useful stuff stays close. Every handoff happens on campus, between people who share the same map.</p></div>
        <div className="rail-nav"><a href="#feed" className="active"><span>01</span> Browse board</a><a href="#how-it-works"><span>02</span> House rules</a><a href="#seller-desk"><span>03</span> Seller desk</a></div>
        <div className="rail-footer"><span className="status-dot" /> Live campus board<br /><small>Updated just now</small></div>
      </aside>

      <main className="main-canvas">
        <header className="topbar"><span className="mobile-mark">D/M</span><span className="issue">Issue 01 / Fall term</span><nav><button onClick={() => setShowRules(true)}>How it works</button><button className="text-button" onClick={() => setShowForm(true)}><PackagePlus size={16} /> List an item</button></nav></header>

        <section className="hero-block">
          <div className="hero-copy"><span className="eyebrow accent">A better kind of secondhand</span><h1>Good stuff,<br /><em>still on campus.</em></h1><p>Find the things your dorm needs next — from textbooks to tiny fridges — with a simple, in-person handoff.</p><div className="hero-actions"><a className="primary-button" href="#feed">Browse the board <ArrowRight size={17} /></a><button className="quiet-button" onClick={() => setShowForm(true)}>Post something useful</button></div></div>
          <div className="hero-art"><img src={asset.hero} alt="A warm illustrated dorm hallway noticeboard with campus items" /><span className="hero-caption">A small exchange<br />for a shared place.</span></div>
        </section>

        <section className="signal-row"><div><span className="eyebrow">Board status</span><strong>{availableCount} items available</strong></div><div><span className="eyebrow">Handoff rule</span><strong>Campus only · no shipping</strong></div><div><span className="eyebrow">Hold window</span><strong>10 minutes to confirm</strong></div></section>

        <section id="feed" className="feed-section"><div className="section-heading"><div><span className="eyebrow accent">The board</span><h2>Find a new-to-you useful thing.</h2></div><div className="filters">{categories.map((category) => <button key={category} className={filter === category ? "selected" : ""} onClick={() => setFilter(category)}>{category}</button>)}</div></div>
          <div className="listing-grid">{visibleItems.map((item, index) => <article className={`listing-card card-${index % 3}`} key={item.id}><div className="card-image"><img src={item.image} alt="" /><span className={`state-badge ${item.status}`}>{item.status === "available" ? "Available" : item.status === "held" ? `Held · ${remaining(item.expiresAt)}m` : item.status === "sold" ? "Closed" : "Removed"}</span></div><div className="card-body"><div className="meta-line"><span>{item.category}</span><span>{item.dorm}</span></div><h3>{item.title}</h3><p>{item.note}</p><div className="card-bottom"><strong className={item.price === 0 ? "free" : ""}>{formatMoney(item.price)}</strong><span className="seller">by {item.seller}</span></div>{item.status === "available" && <button className="claim-button" onClick={() => claimItem(item.id)}>Claim item <ArrowRight size={15} /></button>}{item.status === "held" && <div className="held-actions"><button className="confirm-button" onClick={() => confirmPickup(item.id)}><Check size={15} /> Confirm pickup</button><button className="release-button" onClick={() => releaseHold(item.id)}>Release</button></div>}{item.status === "sold" && <div className="closed-note"><BadgeCheck size={15} /> Handoff confirmed</div>}{(item.status === "available" || item.status === "held") && <div className="seller-tools"><span><KeyRound size={12} /> Seller controls</span><button onClick={() => sellerOverride(item.id, "sold")}>Mark sold</button><button onClick={() => sellerOverride(item.id, "removed")}><Trash2 size={12} /> Remove</button></div>}</div></article>)}</div>
          {visibleItems.length === 0 && <div className="empty-state"><Sparkles size={20} /><p>No listings in this corner of the board yet.</p><button onClick={() => setShowForm(true)}>Post the first one</button></div>}
        </section>

        <section id="how-it-works" className="rules-section"><div className="rules-intro"><span className="eyebrow accent">Small rules, less mess</span><h2>Designed for the weird bits.</h2><p>The happy path is easy. The useful part is making sure a listing cannot get stuck in limbo.</p></div><div className="rule-list"><div><span>01</span><div><strong>One item, one hold.</strong><p>The first successful claim changes the state immediately. A second attempt gets a clear “no longer available.”</p></div></div><div><span>02</span><div><strong>Ghost buyers get 10 minutes.</strong><p>If pickup is not confirmed, the hold expires and the item returns to the board automatically.</p></div></div><div><span>03</span><div><strong>Sellers stay in control.</strong><p>Mark an item sold elsewhere or remove it instantly when real life changes the plan.</p></div></div></div></section>

        <section id="seller-desk" className="seller-strip"><div><span className="eyebrow">Seller desk</span><h2>Have something with a next owner?</h2><p>Post the essentials. Keep the handoff human.</p></div><button className="primary-button" onClick={() => setShowForm(true)}>Create a listing <PackagePlus size={17} /></button></section>
        <footer><span>DM / 01</span><span>Local by design. Built for the hallway handoff.</span><span>© 2026 Dorm Marketplace</span></footer>
      </main>

      {showForm && <div className="modal-backdrop" onMouseDown={() => setShowForm(false)}><form className="modal-card" onSubmit={addListing} onMouseDown={(event) => event.stopPropagation()}><button type="button" className="modal-close" onClick={() => setShowForm(false)}><X size={18} /></button><span className="eyebrow accent">New notice</span><h2>List something useful.</h2><p className="modal-lede">Keep it clear. A title and a real dorm pickup spot are all this board needs.</p><label>Item title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Compact fan" /></label><div className="form-row"><label>Price<input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0 = free" /></label><label>Category<select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option>Room</option><option>Study</option><option>Move</option></select></label></div><label>Pickup dorm<input value={form.dorm} onChange={(e) => setForm({ ...form, dorm: e.target.value })} placeholder="e.g. Maple Hall" /></label><label>Short note<textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Condition, timing, useful detail..." rows={3} /></label><button className="primary-button full" type="submit">Post to the board <ArrowRight size={17} /></button></form></div>}
      {showRules && <div className="modal-backdrop" onMouseDown={() => setShowRules(false)}><div className="modal-card rules-modal" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowRules(false)}><X size={18} /></button><span className="eyebrow accent">House rules</span><h2>Keep the handoff kind.</h2><div className="modal-rule"><KeyRound size={18} /><p><strong>Campus only.</strong><br />Meet in a shared, public spot. No shipping, no mystery addresses.</p></div><div className="modal-rule"><Clock3 size={18} /><p><strong>Ten-minute hold.</strong><br />Claiming gives you a short window to confirm pickup. If it expires, the item is fair game again.</p></div><div className="modal-rule"><ShieldCheck size={18} /><p><strong>Seller override.</strong><br />Real life wins. Sellers can close or remove a listing immediately.</p></div></div></div>}
    </div>
  );
}
