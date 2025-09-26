import React, { useState, useMemo } from "react";

const PAGE_SIZE = 5; // Numero di log per pagina

const AnagraficaLogs = ({ logs }) => {
  const [searchUser, setSearchUser] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "log_time", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrare i log in base a ricerca e date
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const logTime = new Date(log.log_time);
      const matchesUser = log.user.toLowerCase().includes(searchUser.toLowerCase());
      const matchesStart = startDate ? logTime >= new Date(startDate) : true;
      const matchesEnd = endDate ? logTime <= new Date(endDate) : true;
      return matchesUser && matchesStart && matchesEnd;
    });
  }, [logs, searchUser, startDate, endDate]);

  // Ordinamento
  const sortedLogs = useMemo(() => {
    const sorted = [...filteredLogs];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];
        if (sortConfig.key === "log_time") {
          valA = new Date(valA);
          valB = new Date(valB);
        } else {
          valA = valA?.toString().toLowerCase() ?? "";
          valB = valB?.toString().toLowerCase() ?? "";
        }
        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [filteredLogs, sortConfig]);

  // Paginazione
  const pageCount = Math.ceil(sortedLogs.length / PAGE_SIZE);
  const paginatedLogs = sortedLogs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const requestSort = key => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  if (!logs || logs.length === 0) return <p className="text-gray-500">Nessun log trovato.</p>;

  return (
    <div className="mt-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Storico delle modifiche</h3>

      {/* Filtri */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Cerca per utente..."
          value={searchUser}
          onChange={e => setSearchUser(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Tabella */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              {["log_time", "user", "table", "action", "changes"].map(key => (
                <th
                  key={key}
                  onClick={() => key !== "changes" && requestSort(key)}
                  className={`px-4 py-2 border-b text-sm font-medium text-gray-700 cursor-pointer ${
                    sortConfig.key === key ? "underline" : ""
                  }`}
                >
                  {key === "log_time" ? "Data" : key.charAt(0).toUpperCase() + key.slice(1)}
                  {sortConfig.key === key ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.map(log => (
              <tr key={log.id} className="bg-white hover:bg-gray-50">
                <td className="px-4 py-2 border-b text-sm text-gray-600">{new Date(log.log_time).toLocaleString()}</td>
                <td className="px-4 py-2 border-b text-sm text-gray-600">{log.user}</td>
                <td className="px-4 py-2 border-b text-sm italic text-gray-600">{log.table}</td>
                <td className="px-4 py-2 border-b text-sm text-gray-600">{log.action}</td>
                <td className="px-4 py-2 border-b text-sm text-gray-600">
                  {log.changes.map((c, idx) => (
                    <div key={idx}>
                      <strong>{c.field}</strong>: <span className="text-red-600">{c.before ?? "null"}</span> → <span className="text-green-600">{c.after ?? "null"}</span>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
            {paginatedLogs.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">Nessun log trovato.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginazione */}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Precedente
        </button>
        <span className="px-2 py-1 text-gray-700">{currentPage} / {pageCount}</span>
        <button
          disabled={currentPage === pageCount}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
          className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Successivo
        </button>
      </div>
    </div>
  );
};

export default AnagraficaLogs;
