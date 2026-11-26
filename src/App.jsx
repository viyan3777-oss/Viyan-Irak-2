import React, { useState } from 'react';
import { Droplet, Car, Lock, Unlock, Plus, Trash2, Printer, MessageCircle } from 'lucide-react';

const CHEF_PIN = '1234';

export default function App() {
  const [lang, setLang] = useState('de');
  const [bay, setBay] = useState('Grube 1');
  const [plate, setPlate] = useState('');
  const [km, setKm] = useState('');
  const [phone, setPhone] = useState('+964');
  const [items, setItems] = useState([
    { id: 1, name: 'Fass-Öl 5W-30 (4L)', price: 35 },
    { id: 2, name: 'Reifen-Service / Montage', price: 20 }
  ]);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [chefUnlocked, setChefUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');

  const total = items.reduce((sum, item) => sum + Number(item.price || 0), 0);

  const addItem = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setItems([...items, { id: Date.now(), name: newName.trim(), price: Number(newPrice || 0) }]);
    setNewName('');
    setNewPrice('');
  };

  const unlockChef = () => {
    if (pinInput === CHEF_PIN) {
      setChefUnlocked(true);
      setPinInput('');
    }
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-slate-950 text-white p-4 pb-16">
      <header className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950">
            <Droplet className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wide">VIYAN GERMAN OIL</h1>
            <p className="text-xs text-slate-400">100m Street / Baharka Road, Erbil</p>
          </div>
        </div>
        <button
          onClick={() => setLang(lang === 'de' ? 'ar' : 'de')}
          className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-medium"
        >
          {lang === 'de' ? 'العربية' : 'Deutsch'}
        </button>
      </header>

      <main className="space-y-5 max-w-xl mx-auto">
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <Car className="w-4 h-4" />
            <span>{lang === 'de' ? 'Fahrzeug & Grube' : 'المركبة والحفرة'}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {['Grube 1', 'Grube 2', 'Grube 3'].map((b) => (
              <button
                key={b}
                onClick={() => setBay(b)}
                className={`py-2 rounded-xl text-sm font-semibold ${
                  bay === b ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Kennzeichen (z. B. 22 A 84920 Erbil)"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Kilometerstand"
              value={km}
              onChange={(e) => setKm(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm"
            />
            <input
              type="tel"
              placeholder="+964..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm"
            />
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <h2 className="font-semibold text-sm text-amber-400">Positionen & Katalog</h2>
          <form onSubmit={addItem} className="flex gap-2">
            <input
              type="text"
              placeholder="Teil / Reifen / Service"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1 rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm"
            />
            <input
              type="number"
              placeholder="$"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="w-20 rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm"
            />
            <button type="submit" className="px-3 py-2 rounded-xl bg-amber-500 text-slate-950 font-semibold">
              <Plus className="w-4 h-4" />
            </button>
          </form>

          <ul className="divide-y divide-slate-800">
            {items.map((item) => (
              <li key={item.id} className="py-2.5 flex items-center justify-between text-sm">
                <span>{item.name}</span>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">${item.price}</span>
                  <button
                    onClick={() => setItems(items.filter((x) => x.id !== item.id))}
                    className="text-slate-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between font-bold">
            <span>Gesamt</span>
            <span className="text-amber-400">${total}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 text-sm font-medium"
            >
              <Printer className="w-4 h-4" />
              <span>80mm Bon</span>
            </button>
            <a
              href={`https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                `VIYAN GERMAN OIL Erbil – Service-Erinnerung (105 Tage) für Kennzeichen ${plate || '-'}`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm flex items-center gap-2">
              {chefUnlocked ? <Unlock className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-amber-400" />}
              Chef-Cockpit
            </span>
            {chefUnlocked && (
              <button
                onClick={() => setChefUnlocked(false)}
                className="text-xs text-slate-400 underline"
              >
                Sperren
              </button>
            )}
          </div>
          {!chefUnlocked ? (
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="PIN (1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="flex-1 rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm"
              />
              <button
                onClick={unlockChef}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-sm font-semibold"
              >
                Öffnen
              </button>
            </div>
          ) : (
            <p className="text-xs text-emerald-300">
              Chef-Bereich aktiv – Katalog & Tagesübersicht freigeschaltet.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
