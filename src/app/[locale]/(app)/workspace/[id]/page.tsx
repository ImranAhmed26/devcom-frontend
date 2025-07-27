import { WorkspacePage } from "@/components/App/IndividualWorkspace";
import type { Metadata } from "next";

interface WorkspacePageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: WorkspacePageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Workspace ${id} | Panda Parse`,
    description: "Individual workspace for document processing and OCR management",
  };
}

export default async function WorkspacePageRoute({ params }: WorkspacePageProps) {
  const { id } = await params;

  return <WorkspacePage workspaceId={id} />;
}
