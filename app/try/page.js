"use client";

import { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async () => {
    const url = `${sessionStorage.mainURL}users.php`;
    const jsonData = { username: username, password: password };

    try {
      const response = await axios.get(url, {
        params: { json: JSON.stringify(jsonData), operation: "login" }
      });

      if (response.data.length > 0) {
        let params = new URLSearchParams();
        params.append('fullname', response.data[0].usr_fullname);
        sessionStorage.setItem("userId", response.data[0].usr_id);
        router.push(`/main?${params}`);
      } else {
        toast.error('Invalid username or password.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    sessionStorage.setItem("mainURL", "http://localhost/api/p3project/");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Contacts Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); login(); }}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;