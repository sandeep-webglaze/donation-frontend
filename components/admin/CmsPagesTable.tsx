"use client";

import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCmsPages, useTogglePublish, useDeleteCmsPage } from "@/lib/hooks/useAdmin";

export function CmsPagesTable() {
  const { data: pages = [], isLoading, isError } = useCmsPages();
  const togglePublish = useTogglePublish();
  const remove = useDeleteCmsPage();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/admin/cms/new">
            <Plus className="mr-2 h-4 w-4" /> New Page
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="space-y-2 p-4">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : isError ? (
            <p className="p-8 text-center text-sm text-muted-foreground">
              Couldn&apos;t load pages. Check the API and sign-in.
            </p>
          ) : pages.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No pages yet. Create your first one.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.map((p) => {
                  const published = p.status === "published";
                  return (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.title}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">/{p.slug}</TableCell>
                      <TableCell>
                        <Badge variant={published ? "default" : "secondary"}>
                          {published ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(p.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            title={published ? "Unpublish" : "Publish"}
                            onClick={() => togglePublish.mutate({ id: p.id, publish: !published })}
                          >
                            {published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" title="Edit" asChild>
                            <Link href={`/admin/cms/${p.id}`}><Pencil className="h-4 w-4" /></Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Delete"
                            onClick={() => {
                              if (confirm(`Delete "${p.title}"?`)) remove.mutate(p.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
