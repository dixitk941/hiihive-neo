import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeading, faTag, faClock } from "@fortawesome/free-solid-svg-icons";

const BlogView = ({ blog }) => {
  return (
    <div className="p-6 rounded-lg shadow-md bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white mb-4">
      <h2 className="text-xl font-bold mb-2">
        <FontAwesomeIcon icon={faHeading} className="mr-2" /> {blog.title}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        <FontAwesomeIcon icon={faTag} className="mr-2" /> {blog.category}
      </p>
      <p className="mb-4">{blog.content}</p>
      {blog.imageUrl && <img src={blog.imageUrl} alt="Blog" className="w-full rounded-md" />}
      <p className="text-xs text-gray-500 mt-2">
        <FontAwesomeIcon icon={faClock} className="mr-2" /> {new Date(blog.timestamp?.seconds * 1000).toLocaleString()}
      </p>
    </div>
  );
};

export default BlogView;
