"use client";

import { useState } from "react";
import { UserPlus ,ArrowLeft} from "lucide-react";
import Link from "next/link";
import { recipientsData, type Recipient } from "@/data/recipients";
import RecipientCard from "@/components/recipients/RecipientCard";
import RecipientModal from "@/components/recipients/RecipientModal";
import ViewRecipientModal from "@/components/recipients/ViewRecipientModal";
import DeleteRecipientDialog from "@/components/recipients/DeleteRecipientDialog";

type ModalState =
  | { type: "closed" }
  | { type: "add" }
  | { type: "edit"; recipient: Recipient }
  | { type: "view"; recipient: Recipient }
  | { type: "delete"; recipient: Recipient };

export default function RecipientsPage() {
  const [recipients, setRecipients] = useState<Recipient[]>(recipientsData);
  const [modalState, setModalState] = useState<ModalState>({ type: "closed" });

  function handleAddSubmit(data: Omit<Recipient, "id">) {
    const newRecipient: Recipient = { id: crypto.randomUUID(), ...data };
    setRecipients((prev) => [...prev, newRecipient]);
    setModalState({ type: "closed" });
  }

  function handleEditSubmit(data: Omit<Recipient, "id">) {
    if (modalState.type !== "edit") return;
    const updatedId = modalState.recipient.id;

    setRecipients((prev) =>
      prev.map((r) => (r.id === updatedId ? { id: updatedId, ...data } : r))
    );
    setModalState({ type: "closed" });
  }

  function handleDeleteConfirm() {
    if (modalState.type !== "delete") return;
    const idToRemove = modalState.recipient.id;

    setRecipients((prev) => prev.filter((r) => r.id !== idToRemove));
    setModalState({ type: "closed" });
  }

  return (
    <div className="px-6 py-8">
      <Link 
        href="/dashboard"
          className="flex items-center gap-2 text-sm text-pesa-slate mb-4"
      ><ArrowLeft size={16} />Back to dashboard</Link>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recipients</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your saved recipients</p>
        </div>
        <button
          onClick={() => setModalState({ type: "add" })}
          className="flex items-center gap-2 rounded-lg bg-green-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-900 cursor-pointer"
        >
          <UserPlus size={16} /> Add Recipient
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recipients.map((recipient) => (
          <RecipientCard
            key={recipient.id}
            recipient={recipient}
            onView={(r) => setModalState({ type: "view", recipient: r })}
            onEdit={(r) => setModalState({ type: "edit", recipient: r })}
            onDelete={(r) => setModalState({ type: "delete", recipient: r })}
          />
        ))}
      </div>

      {modalState.type === "add" && (
        <RecipientModal
          mode="add"
          recipient={null}
          onClose={() => setModalState({ type: "closed" })}
          onSubmit={handleAddSubmit}
        />
      )}

      {modalState.type === "edit" && (
        <RecipientModal
          mode="edit"
          recipient={modalState.recipient}
          onClose={() => setModalState({ type: "closed" })}
          onSubmit={handleEditSubmit}
        />
      )}

      {modalState.type === "view" && (
        <ViewRecipientModal
          recipient={modalState.recipient}
          onClose={() => setModalState({ type: "closed" })}
        />
      )}

      {modalState.type === "delete" && (
        <DeleteRecipientDialog
          recipient={modalState.recipient}
          onCancel={() => setModalState({ type: "closed" })}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}