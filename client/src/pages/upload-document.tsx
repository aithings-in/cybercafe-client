"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  File,
  X,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import PageHero from "@/components/page-hero";
import Button from "@/components/button";
import FloatingWidget from "@/components/floating-widget";
import { useTranslation } from "@/hooks/useTranslation";
import {
  uploadFilesToDrive,
  checkUploadApiHealth,
} from "@/services/uploadService";

export default function UploadDocumentPage() {
  const { t } = useTranslation();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);

  // Check API availability on component mount
  useEffect(() => {
    const checkApi = async () => {
      const isAvailable = await checkUploadApiHealth();
      setApiAvailable(isAvailable);
    };
    checkApi();
  }, []);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    setSelectedFiles((prev) => [...prev, ...fileArray]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    if (!userName.trim()) {
      setErrorMessage("Please enter your name");
      return;
    }

    setUploadStatus("uploading");
    setErrorMessage("");

    try {
      const response = await uploadFilesToDrive(selectedFiles, userName);

      if (response.success) {
        setUploadStatus("success");
        // Reset after 3 seconds
        setTimeout(() => {
          setSelectedFiles([]);
          setUserName("");
          setUploadStatus("idle");
          setErrorMessage("");
        }, 3000);
      } else {
        setUploadStatus("error");
        setErrorMessage(
          response.message || "Failed to upload files. Please try again."
        );
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadStatus("error");
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Network error. Please check your connection and try again.";
      setErrorMessage(errorMessage);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <>
      {/* Page Hero Banner */}
      {/* <PageHero
        title={t("uploadDocument.title")}
        breadcrumbs={[
          { label: t("common.home"), href: "/" },
          { label: t("uploadDocument.title") },
        ]}
      /> */}

      {/* Upload Document Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* API Status Warning */}
            {apiAvailable === false && (
              <motion.div
                className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0" />
                <p className="text-yellow-800 text-sm">
                  Unable to connect to the server. Please ensure the server is
                  running.
                </p>
              </motion.div>
            )}

            {/* Upload Area - Only show when no files selected */}
            {selectedFiles.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`relative border-2 border-dashed rounded-lg p-8 md:p-12 text-center transition-all duration-300 ${
                  isDragging
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-white hover:border-blue-400"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  multiple
                  onChange={(e) => handleFileSelect(e.target.files)}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      isDragging ? "bg-blue-500" : "bg-blue-100"
                    }`}
                  >
                    <Upload
                      className={`w-8 h-8 ${
                        isDragging ? "text-white" : "text-blue-500"
                      }`}
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                    {t("uploadDocument.dragDrop")}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t("uploadDocument.orClick")}
                  </p>
                  <Button
                    type="button"
                    variant="primary"
                    className="px-6 py-2 rounded-lg"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                  >
                    {t("uploadDocument.selectFiles")}
                  </Button>
                  <p className="text-sm text-gray-500 mt-4">
                    {t("uploadDocument.supportedFormats")}
                  </p>
                </label>
              </motion.div>
            )}

            {/* Upload Form - Show when files are selected */}
            {selectedFiles.length > 0 && (
              <motion.div
                className="bg-white rounded-lg shadow-lg p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* User Name Input - Prominent at the top */}
                <div className="mb-6">
                  <label
                    htmlFor="userName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    required
                    disabled={uploadStatus === "uploading"}
                    autoFocus
                  />
                  {errorMessage && (
                    <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                  )}
                </div>

                {/* Selected Files Preview */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Uploaded Files ({selectedFiles.length})
                  </h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                            <File className="w-5 h-5 text-blue-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                          aria-label="Remove file"
                          disabled={uploadStatus === "uploading"}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Send Button */}
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="primary"
                    className="px-8 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-base font-semibold"
                    onClick={handleUpload}
                    disabled={
                      uploadStatus === "uploading" ||
                      !userName.trim() ||
                      apiAvailable === false
                    }
                  >
                    {uploadStatus === "uploading" ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Uploading...
                      </span>
                    ) : (
                      "Send"
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Upload Status Messages */}
            {uploadStatus === "success" && selectedFiles.length === 0 && (
              <motion.div
                className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                <p className="text-green-700 font-medium">
                  Files uploaded to Google Drive successfully!
                </p>
              </motion.div>
            )}

            {uploadStatus === "error" &&
              errorMessage &&
              selectedFiles.length === 0 && (
                <motion.div
                  className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <X className="w-6 h-6 text-red-500 shrink-0" />
                  <p className="text-red-700 font-medium">{errorMessage}</p>
                </motion.div>
              )}
          </motion.div>
        </div>
      </section>

      {/* Floating Widget */}
      <FloatingWidget />
    </>
  );
}
