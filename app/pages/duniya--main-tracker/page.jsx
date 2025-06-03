"use client";
// React version of the Duniya & Death Life Clarity Manager
// Save as App.jsx or use within your React project

import React, { useState, useEffect } from "react";
import DrawerLayout from "../../DrawerLayout";

const Section = ({ title, items, onAdd, onDelete, onUpdate, onShowDetail }) => {
  return (
    <div className="bg-gray-300 p-4 w-full md:w-[300px] mx-2 rounded">
      <h2 className="text-center font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        {items.map((item, idx) => {
          const [headline] = item.split(":");
          return (
            <div
              key={idx}
              className="bg-white px-2 py-1 rounded cursor-pointer"
              onClick={() => onShowDetail(item)}
            >
              <div className="flex justify-between items-center">
                <span className="truncate w-full pr-2 font-semibold">
                  {headline.trim()}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(idx);
                    }}
                    className="text-sm text-gray-600"
                  >
                    🗑️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdate(idx);
                    }}
                    className="text-sm text-gray-600"
                  >
                    🔄
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <button onClick={onAdd} className="text-sm text-black hover:underline">
          + Add
        </button>
      </div>
    </div>
  );
};

const AddOrUpdateModal = ({
  show,
  onClose,
  onSave,
  initialHeadline = "",
  initialClarity = "",
}) => {
  const [headline, setHeadline] = useState(initialHeadline);
  const [clarity, setClarity] = useState(initialClarity);

  useEffect(() => {
    setHeadline(initialHeadline);
    setClarity(initialClarity);
  }, [initialHeadline, initialClarity]);

  const handleSubmit = () => {
    onSave(`${headline}: ${clarity}`);
    setHeadline("");
    setClarity("");
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"  style={{zIndex:"10000000000000000000000000"}}>
      <div className="bg-gray-300 p-4 rounded w-11/12 md:w-1/2 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
          ✖️
        </button>
        <h3 className="mb-2">
          {initialHeadline ? "Update clarity" : "Add clarity"}
        </h3>
        <input
          type="text"
          placeholder="| Headline write here"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="w-full mb-2 p-1"
        />
        <textarea
          placeholder="| God givenly give clarity here"
          value={clarity}
          onChange={(e) => setClarity(e.target.value)}
          className="w-full mb-2 p-1 h-24"
        ></textarea>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-1"
          >
            {initialHeadline ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ViewDetailModal = ({ show, onClose, text }) => {
  if (!show) return null;
  const [headline, ...clarityParts] = text.split(":");
  const clarity = clarityParts.join(":").trim();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"  style={{zIndex:"10000000000000000000000000"}}>
      <div className="bg-white p-6 rounded w-11/12 md:w-2/3 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
          ✖️
        </button>
        <h2 className="text-xl font-bold mb-4">{headline.trim()}</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{clarity}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-black text-white px-4 py-1 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const DuniyaMainTracker = () => {
  const [duniya, setDuniya] = useState([]);
  const [deathLife, setDeathLife] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [initialHeadline, setInitialHeadline] = useState("");
  const [initialClarity, setInitialClarity] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [detailText, setDetailText] = useState("");

  useEffect(() => {
    const d = JSON.parse(localStorage.getItem("duniya") || "[]");
    const dl = JSON.parse(localStorage.getItem("deathLife") || "[]");
    setDuniya(d);
    setDeathLife(dl);
  }, []);

  useEffect(() => {
    localStorage.setItem("duniya", JSON.stringify(duniya));
    localStorage.setItem("deathLife", JSON.stringify(deathLife));
  }, [duniya, deathLife]);

  const handleAdd = (section) => {
    setActiveSection(section);
    setEditingIndex(null);
    setInitialHeadline("");
    setInitialClarity("");
    setShowModal(true);
  };

  const handleSave = (text) => {
    const updateList = (list, setList) => {
      const updated = [...list];
      if (editingIndex !== null) updated[editingIndex] = text;
      else updated.push(text);
      updated.sort((a, b) => a.localeCompare(b));
      setList(updated);
    };
    if (activeSection === "duniya") updateList(duniya, setDuniya);
    else updateList(deathLife, setDeathLife);
  };

  const handleDelete = (section, idx) => {
    if (section === "duniya") setDuniya(duniya.filter((_, i) => i !== idx));
    else setDeathLife(deathLife.filter((_, i) => i !== idx));
  };

  const handleUpdate = (section, idx) => {
    const item = (section === "duniya" ? duniya : deathLife)[idx];
    const [headline, ...clarity] = item.split(":");
    setInitialHeadline(headline.trim());
    setInitialClarity(clarity.join(":").trim());
    setActiveSection(section);
    setEditingIndex(idx);
    setShowModal(true);
  };

  const handleShowDetail = (text) => {
    setDetailText(text);
    setShowDetail(true);
  };

  return (
    <DrawerLayout>
      <div className="min-h-screen bg-white p-4">
        <div className="flex flex-col md:flex-row justify-center items-start gap-4">
          <Section
            title="Duniya"
            items={duniya}
            onAdd={() => handleAdd("duniya")}
            onDelete={(i) => handleDelete("duniya", i)}
            onUpdate={(i) => handleUpdate("duniya", i)}
            onShowDetail={handleShowDetail}
          />
          <Section
            title="Death Life"
            items={deathLife}
            onAdd={() => handleAdd("deathLife")}
            onDelete={(i) => handleDelete("deathLife", i)}
            onUpdate={(i) => handleUpdate("deathLife", i)}
            onShowDetail={handleShowDetail}
          />
        </div>

        <AddOrUpdateModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          initialHeadline={initialHeadline}
          initialClarity={initialClarity}
        />

        <ViewDetailModal
          show={showDetail}
          onClose={() => setShowDetail(false)}
          text={detailText}
        />
      </div>
    </DrawerLayout>
  );
};

export default DuniyaMainTracker;
