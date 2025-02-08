import { useState, useEffect } from "react";
import { db, storage, auth } from "../Pages/firebaseConfig";
import { collection, doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faFileImage, faHeading, faFileAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";

const BlogUpload = () => {
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [markdownPreview, setMarkdownPreview] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Developer");
  const [userData, setUserData] = useState({ userId: "", username: "", avatarUrl: "" });

  const categories = ["IT", "Movies", "Food", "Music", "Wildlife", "Design", "Data Science"];

  // Fetch current user details from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData({
            userId: user.uid,
            username: userSnap.data().username || "Anonymous",
            avatarUrl: userSnap.data().avatar || "",
          });
        } else {
          console.warn("User data not found in Firestore.");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleImageUpload = async () => {
    if (!image) return null;
    const imageRef = ref(storage, `blogImages/${image.name}`);
    await uploadBytes(imageRef, image);
    return await getDownloadURL(imageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await handleImageUpload();
      if (!userData.userId) {
        throw new Error("User not authenticated.");
      }

      // Generate a unique blog ID
      const blogRef = doc(collection(db, "blogs"));
      const blogId = blogRef.id; // Get the generated ID

      await setDoc(blogRef, {
        id: blogId, // Store the blog ID explicitly
        title,
        content, // Store Markdown content
        textContent: content.replace(/[#_*`]/g, ""), // Convert Markdown to plain text and store it
        imageUrl,
        category,
        userId: userData.userId,
        username: userData.username,
        avatarUrl: userData.avatarUrl,
        timestamp: serverTimestamp(),
      });

      setTitle("");
      setContent("");
      setImage(null);
      setCategory("Developer");
    } catch (error) {
      console.error("Error uploading blog:", error);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4">
        <FontAwesomeIcon icon={faUpload} className="mr-2" /> Upload Blog
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faHeading} />
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faFileAlt} />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faFileAlt} />
          <textarea
            placeholder="Write in Markdown or plain text..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            required
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMarkdownPreview(!markdownPreview)}
            className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600"
          >
            <FontAwesomeIcon icon={faEye} className="mr-2" />
            {markdownPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>
        {markdownPreview && (
          <div className="border p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faFileImage} />
          <input 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" 
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? "Uploading..." : (
            <><FontAwesomeIcon icon={faUpload} className="mr-2" /> Upload Blog</>
          )}
        </button>
      </form>
    </div>
  );
};

export default BlogUpload;
