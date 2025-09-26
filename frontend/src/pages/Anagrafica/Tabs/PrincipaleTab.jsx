import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaUser, FaAddressBook, FaBriefcase, FaGraduationCap, FaCertificate, FaClipboardList, FaBuilding, FaLayerGroup } from "react-icons/fa";

const PrincipaleTab = () => {
  const { ordineId, anagraficaId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/ordini/${ordineId}/anagrafica/${anagraficaId}/view`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setData(res.data.data);
      } catch (err) {
        console.error("Errore caricamento dati principali:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [ordineId, anagraficaId, token]);

  if (loading) return <p className="text-center text-gray-500">Caricamento in corso...</p>;
  if (!data) return <p className="text-center text-red-500">Nessun dato trovato</p>;

  const formatDate = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    if (isNaN(d)) return value;
    return d.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  const Badge = ({ value }) => (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      {value ? "Sì" : "No"}
    </span>
  );

  const toggleCollapse = (section) => {
    setCollapsed(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const Section = ({ title, icon, sectionKey, children }) => (
    <div className="p-6 bg-white rounded-xl shadow border mb-4">
      <div 
        className="flex items-center justify-between cursor-pointer" 
        onClick={() => toggleCollapse(sectionKey)}
      >
        <div className="flex items-center gap-2 text-blue-700 font-semibold text-lg">
          {icon} {title}
        </div>
        <div className="text-gray-500">{collapsed[sectionKey] ? "+" : "-"}</div>
      </div>
      {!collapsed[sectionKey] && <div className="mt-4">{children}</div>}
    </div>
  );

  return (
    <div className="space-y-6">

      {/* Info principali */}
      <Section title={`${data.an_nome} ${data.ancognom}`} icon={<FaUser />} sectionKey="info">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p><span className="font-semibold">Seriale:</span> {data.anseriale}</p>
          <p><span className="font-semibold">Codice Fiscale:</span> {data.ancodfis}</p>
          <p><span className="font-semibold">Partita IVA:</span> {data.anpariva}</p>
          <p><span className="font-semibold">Sesso:</span> {data.an_sesso}</p>
          <p><span className="font-semibold">Titolo:</span> {data.antitolo}</p>
          <p><span className="font-semibold">Data di nascita:</span> {formatDate(data.andatnas)}</p>
          <p><span className="font-semibold">Comune di nascita:</span> {data.ancomnas}</p>
          <p><span className="font-semibold">Località nascita:</span> {data.anlocnas}</p>
          <p><span className="font-semibold">Provincia nascita:</span> {data.anpronas}</p>
          <p><span className="font-semibold">Nazione nascita:</span> {data.annaznas}</p>
          <p><span className="font-semibold">Codice Nazionalità:</span> {data.ancodnaz}</p>
        </div>
      </Section>

      {/* Recapiti */}
      <Section title="Recapiti" icon={<FaAddressBook />} sectionKey="recapiti">
        {data.recapiti?.length > 0 ? (
          <ul className="space-y-4 text-gray-700">
            {data.recapiti.map(r => (
              <li key={r.id} className="border p-3 rounded hover:shadow transition">
                <p><span className="font-semibold">Tipo Indirizzo:</span> {r.antipind}</p>
                <p><span className="font-semibold">Indirizzo:</span> {r.anindiri}</p>
                <p><span className="font-semibold">CAP:</span> {r.an_cap}</p>
                <p><span className="font-semibold">Telefono:</span> {r.antelefo}</p>
                <p><span className="font-semibold">Sito Web:</span> {r.anpubweb}</p>
              </li>
            ))}
          </ul>
        ) : <p className="text-gray-400">Nessun recapito</p>}
      </Section>

      {/* Contatti */}
      <Section title="Contatti" icon={<FaClipboardList />} sectionKey="contatti">
        {data.contatti?.length > 0 ? (
          <ul className="space-y-4 text-gray-700">
            {data.contatti.map(c => (
              <li key={c.id} className="border p-3 rounded hover:shadow transition">
                <p><span className="font-semibold">Tipo Contatto:</span> {c.antipcon}</p>
                <p><span className="font-semibold">Descrizione:</span> {c.andescon}</p>
                <p><span className="font-semibold">Sito Web:</span> {c.anpubweb ?? "-"}</p>
              </li>
            ))}
          </ul>
        ) : <p className="text-gray-400">Nessun contatto</p>}
      </Section>

      {/* Attività Professionale */}
      <Section title="Attività Professionale" icon={<FaBriefcase />} sectionKey="attivita">
        {data.attivita_professionale?.length > 0 ? (
          <ul className="space-y-4 text-gray-700">
            {data.attivita_professionale.map(a => (
              <li key={a.id} className="border p-3 rounded hover:shadow transition">
                <p><span className="font-semibold">Codice Attività:</span> {a.ancodatt}</p>
                <p><span className="font-semibold">Descrizione Attività:</span> {a.andesatt}</p>
                <p><span className="font-semibold">Periodo:</span> {formatDate(a.andtinap)} – {formatDate(a.andtifap)}</p>
                <p><span className="font-semibold">CCNL:</span> {a.andiccnl}</p>
              </li>
            ))}
          </ul>
        ) : <p className="text-gray-400">Nessuna attività</p>}
      </Section>

      {/* Studio */}
      <Section title="Studio" icon={<FaBuilding />} sectionKey="studio">
        {data.studio?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.studio.map(s => (
              <div key={s.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-gray-50">
                <p><span className="font-semibold">Studio Associato:</span> {s.anstuass}</p>
                <p><span className="font-semibold">Carica Studio:</span> {s.ancarstu}</p>
                <p><span className="font-semibold">Data Inizio:</span> {formatDate(s.andtinsa)}</p>
                <p><span className="font-semibold">Data Fine:</span> {formatDate(s.andtfisa)}</p>
              </div>
            ))}
          </div>
        ) : <p className="text-gray-400">Nessuno studio registrato</p>}
      </Section>

      {/* Albo & Settori */}
      <Section title="Albo & Settori" icon={<FaLayerGroup />} sectionKey="albi">
        {data.albi?.length > 0 ? (
          <ul className="space-y-4 text-gray-700">
            {data.albi.map(albo => (
              <li key={albo.id} className="border p-3 rounded hover:shadow transition">
                <p><span className="font-semibold">Tipo Iscrizione:</span> {albo.antipisc}</p>
                <p><span className="font-semibold">Numero Iscrizione:</span> {albo.annunisc}</p>
                <p><span className="font-semibold">Data Iscrizione:</span> {formatDate(albo.andatisc)}</p>
                {albo.settori?.length > 0 && (
                  <ul className="mt-2 pl-5 text-gray-600 list-disc">
                    {albo.settori.map(s => (
                      <li key={s.id}>
                        <p><span className="font-semibold">Sezione:</span> {s.ansezion}</p>
                        <p><span className="font-semibold">Settore:</span> {s.ansettore}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ) : <p className="text-gray-400">Nessun albo</p>}
      </Section>

      {/* Abilitazioni */}
      <Section title="Abilitazioni" icon={<FaCertificate />} sectionKey="abilitazioni">
        {data.abilitazioni?.length > 0 ? (
          <ul className="space-y-4 text-gray-700">
            {data.abilitazioni.map(ab => (
              <li key={ab.id} className="border p-3 rounded hover:shadow transition">
                <p><span className="font-semibold">Nome Abilitazione:</span> {ab.anambabi}</p>
                <p><span className="font-semibold">Verificata:</span> <Badge value={ab.anabilve} /></p>
              </li>
            ))}
          </ul>
        ) : <p className="text-gray-400">Nessuna abilitazione</p>}
      </Section>

      {/* Titoli */}
      <Section title="Titoli" icon={<FaGraduationCap />} sectionKey="titoli">
        {data.titoli?.length > 0 ? (
          <ul className="space-y-4 text-gray-700">
            {data.titoli.map(t => (
              <li key={t.id} className="border p-3 rounded hover:shadow transition">
                <p><span className="font-semibold">Titolo:</span> {t.ancodtit}</p>
                <p><span className="font-semibold">Verificato:</span> <Badge value={t.antivver} /></p>
              </li>
            ))}
          </ul>
        ) : <p className="text-gray-400">Nessun titolo</p>}
      </Section>

    </div>
  );
};

export default PrincipaleTab;
