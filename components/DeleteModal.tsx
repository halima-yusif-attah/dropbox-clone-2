'use client'

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
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";


function DeleteModal() {
    const { user } = useUser();

    const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] = useAppStore((state) => [
        state.isDeleteModalOpen,
        state.setIsDeleteModalOpen,
        state.fileId,
        state.setFileId,
    ]);

    async function deleteFile() {
      if (!user || !fileId) return;

      const toastId = toast.loading("Deleting...");


      const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

      try {
        await deleteObject(fileRef).then(async () => {
          deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
            console.log("Deleted!");
          });
        }).finally(() => {
            toast.success("Deleted Successfully", {
                id: toastId,
            })
            setIsDeleteModalOpen(false);
        })
      } catch (error) {
        toast.error(`uh oh, an error ocurred ${error}`, {
           id: toastId,
        });
        
      }
    }


  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            file!.
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            variant={"ghost"}
            size="sm"
            className="px-3 flex-1"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            variant={"destructive"}
            type="submit"
            size="sm"
            onClick={() => deleteFile()}
            className="px-3 flex-1"
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
  
}

export default DeleteModal;
