import Dropzone from "@/components/Dropzone";
import TableWrapper from "@/components/table/TableWrapper";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import { auth } from "@clerk/nextjs/server";
import { collection, getDocs } from "firebase/firestore";

async function Dashboard() {
  const { userId } = auth();
  
  if (!userId) return;
  const docsResults = await getDocs(collection(db, "users", userId, "files"));

  const skeletonFiles: FileType[] = docsResults.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().filename || doc.id,
    fullName: doc.data().fullName,
    timestamp: new Date(doc.data().timestamp?.seconds*1000) || undefined,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size
  }))

  console.log("skeletonFiles", skeletonFiles);


  return (
    <div className="border-t">
        <Dropzone />

        <section className="container space-y-2">
          <h2 className="font-bold">All Files</h2>
        
          {/* <div className="">Tabble Wrapper</div> */}

          <TableWrapper skeletonFiles={skeletonFiles}/>

        </section>
    </div>
  )
}

export default Dashboard;