import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";

const Forum = () => {
  const { token } = useAuth();

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);

  // fetch posts
  const fetchPosts = async () => {
    
    try {
      const res = await api.get("/student/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts(res.data.posts || []);
    } catch (err) {
      console.error("Error loading posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts,5000);
    return () => clearInterval(interval);
  }, []);

  // create post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await api.post("/student/post", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTitle("");
      setContent("");
      setImage(null);

      fetchPosts();
    } catch (err) {
      console.error("Error creating post:", err);
    }
    finally{
        setUploading(false);
        setOpen(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-white via-slate-50 to-slate-100 min-h-screen">
      <Card className="card-glow overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-400">
            Share something with the community
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setOpen(true)} className="btn-gradient float-slow px-4 py-2">
                Create Post
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new post</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <Textarea
                  placeholder="Write your thoughts..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />

                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />

                <Button disabled={uploading} type="submit" className="w-full btn-gradient">
                  {uploading ? "Posting..." : "Post"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* POSTS */}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <Card
            key={post._id}
            className="card-glow fade-in-up"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-700">
                {post.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-slate-600 leading-relaxed">{post.content}</p>

              {post.imageUrl && (
                <img src={post.imageUrl} alt="post" className="mt-3 post-image" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Forum;
