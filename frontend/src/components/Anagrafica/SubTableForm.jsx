import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSave,
  FiX,
  FiLayers,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SubTableForm = ({
  endpoint,
  fields,
  labels,
  fieldTypes = {},
  selectOptions = {},
  onViewDetail,
}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formDataMap, setFormDataMap] = useState({});
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchItems = async () => {
    try {
      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data.data || []);
    } catch (err) {
      console.error(err);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [endpoint]);

  const handleChange = (id, e) => {
    const { name, type, value, checked } = e.target;
    setFormDataMap((prev) => ({
      ...prev,
      [id]: { ...prev[id], [name]: type === "checkbox" ? checked : value },
    }));
  };

  const handleSave = async (id) => {
    try {
      const data = formDataMap[id];
      if (id === "new") {
        await axios.post(endpoint, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.put(`${endpoint}/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setEditingId(null);
      setFormDataMap({});
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Vuoi davvero eliminare questo elemento?")) return;
    try {
      await axios.delete(`${endpoint}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setFormDataMap({ [item.id]: { ...item } });
  };

  const startAdd = () => {
    setEditingId("new");
    setFormDataMap({ new: {} });
  };

  const filteredItems = items.filter((item) =>
    fields.some((f) =>
      (item[f] || "").toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const displayedItems =
    editingId === "new" ? [{ id: "new" }, ...currentItems] : currentItems;

  return (
    <div className="min-h-screen bg-green-50 p-8">
      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-green-200 hover:bg-green-300 rounded-2xl font-medium shadow"
        >
          ← Indietro
        </button>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="🔍 Cerca..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-green-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-green-400 outline-none"
          />
          <button
            onClick={startAdd}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-2xl shadow-lg transition-all"
          >
            <FiPlus /> Nuovo
          </button>
        </div>
      </div>

      {/* CARDS INLINE EDIT */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedItems.length > 0 ? (
          displayedItems.map((item) => {
            const isEditing = editingId === item.id;
            const data = formDataMap[item.id] || {};

            return (
              <div
                key={item.id}
                className={`bg-white p-6 rounded-3xl shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl border-l-4 ${
                  isEditing ? "border-green-500" : "border-green-300"
                }`}
              >
                {/* ACTIONS */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => handleSave(item.id)}
                        className="p-2 bg-green-200 hover:bg-green-300 rounded-full"
                      >
                        <FiSave size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setFormDataMap({});
                        }}
                        className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
                      >
                        <FiX size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(item)}
                        className="p-2 bg-yellow-200 hover:bg-yellow-300 rounded-full"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-200 hover:bg-red-300 rounded-full"
                      >
                        <FiTrash2 size={16} />
                      </button>
                      {onViewDetail && (
                        <button
                          onClick={() => onViewDetail(item)}
                          className="p-2 bg-green-100 hover:bg-green-200 rounded-full"
                        >
                          <FiLayers size={16} />
                        </button>
                      )}
                    </>
                  )}
                </div>

                {/* CARD CONTENT */}
                <div className="space-y-2 mt-4">
                  {fields.map((f) => (
                    <div key={f} className="text-sm flex flex-col">
                      <span className="font-semibold text-gray-700">
                        {labels[f] || f}:
                      </span>
                      {isEditing ? (
                        fieldTypes[f] === "select" ? (
                          <select
                            name={f}
                            value={data[f] || ""}
                            onChange={(e) => handleChange(item.id, e)}
                            className="border border-green-300 rounded-2xl px-3 py-1 text-sm shadow-sm focus:ring-2 focus:ring-green-400"
                          >
                            <option value="">-- Seleziona --</option>
                            {(selectOptions[f] || []).map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : fieldTypes[f] === "checkbox" ? (
                          <input
                            type="checkbox"
                            name={f}
                            checked={data[f] || false}
                            onChange={(e) => handleChange(item.id, e)}
                            className="h-5 w-5 accent-green-500"
                          />
                        ) : fieldTypes[f] === "date" ? (
                          <input
                            type="date"
                            name={f}
                            value={data[f]?.split("T")[0] || ""}
                            onChange={(e) => handleChange(item.id, e)}
                            className="border border-green-300 rounded-2xl px-3 py-1 text-sm shadow-sm focus:ring-2 focus:ring-green-400"
                          />
                        ) : (
                          <input
                            type="text"
                            name={f}
                            value={data[f] || ""}
                            onChange={(e) => handleChange(item.id, e)}
                            className="border border-green-300 rounded-2xl px-3 py-1 text-sm shadow-sm focus:ring-2 focus:ring-green-400"
                          />
                        )
                      ) : (
                        <span className="text-gray-900">
                          {fieldTypes[f] === "checkbox"
                            ? item[f]
                              ? "✅"
                              : "❌"
                            : fieldTypes[f] === "date"
                            ? item[f]?.split("T")[0] || "-"
                            : item[f] || "-"}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center col-span-full text-gray-400 py-10 text-lg">
            Nessun elemento trovato ✨
          </p>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`p-3 rounded-full shadow ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-green-100 hover:bg-green-200 text-green-700"
            }`}
          >
            <FiChevronLeft />
          </button>
          <span className="text-sm font-medium text-gray-700">
            Pagina {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-3 rounded-full shadow ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-green-100 hover:bg-green-200 text-green-700"
            }`}
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default SubTableForm;
