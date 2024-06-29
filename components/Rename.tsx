"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { ref } from "firebase/storage";
import { db, storage } from "@/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";


function RenameModal() {
  const { user } = useUser();
  const [input, setInput] = useState("");

  const [
    isRenameModalOpen,
    setIsRenameModalOpen,
    fileId,
    setFileId,
    filename,
    setFilename,
  ] = useAppStore((state) => [
    state.isRenameModalOpen,
    state.setIsRenameModalOpen,
    state.fileId,
    state.setFileId,
    state.filename,
    state.setFilename,
  ]);

  async function renameFile() {
    if (!user || !fileId) return;

    const toastId = toast.loading("Renaming...")

    try {
      await updateDoc(doc(db, "users", user.id, "files", fileId), {
        filename: input, 
      })
        .finally(() => {
          toast.success("Renamed Successfully", {
            id: toastId,
          })
          setInput("")
          setIsRenameModalOpen(false);
        });
    } catch (error) {
        toast.error(`uh oh, an error ocurred, ${error}`, {
          id: toastId,
        });
      setIsRenameModalOpen(false);
    }
  }

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <Input
            id="link"
            defaultValue={filename}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDownCapture={(e) => {
                if (e.key === "Enter") {
                  renameFile();
                }
  
            }}

           />
        </DialogHeader>
        <div className="flex space-x-2 py-3 ml-auto">
          <Button
            variant={"ghost"}
            size="sm"
            className="px-3"
            onClick={() => setIsRenameModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            variant={"destructive"}
            type="submit"
            size="sm"
            onClick={() => renameFile()}
            className="px-3"
          >
            <span className="sr-only">Rename</span>
            <span>Rename</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RenameModal;
