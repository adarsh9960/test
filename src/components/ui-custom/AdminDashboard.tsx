'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { FileText, Image, Save, Eye, Edit, Upload, Download, Plus, Trash2 } from 'lucide-react';

// Define types for JSON data
interface JsonFile {
  name: string;
  path: string;
  data: any;
  type: 'pages' | 'services' | 'fleet' | 'gallery' | 'ratings' | 'partners' | 'contact' | 'sightseeing' | 'pricing' | 'newsletter' | 'navigation' | 'meta-content' | 'company-info' | 'site-config';
}

interface AdminDashboardProps {
  isAuthenticated: boolean;
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
}

export default function AdminDashboard({ isAuthenticated, onLogin, onLogout }: AdminDashboardProps) {
  const [jsonFiles, setJsonFiles] = useState<JsonFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<JsonFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const { toast } = useToast();

  // Load JSON files on component mount
  useEffect(() => {
    if (isAuthenticated) {
      loadJsonFiles();
    }
  }, [isAuthenticated]);

  const loadJsonFiles = async () => {
    setIsLoading(true);
    try {
      const files = [
        { name: 'Pages', path: '/api/data/pages.json', type: 'pages' as const },
        { name: 'Services', path: '/api/data/services.json', type: 'services' as const },
        { name: 'Fleet', path: '/api/data/fleet.json', type: 'fleet' as const },
        { name: 'Gallery', path: '/api/data/gallery.json', type: 'gallery' as const },
        { name: 'Ratings', path: '/api/data/ratings.json', type: 'ratings' as const },
        { name: 'Partners', path: '/api/data/partners.json', type: 'partners' as const },
        { name: 'Contact', path: '/api/data/contact.json', type: 'contact' as const },
        { name: 'Sightseeing', path: '/api/data/sightseeing.json', type: 'sightseeing' as const },
        { name: 'Pricing', path: '/api/data/pricing.json', type: 'pricing' as const },
        { name: 'Newsletter', path: '/api/data/newsletter.json', type: 'newsletter' as const },
        { name: 'Navigation', path: '/api/data/navigation.json', type: 'navigation' as const },
        { name: 'Meta Content', path: '/api/data/meta-content.json', type: 'meta-content' as const },
        { name: 'Company Info', path: '/api/data/company-info.json', type: 'company-info' as const },
        { name: 'Site Config', path: '/api/data/site-config.json', type: 'site-config' as const },
      ];

      const loadedFiles = await Promise.all(
        files.map(async (file) => {
          const response = await fetch(file.path);
          const data = await response.json();
          return { ...file, data };
        })
      );

      setJsonFiles(loadedFiles);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load JSON files',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginForm.username, loginForm.password);
  };

  const handleSave = async () => {
    if (!selectedFile) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/update-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filePath: selectedFile.path,
          data: selectedFile.data,
        }),
      });

      if (!response.ok) throw new Error('Failed to save');

      toast({
        title: 'Success',
        description: 'File saved successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save file',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (file: File, path: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);

    try {
      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const result = await response.json();
      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
      return result.url;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive',
      });
      return null;
    }
  };

  const renderJsonEditor = (data: any, path: string = '', onChange: (value: any) => void) => {
    if (typeof data === 'string') {
      return (
        <Textarea
          value={data}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[100px]"
        />
      );
    }

    if (typeof data === 'number') {
      return (
        <Input
          type="number"
          value={data}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );
    }

    if (typeof data === 'boolean') {
      return (
        <select
          value={data.toString()}
          onChange={(e) => onChange(e.target.value === 'true')}
          className="w-full p-2 border rounded"
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      );
    }

    if (Array.isArray(data)) {
      return (
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="border rounded p-2">
              <div className="flex justify-between items-center mb-2">
                <Badge variant="outline">Item {index + 1}</Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newArray = [...data];
                    newArray.splice(index, 1);
                    onChange(newArray);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              {renderJsonEditor(item, `${path}[${index}]`, (newValue) => {
                const newArray = [...data];
                newArray[index] = newValue;
                onChange(newArray);
              })}
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => onChange([...data, ''])}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      );
    }

    if (typeof data === 'object' && data !== null) {
      return (
        <div className="space-y-4">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="border rounded p-3">
              <div className="flex justify-between items-center mb-2">
                <Label className="font-semibold">{key}</Label>
                {typeof value === 'string' && value.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" title="View Image">
                      {/* eslint-disable-next-line jsx-a11y/alt-text */}
                      <Image className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await handleImageUpload(file, `public/${value}`);
                          if (url) {
                            onChange({ ...data, [key]: url });
                          }
                        }
                      }}
                      className="hidden"
                      id={`upload-${path}-${key}`}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => document.getElementById(`upload-${path}-${key}`)?.click()}
                      title="Upload Image"
                    >
                      <Upload className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                )}
              </div>
              {renderJsonEditor(value, `${path}.${key}`, (newValue) => {
                onChange({ ...data, [key]: newValue });
              })}
            </div>
          ))}
        </div>
      );
    }

    return <div>Unsupported type</div>;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <p className="text-muted-foreground">Enter your credentials to access the admin panel</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="Enter password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>JSON Files</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-2">
                    {isLoading ? (
                      <div className="text-center py-4">Loading...</div>
                    ) : (
                      jsonFiles.map((file) => (
                        <Button
                          key={file.name}
                          variant={selectedFile?.name === file.name ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setSelectedFile(file)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          {file.name}
                        </Button>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedFile ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Editing: {selectedFile.name}</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleSave} disabled={isSaving}>
                        <Save className="h-4 w-4 mr-2" />
                        {isSaving ? 'Saving...' : 'Save'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-4">
                      {renderJsonEditor(selectedFile.data, '', (newValue) => {
                        setSelectedFile({ ...selectedFile, data: newValue });
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Select a JSON file to edit
                    </h3>
                    <p className="text-gray-500">
                      Choose a file from the sidebar to view and edit its contents
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}