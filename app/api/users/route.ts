import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(["admin", "user", "moderator"]).default("user"),
});

// Mock data
const users = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "admin", status: "active", createdAt: "2024-01-10" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "user", status: "active", createdAt: "2024-02-15" },
  { id: "3", name: "Carol White", email: "carol@example.com", role: "moderator", status: "inactive", createdAt: "2024-03-20" },
  { id: "4", name: "David Brown", email: "david@example.com", role: "user", status: "active", createdAt: "2024-04-05" },
  { id: "5", name: "Eva Martinez", email: "eva@example.com", role: "user", status: "active", createdAt: "2024-05-12" },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const total = filtered.length;
  const data = filtered.slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    data,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createUserSchema.parse(body);

    const newUser = {
      id: String(users.length + 1),
      ...validated,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    };

    users.push(newUser);

    return NextResponse.json({ data: newUser }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 422 });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
