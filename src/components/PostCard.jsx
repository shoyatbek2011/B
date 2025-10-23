import { motion } from "framer-motion";
import { deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";


export default function PostCard({ post }) {
  const currentUser = auth.currentUser;

  const deletePost = async () => {
    if (currentUser?.uid !== post.userId) return alert("Faqat o‘z postini o‘chirsa bo‘ladi!");
    await deleteDoc(doc(db, "posts", post.id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-md rounded-xl p-4 mb-4 flex gap-3"
    >
      <img src={post.userPhoto} className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="font-bold">{post.userName}</span>
          {currentUser?.uid === post.userId && (
            <button onClick={deletePost} className="text-red-500 text-sm">O‘chirish</button>
          )}
        </div>
        <p className="mt-1">{post.text}</p>
      </div>
    </motion.div>
  );
}
