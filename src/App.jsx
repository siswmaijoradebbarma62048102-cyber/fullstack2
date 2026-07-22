import { useState } from "react";
import "./App.css";

function App() {
  const limits = {
    Twitter: 280,
    Facebook: 5000,
    Instagram: 2200,
    LinkedIn: 3000,
  };

  const [platform, setPlatform] = useState("Twitter");
  const [post, setPost] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [media, setMedia] = useState(null);

  const maxLimit = limits[platform];
  const remaining = maxLimit - post.length;

  return (
    <div className="container">
      <h1>Multi Platform Post Composer</h1>

      <label>Write Your Post</label>

      <textarea
        placeholder="Enter your post..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      ></textarea>

      <p className="counter">
        Characters: {post.length} / {maxLimit}
      </p>

      {remaining < 0 ? (
        <p className="error">
          Character limit exceeded by {-remaining}
        </p>
      ) : (
        <p className="success">
          Remaining Characters: {remaining}
        </p>
      )}

      <h3>Select Platform</h3>

      {Object.keys(limits).map((item) => (
        <label key={item}>
          <input
            type="radio"
            value={item}
            checked={platform === item}
            onChange={(e) => setPlatform(e.target.value)}
          />
          {item}
        </label>
      ))}

      <h3>Hashtags</h3>

      <input
        type="text"
        placeholder="#react #vite"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
      />

      <h3>Upload Media</h3>

      <input
        type="file"
        onChange={(e) => {
          if (e.target.files.length > 0) {
            setMedia(e.target.files[0]);
          }
        }}
      />

      {media && <p>Selected File: {media.name}</p>}

      <h3>Preview</h3>

      <div className="preview">
        <p>{post || "No Post Yet"}</p>

        <p>{hashtags}</p>

        {media && <p>{media.name}</p>}
      </div>

      <button
        onClick={() => {
          setPost("");
          setHashtags("");
          setMedia(null);
        }}
      >
        Clear
      </button>

      <button
        onClick={() => {
          if (post === "") {
            alert("Please write a post.");
          } else if (post.length > maxLimit) {
            alert("Character limit exceeded.");
          } else {
            alert("Post Published Successfully!");
          }
        }}
      >
        Publish
      </button>
    </div>
  );
}

export default App;