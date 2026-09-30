"use client";

import { useEffect, useState } from "react";
import { TriangleAlert } from "lucide-react";
import { batchesData, type Batch } from "@/data/batch-payments";
import { parseBatchCsv, type ParsedBatch } from "@/lib/parseBatchCsv";
import BatchSummary from "@/components/batch-payments/BatchSummary";
import BatchTabs, { type BatchTab } from "@/components/batch-payments/BatchTabs";
import UploadDropzone from "@/components/batch-payments/UploadDropzone";
import CsvRequirements from "@/components/batch-payments/CsvRequirements";
import BatchPreviewModal from "@/components/batch-payments/BatchPreviewModal";
import BatchHistoryRow from "@/components/batch-payments/BatchHistoryRow";
import BulkPaymentBanner from "@/components/batch-payments/BulkPaymentBanner";

export default function BatchPaymentsPage() {
  const [batches, setBatches] = useState<Batch[]>(batchesData);
  const [activeTab, setActiveTab] = useState<BatchTab>("upload");
  const [pendingFile, setPendingFile] = useState<{
    fileName: string;
    batch: ParsedBatch;
  } | null>(null);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  const [isParsing, setIsParsing] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBatches((prev) =>
        prev.map((b) => {
          const remaining = b.recipients - b.processed;
          if (remaining <= 0) return b;
          const step = Math.min(remaining, Math.ceil(b.recipients * 0.1));
          return { ...b, processed: b.processed + step };
        })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  async function handleFileSelected(file: File) {
    setUploadErrors([]);
    setIsParsing(true);

    const result = await parseBatchCsv(file);

    setIsParsing(false);

    if (!result.ok) {
      setUploadErrors(result.errors);
      return;
    }

    setPendingFile({ fileName: file.name, batch: result.batch });
  }

  function handleConfirmBatch() {
    if (!pendingFile) return;

    const newBatch: Batch = {
      id: crypto.randomUUID(),
      fileName: pendingFile.fileName,
      recipients: pendingFile.batch.rows.length,
      processed: 0,
      totalAmount: pendingFile.batch.totalAmount,
      currency: pendingFile.batch.currency,
      date: new Date().toISOString().slice(0, 10),
    };

    setBatches((prev) => [...prev, newBatch]);
    setPendingFile(null);
    setActiveTab("history");
  }

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Batch Payments</h1>
      <p className="mt-1 text-sm text-gray-500">
        Send money to multiple recipients at once using CSV upload
      </p>

      <div className="mt-6">
        <BatchSummary batches={batches} />
      </div>

      <div className="mt-6">
        <BatchTabs activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {activeTab === "upload" ? (
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-sm font-semibold text-gray-900">
            Upload Payment File
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Upload a CSV file with recipient details (up to 1,000 recipients)
          </p>

          <div className="mt-4">
            <UploadDropzone onFileSelected={handleFileSelected} />
          </div>

          {isParsing && (
            <p className="mt-3 text-sm text-gray-400">Checking file...</p>
          )}

          {uploadErrors.length > 0 && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-start gap-2">
                <TriangleAlert
                  size={16}
                  className="mt-0.5 shrink-0 text-red-600"
                />
                <div>
                  <p className="text-sm font-medium text-red-900">
                    This file couldn&apos;t be processed
                  </p>
                  <ul className="mt-1 space-y-0.5">
                    {uploadErrors.map((err, i) => (
                      <li key={i} className="text-xs text-red-700">
                        {err}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4">
            <CsvRequirements />
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-sm font-semibold text-gray-900">
            Payment History
          </p>
          <p className="mt-1 text-sm text-gray-500">
            View your past batch payments
          </p>

          <div className="mt-4 space-y-3">
            {batches.length > 0 ? (
              batches.map((batch) => (
                <BatchHistoryRow key={batch.id} batch={batch} />
              ))
            ) : (
              <p className="py-8 text-center text-sm text-gray-400">
                No batches yet.
              </p>
            )}
          </div>
        </div>
      )}

      <div className="mt-6">
        <BulkPaymentBanner />
      </div>

      {pendingFile && (
        <BatchPreviewModal
          fileName={pendingFile.fileName}
          batch={pendingFile.batch}
          onCancel={() => setPendingFile(null)}
          onConfirm={handleConfirmBatch}
        />
      )}
    </div>
  );
}