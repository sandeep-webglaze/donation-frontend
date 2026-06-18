import { NextRequest, NextResponse } from "next/server";

const users = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "admin", status: "active", createdAt: "2024-01-10" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "user", status: "active", createdAt: "2024-02-15" },
];

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = users.find((u) => u.id === params.id);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ data: user });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userIndex = users.findIndex((u) => u.id === params.id);
  if (userIndex === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const body = await request.json();
  users[userIndex] = { ...users[userIndex], ...body };
  return NextResponse.json({ data: users[userIndex] });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userIndex = users.findIndex((u) => u.id === params.id);
  if (userIndex === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "User deleted successfully" });
}
