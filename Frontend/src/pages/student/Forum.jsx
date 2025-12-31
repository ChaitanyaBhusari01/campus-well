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
  DialogClose,
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
  }, [token]);

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
      setUploading(false);
    } catch (err) {
      console.error("Error creating post:", err);
    }
    finally{
        setUploading(false);
        setOpen(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Share something with the community</CardTitle>
        </CardHeader>

        <CardContent>
          <Dialog open = {open} onOpenChange = {setOpen}>
            <DialogTrigger asChild>
              <Button onClick = {() => setOpen(true)}>Create Post</Button>
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
                
                <Button disabled={uploading} type="submit" className="w-full">
                    Post
                </Button>
                
                
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* POSTS */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post._id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <p>{post.content}</p>

              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="post"
                  className="mt-3 rounded"
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Forum;
