"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { jarsData, type Jar } from "@/data/jars";
import JarsOverview from "@/components/jars/JarsOverview";
import JarCard from "@/components/jars/JarCard";
import JarModal from "@/components/jars/JarModal";
import ViewJarModal from "@/components/jars/ViewJarModal";
import DeleteJarDialog from "@/components/jars/DeleteJarDialog";
import AddMoneyModal from "@/components/jars/AddMoneyModal";

type ModalState =
  | { type: "closed" }
  | { type: "add" }
  | { type: "edit"; jar: Jar }
  | { type: "view"; jar: Jar }
  | { type: "delete"; jar: Jar }
  | { type: "addMoney"; jar: Jar };

export default function JarsPage() {
  const [jars, setJars] = useState<Jar[]>(jarsData);
  const [modalState, setModalState] = useState<ModalState>({ type: "closed" });

  const JAR_COLORS = ["#3b82f6", "#a855f7", "#22c55e", "#f97316", "#ec4899", "#ef4444"];

  function getNextColor(index: number): string {
    return JAR_COLORS[index % JAR_COLORS.length];
  }

  function handleAddSubmit(data: Omit<Jar, "id" | "color">) {
    const newJar: Jar = {
      id: crypto.randomUUID(),
      color: getNextColor(jars.length),
      ...data,
    };
    setJars((prev) => [...prev, newJar]);
    setModalState({ type: "closed" });
  }

  function handleEditSubmit(data: Omit<Jar, "id" | "color">) {
    if (modalState.type !== "edit") return;
    const updatedId = modalState.jar.id;
    const existingColor = modalState.jar.color;

    setJars((prev) =>
      prev.map((j) =>
        j.id === updatedId ? { id: updatedId, color: existingColor, ...data } : j
      )
    );
    setModalState({ type: "closed" });
  }
  function handleDeleteConfirm() {
    if (modalState.type !== "delete") return;
    const idToRemove = modalState.jar.id;

    setJars((prev) => prev.filter((j) => j.id !== idToRemove));
    setModalState({ type: "closed" });
  }

  function handleAddMoneySubmit(amount: number) {
    if (modalState.type !== "addMoney") return;
    const targetId = modalState.jar.id;

    setJars((prev) =>
      prev.map((j) => (j.id === targetId ? { ...j, saved: j.saved + amount } : j))
    );
    setModalState({ type: "closed" });
  }

  return (
    <div className="px-6 py-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Jars</h1>
          <p className="mt-1 text-sm text-gray-500">
            Set aside money for your goals and manage your budget
          </p>
        </div>
        <button
          onClick={() => setModalState({ type: "add" })}
          className="flex items-center gap-2 rounded-lg bg-green-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-900 cursor-pointer"
        >
          <Plus size={16} /> Create Jar
        </button>
      </div>

      <div className="mt-6">
        <JarsOverview jars={jars} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jars.map((jar) => (
          <JarCard
            key={jar.id}
            jar={jar}
            onView={(j) => setModalState({ type: "view", jar: j })}
            onEdit={(j) => setModalState({ type: "edit", jar: j })}
            onDelete={(j) => setModalState({ type: "delete", jar: j })}
            onAddMoney={(j) => setModalState({ type: "addMoney", jar: j })}
          />
        ))}
      </div>

      {modalState.type === "add" && (
        <JarModal
          mode="add"
          jar={null}
          onClose={() => setModalState({ type: "closed" })}
          onSubmit={handleAddSubmit}
        />
      )}

      {modalState.type === "edit" && (
        <JarModal
          key={modalState.jar.id}
          mode="edit"
          jar={modalState.jar}
          onClose={() => setModalState({ type: "closed" })}
          onSubmit={handleEditSubmit}
        />
      )}

      {modalState.type === "view" && (
        <ViewJarModal
          jar={modalState.jar}
          onClose={() => setModalState({ type: "closed" })}
        />
      )}

      {modalState.type === "delete" && (
        <DeleteJarDialog
          jar={modalState.jar}
          onCancel={() => setModalState({ type: "closed" })}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {modalState.type === "addMoney" && (
        <AddMoneyModal
          jar={modalState.jar}
          onClose={() => setModalState({ type: "closed" })}
          onSubmit={handleAddMoneySubmit}
        />
      )}
    </div>
  );
}